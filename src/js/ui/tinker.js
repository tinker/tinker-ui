'use strict';

var events = require('./../lib/events'),
	layout = require('./layout/client'),
	tinker = require('./../lib/tinker');

/**
 * Build up required elements
 */
function build(){
	layout.addToRegion(new Element('a.icn50.icn-new[href=#new]', {
		events: { click: newClick }
	}), 0);
	layout.addToRegion(new Element('span.icn50.icn-run', {
		events: { click: runClick }
	}), 2);
	layout.addToRegion(new Element('span.icn50.icn-save', {
		events: { click: saveClick }
	}), 2);
}

/**
 * Handle click on new button
 */
function newClick(e){
	e.preventDefault();
	console.log('new');
}

/**
 * Handle click on run button
 */
function runClick(e){
	e.preventDefault();
	tinker.run();
}

/**
 * Handle click on save button
 */
function saveClick(e){
	e.preventDefault();
	tinker.save();
}

events.on('layout.build', build);

