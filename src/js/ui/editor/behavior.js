'use strict';

var mixIn = require('prime/object/mixIn'),
	base = require('./base');
require('./syntax/js');

module.exports = mixIn({}, base, {
	type: 'behavior',
	modes: [{
		name: 'js',
		mime: 'text/javascript'
	}]
});

