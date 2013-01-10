'use strict';

module.exports = Object.merge({}, require('./base'), {
	type: 'style',
	modes: {
		'css': 'text/css',
		'less': 'text/x-less'
	}
});

