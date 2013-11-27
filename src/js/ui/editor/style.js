'use strict';

var mixIn = require('prime/object/mixIn'),
	base = require('./base');
require('./syntax/css');

module.exports = mixIn({}, base, {
	type: 'style',
	modes: {
		css: 'text/css',
		scss: 'text/x-scss'
	},
	defaultMode: 'css'
});

