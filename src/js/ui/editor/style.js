'use strict';

var mixIn = require('prime/object/mixIn'),
	base = require('./base');
require('./syntax/css');

module.exports = mixIn({}, base, {
	type: 'style',
	modes: [{
		name: 'css',
		mime: 'text/css'
	}]
});

