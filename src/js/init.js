'use strict';

var events = require('./lib/events'),
	config = require('./lib/config'),
	plugins = require('./lib/plugins');

require('./ui/layout/init');

/**
 * Merge passed config and init the app
 * @param {Object} cfg Config object
 */
function init(cfg) {
	cfg = cfg || {};
	config.merge(cfg);
	events.emit('init');
}

window.Tinker = {
	init: init,
	registerPlugin: plugins.register
};

