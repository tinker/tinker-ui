'use strict';

var zen = require('elements/zen'),
	forOwn = require('mout/object/forOwn'),
	elements = require('./../elements'),
	editors = require('./../editor');

require('elements/events');

/**
 * Execute the user's current code
 */
var execute = function(){
	forOwn(editors, function(editor){
		editor.encode();
	});

	elements.app[0].submit();
};

// button
zen('button.icn.icn-execute')
	.insert(elements.regions.tl)
	.on('click', function(e){
		e.preventDefault();
		execute();
	});

module.exports = execute;

