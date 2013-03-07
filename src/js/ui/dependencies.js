'use strict';

var events = require('./../lib/events'),
	layout = require('./layouts/init'),
	tinker = require('./../lib/tinker'),
	dependency = require('./../lib/dependencies'),
	Drawer = require('./drawer'),
	util = require('./../lib/utils');

var dependencies = {}, button,
	drawer, select, url, list, data;

/**
 * Build up required modules
 */
function build(){
	button = new Element('span.icn42.icn-dependencies', {
		events: { click: dependencyClick }
	});
	layout.addToRegion(button, 'lt');

	var content = new Element('div', { html: slab.load('dependencies')() }).getChildren()[0];
	drawer = new Drawer(content).hide(true);

	select = content.getElement('#dependency-select');
	url = content.getElement('#dependency-url');
	list = content.getElement('#dependency-list');
	data = util.parseData('dependency-data');
	if (!data){
		select.getParent('li').destroy();
	}
	if (select && data){
		var firstOption = select.getElement('option'),
			i = 0, j, x = 0, dep, group, version;
		for (; i < data.length; i++){
			dep = data[i];
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
				group.inject(select);
			}
		}
		select.addEvent('change', function(){
			var index = select.getElement(':selected').get('value'),
				dep = dependencies[index];
			if (dep && dep.href && dep.href.length){
				for (i = 0; i < dep.href.length; i++){
					dependency.add(dep.href[i]);
				}
			}
			firstOption.set('selected', true);
		});
	}

	if (url) {
		url.addEvent('keydown', function(e){
			if (e.key !== 'enter') return;

			e.preventDefault();
			var href = url.get('value').trim();
			url.set('value', '');

			if (href === '') return;
			dependency.add(href);
		});
	}

	list.addEvent('click:relay(.remove)', function(e){
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
 * Handle click on dependency button
 */
function dependencyClick(e){
	e.preventDefault();
	drawer.toggle();
}

/**
 * Render the list of dependencies
 */
function renderList(){
	list.empty();
	var deps = dependency.list(), i = 0, href, name, data, li;
	for (; i < deps.length; i++){
		href = deps[i];
		name = href.match(/([^\/]+)$/)[1];
		data = {name: name, href: href};
		li = new Element('ul', {html: slab.load('dependency')(data)}).getChildren()[0];
		li.inject(list);
	}
}

events.on('layout.build', build);
events.on('dependency.add', renderList);
events.on('dependency.remove', renderList);

