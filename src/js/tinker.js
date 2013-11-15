'use strict';

var init = require('./lib/init'),
	layouts = require('./lib/layouts');

module.exports = {
	init: init,
	layouts: {
		activate: layouts.activate,
		register: layouts.register
	}
};

