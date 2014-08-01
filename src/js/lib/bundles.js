'use strict';

var isObject = require('mout/lang/isObject'),
	isString = require('mout/lang/isString'),
	editors = require('../ui/editor'),
	execute = require('./actions/execute');

var types = ['markup', 'style', 'behavior'],
	hash;

/**
 * Load a bundle
 */
var load = function(bundle){
	if (!isObject(bundle)) return false;

	if (isObject(bundle.meta)){
		if (isString(bundle.meta.hash)){
			bundle.meta.hash = bundle.meta.hash.replace(/^\s+|\s+$/, '');
			if (bundle.meta.hash.length == 5){
				hash = bundle.meta.hash;
			}
		}
	}

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

/**
 * Get the current tinker's hash
 */
var getHash = function(){
	return hash;
};

/**
 * Set the hash for the current bundle
 */
var setHash = function(newHash){
	hash = newHash;
};

module.exports = {
	load: load,
	getHash: getHash,
	setHash: setHash
};
