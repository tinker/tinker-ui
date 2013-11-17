'use strict';

var mixIn = require('prime/object/mixIn'),
	base = require('./base');
require('./syntax/xml');

module.exports = mixIn({}, base, {
	type: 'markup',
	modes: [{
		name: 'html',
		mime: 'text/html'
	}]
});

