// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	layout = require('./../layout/client'),
	tinker = require('./../tinker/model'),
	dependency = require('./model'),
	Popover = require('./../popover/view'),
	util = require('./../util/model');

// private
var dependencies = {}, depButton, depPopover, depSelect, depData;

/**
 * Build up required modules
 */
function build(){
	depButton = new Element('a.icn50.icn-dependencies[href=#dependencies]', {
		events: { click: dependencyClick }
	});
	layout.addToRegion(depButton, 0);

	var content = new Element('div', {html: slab.load('dependencies')()}).getChildren()[0];
	depPopover = new Popover(content, {toggle: depButton});

	depSelect = content.getElement('#dependency-select');
	depData = util.parseData('dependency-data');
	if (depSelect && depData){
		var i = 0, j, x = 0, dep, group, version;
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
		});
	}

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

// events
event.on('layout.build', build);

