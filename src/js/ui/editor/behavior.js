'use strict';

var mixIn = require('prime/object/mixIn');

module.exports = mixIn({}, require('./base'), {
	type: 'behavior',
	modes: {
		'js': 'text/javascript'
	}
});

