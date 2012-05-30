// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./../events/model'),
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
	events.publish('layout.init');
};

// events
events.subscribe('init', init);

// export
module.exports = layout;

