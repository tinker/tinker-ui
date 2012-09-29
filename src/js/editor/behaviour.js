// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var editorBase = require('./base');

// exposed
var editor = Object.merge({}, editorBase, {
	type: 'behaviour',
	mode: 'js',
	modes: {
		'js': 'text/javascript'
	}
});

exports = module.exports = editor;

