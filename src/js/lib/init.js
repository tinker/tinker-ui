'use strict';

var config = require('./config'),
	ui = require('../ui');

/**
 * Initialise tinker
 * @param {Object} options
 */
var init = function(options){
	config.urls = options.urls || {};

	ui.init();
};

module.exports = init;
