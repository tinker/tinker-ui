// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./events/model'),
	config = require('./config/model');

require('./layout/init');

window.Tinker = {
	/**
	 * Merge passed config and init the app
	 * @param {Object} cfg Config object
	 */
	init: function(cfg) {
		cfg = cfg || {};
		config.merge(cfg);
		events.publish('init');
	}
};

