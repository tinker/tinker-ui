// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	config = require('./../config/model');

// private
/**
 * Figure out which layout is being used and load it
 */
var init = function(){
	if (config.layout === 'embed') {
		require('./embed.init');
	} else {
		require('./client.init');
	}
	event.emit('layout.init');
};

// events
event.on('init', init);

