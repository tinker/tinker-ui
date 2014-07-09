'use strict';

var mixIn = require('mout/object/mixIn'),
	base = require('./base');
require('./syntax/js');
require('./syntax/coffeescript');

module.exports = mixIn({}, base, {
	type: 'behavior',
	modes: {
		js: 'text/javascript',
		coffeescript: 'text/x-coffeescript'
	},
	defaultMode: 'js'
});
