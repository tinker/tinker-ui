'use strict';

var events = require('./../lib/events'),
	layout = require('./layout/client'),
	tinker = require('./../lib/tinker');

/**
 * Build up required elements
 */
function build(){
	layout.addToRegion(new Element('a.icn42.icn-new[href=#new]', {
		events: { click: newClick }
	}), 'tl');
	layout.addToRegion(new Element('span.icn42.icn-run', {
		events: { click: runClick }
	}), 'tl');
	layout.addToRegion(new Element('span.icn42.icn-save', {
		events: { click: saveClick }
	}), 'tl');
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

