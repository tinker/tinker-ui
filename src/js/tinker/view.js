// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	layout = require('./../layout/client'),
	tinker = require('./model');

// private
/**
 * Build up required elements
 */
function build(){
	layout.addToRegion(new Element('a.icn50.icn-meta[href=#meta]', {
		events: { click: metaClick }
	}), 0);
	layout.addToRegion(new Element('a.icn50.icn-new[href=#new]', {
		events: { click: newClick }
	}), 0);
	layout.addToRegion(new Element('a.icn50.icn-run[href=#run]', {
		events: { click: runClick }
	}), 2);
	layout.addToRegion(new Element('a.icn50.icn-save[href=#save]', {
		events: { click: saveClick }
	}), 2);
}

/**
 * Handle click on meta button
 */
function metaClick(e){
	e.preventDefault();
	console.log('meta');
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

// events
event.on('layout.build', build);

