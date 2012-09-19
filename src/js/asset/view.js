// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	layout = require('./../layout/client');

// private
var assetButton;

/**
 * Build up required modules
 */
function build(){
	assetButton = new Element('a.icn50.icn-assets[href=#assets]', {
		events: { click: assetsClick }
	});
	layout.addToRegion(assetButton, 0);
}

/**
 * Handle click on assets button
 */
function assetsClick(e){
	e.preventDefault();
	console.log('assets');
}

// events
event.on('layout.build', build);

