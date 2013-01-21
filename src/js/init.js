'use strict';

var events = require('./lib/events'),
	config = require('./lib/config'),
	plugins = require('./lib/plugins'),
	layouts = require('./lib/layouts');

require('./ui/layouts/init');

/**
 * Merge passed config and init the app
 * @param {Object} cfg Config object
 */
function init(cfg) {
	cfg = cfg || {};
	config.merge(cfg);
	events.emit('init');
}

/**
 * Public interface
 */
window.Tinker = {
	init: init,
	layouts: layouts,
	plugins: plugins
};

