'use strict';

var mixIn = require('mout/object/mixIn'),
	base = require('./base');
require('./syntax/xml');
require('./syntax/jade');

module.exports = mixIn({}, base, {
	type: 'markup',
	modes: {
		html: 'text/html',
		jade: 'text/x-jade'
	},
	defaultMode: 'html'
});
