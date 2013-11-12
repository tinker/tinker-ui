'use strict';

var mixIn = require('prime/object/mixIn');

module.exports = mixIn({}, require('./base'), {
	type: 'style',
	modes: {
		'css': 'text/css'
	}
});

