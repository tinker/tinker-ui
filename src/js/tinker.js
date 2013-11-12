'use strict';

var layouts = require('./lib/layouts');

module.exports = {
	App: require('./lib/app'),
	layouts: {
		activate: layouts.activate,
		register: layouts.register
	}
};

