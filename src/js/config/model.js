// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var config = {
	layout: 'client'
};

/**
 * Merge a passed config object with the defaults
 * @param {Object} cfg Object of key/value pairs
 */
config.merge = function(cfg){
	Object.each(cfg, function(v, k){
		config[k] = v;
	});
};

// export
exports = module.exports = config;

