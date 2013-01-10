'use strict';

var events = require('./../lib/events'),
	layout = require('./layout/client'),
	tinker = require('./../lib/tinker'),
	dependency = require('./../lib/dependencies'),
	Popover = require('./popover'),
	util = require('./../lib/utils');

var dependencies = {}, depButton, depPopover,
	depSelect, depUrl, depList, depData;

/**
 * Build up required modules
 */
function build(){
	depButton = new Element('span.icn50.icn-dependencies', {
		events: { click: dependencyClick }
	});
	layout.addToRegion(depButton, 0);

	var content = new Element('div', {html: slab.load('dependencies')()}).getChildren()[0];
	depPopover = new Popover(content, {toggle: depButton});

	depSelect = content.getElement('#dependency-select');
	depUrl = content.getElement('#dependency-url');
	depList = content.getElement('#dependency-list');
	depData = util.parseData('dependency-data');
	if (!depData){
		depSelect.getParent('li').destroy();
	}
	if (depSelect && depData){
		var firstOption = depSelect.getElement('option'),
			i = 0, j, x = 0, dep, group, version;
		for (; i < depData.length; i++){
			dep = depData[i];
			if (dep.versions && dep.versions.length){
				group = new Element('optgroup', {label: dep.name});
				for (j = 0; j < dep.versions.length; j++, x++){
					version = dep.versions[j];
					new Element('option', {
						text: dep.name+' '+version.name,
						value: x
					}).inject(group);
					dependencies[x] = version;
				}
				group.inject(depSelect);
			}
		}
		depSelect.addEvent('change', function(){
			var index = depSelect.getElement(':selected').get('value'),
				dep = dependencies[index];
			if (dep && dep.href && dep.href.length){
				for (i = 0; i < dep.href.length; i++){
					dependency.add(dep.href[i]);
				}
			}
			firstOption.set('selected', true);
		});
	}

	if (depUrl) {
		depUrl.addEvent('keydown', function(e){
			if (e.key !== 'enter') return;

			e.preventDefault();
			var href = depUrl.get('value').trim();
			depUrl.set('value', '');

			if (href === '') return;
			dependency.add(href);
		});
	}

	depList.addEvent('click:relay(.remove)', function(e){
		var li = e.target.getParent('li'),
			href = li.getElement('.href').get('value');
		dependency.remove(href);
	});

	var deps = tinker.get('dependencies');
	if (deps && deps.length > 0) {
		deps.forEach(function(href){
			dependency.add(href);
		});
	}
}

/**
 * Handle click on assets button
 */
function dependencyClick(e){
	e.preventDefault();
	depPopover.toggle();
}

/**
 * Render the list of dependencies
 */
function renderList(){
	depList.empty();
	var deps = dependency.list(), i = 0, href, name, data, li;
	for (; i < deps.length; i++){
		href = deps[i];
		name = href.match(/([^\/]+)$/)[1];
		data = {name: name, href: href};
		li = new Element('ul', {html: slab.load('dependency')(data)}).getChildren()[0];
		li.inject(depList);
	}
}

events.on('layout.build', build);
events.on('dependency.add', renderList);
events.on('dependency.remove', renderList);

