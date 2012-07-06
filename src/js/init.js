// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./events/model'),
	config = require('./config/model');

require('./layout/init');

// expose the global object
window.Tinker = {};

/**
 * Merge passed config and init the app
 * @param {Object} cfg Config object
 */
window.Tinker.init = function(cfg) {
	cfg = cfg || {};
	config.merge(cfg);
	events.emit('init');
};
