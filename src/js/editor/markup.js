// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var editorBase = require('./base');

// exposed
var editor = Object.merge({}, editorBase, {
	type: 'markup',
	mode: 'html',
	modes: {
		'html': 'text/html'
	}
});

exports = module.exports = editor;

