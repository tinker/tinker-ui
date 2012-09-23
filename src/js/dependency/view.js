// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	layout = require('./../layout/client');

// private
var depButton;

/**
 * Build up required modules
 */
function build(){
	depButton = new Element('a.icn50.icn-dependencies[href=#dependencies]', {
		events: { click: dependencyClick }
	});
	layout.addToRegion(depButton, 0);
}

/**
 * Handle click on assets button
 */
function dependencyClick(e){
	e.preventDefault();
	console.log('dependencies');
}

// events
event.on('layout.build', build);

