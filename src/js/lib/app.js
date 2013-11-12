'use strict';

var config = require('./config'),
	ui = require('./../ui'),
	layouts = require('./layouts');

/**
 * Create a new Tinker App
 * @param {Object} options
 */
var App = function(options){
	if (!(this instanceof App)){
		return new App(options);
	}

	config.layouts = options.layouts || [];

	ui.init();
	layouts.init();
};

module.exports = App;

