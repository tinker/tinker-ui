'use strict';

module.exports = Object.merge({}, require('./base'), {
	type: 'markup',
	modes: {
		'html': 'text/html'
	}
});

