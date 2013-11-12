'use strict';

var mixIn = require('prime/object/mixIn');

module.exports = mixIn({}, require('./base'), {
	type: 'markup',
	modes: {
		'html': 'text/html'
	}
});

