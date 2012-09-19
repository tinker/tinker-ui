// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./event/model'),
	config = require('./config/model');

require('./layout/init');

/**
 * Merge passed config and init the app
 * @param {Object} cfg Config object
 */
function init(cfg) {
	cfg = cfg || {};
	config.merge(cfg);
	event.emit('init');
}

// expose the global object
window.Tinker = {
	init: init
};

