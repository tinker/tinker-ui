'use strict';

var isObject = require('mout/lang/isObject'),
	editors = require('../ui/editor'),
	execute = require('./actions/execute');

var types = ['markup', 'style', 'behavior'];

/**
 * Load a bundle
 */
var load = function(bundle){
	if (!isObject(bundle)) return false;
	if (isObject(bundle.code)){
		var i, len = types.length, type;
		for (i = 0; i < len; i++){
			type = types[i];
			if (!bundle.code[type] || !isObject(bundle.code[type])) continue;

			editors[type].setMode(bundle.code[type].mode);
			editors[type].setValue(bundle.code[type].body);
		}
	}

	execute();
};

module.exports = {
	load: load
};
