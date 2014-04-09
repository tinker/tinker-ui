'use strict';

var mixIn = require('mout/object/mixIn'),
	base = require('./base');
require('./syntax/js');

module.exports = mixIn({}, base, {
	type: 'behavior',
	modes: {
		js: 'text/javascript'
	},
	defaultMode: 'js'
});
