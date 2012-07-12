// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	config = require('./../config/model');

// exposed
var layout = {};

// private
/**
 * Figure out which layout is being used and load it
 */
var init = function(){
	if (config.layout === 'embed') {
		require('./embed');
	} else {
		require('./client');
	}
	event.emit('layout.init');
};

// events
event.on('init', init);

// export
module.exports = layout;

