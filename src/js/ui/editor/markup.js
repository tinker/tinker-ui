'use strict';

var mixIn = require('mout/object/mixIn'),
	base = require('./base');
require('./syntax/xml');

module.exports = mixIn({}, base, {
	type: 'markup',
	modes: {
		html: 'text/html'
	},
	defaultMode: 'html'
});

