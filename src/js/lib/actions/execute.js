'use strict';

var forOwn = require('mout/object/forOwn'),
	editors = require('./../../ui/editor'),
	elements = require('./../../ui/elements');

/**
 *
 */
var execute = function(){
	forOwn(editors, function(editor){
		editor.encode();
	});

	elements.app[0].submit();
};

module.exports = execute;

