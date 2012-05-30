// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./../events/model'),
	hash = require('prime/collection/hash');

// exposed
var config = {
	layout: 'client'
};

/**
 * Merge a passed config object with the defaults
 * @param {Object} cfg Object of key/value pairs
 */
config.merge = function(cfg){
	hash.each(cfg, function(v, k){
		config[k] = v;
	});
};

// export
module.exports = config;

