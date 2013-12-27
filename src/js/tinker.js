'use strict';

var init = require('./lib/init'),
	bundles = require('./lib/bundles'),
	layouts = require('./lib/layouts');

module.exports = {
	init: init,
	bundles: {
		load: bundles.load
	},
	layouts: {
		activate: layouts.activate,
		register: layouts.register
	}
};

