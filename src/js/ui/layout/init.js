'use strict';

var events = require('./../../lib/events'),
	config = require('./../../lib/config');

/**
 * Figure out which layout is being used and load it
 */
var init = function(){
	if (config.layout === 'embed') {
		require('./embed.init');
	} else {
		require('./client.init');
	}

	events.emit('layout.init', config.layout);
};

events.on('init', init);

