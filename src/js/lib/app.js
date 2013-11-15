'use strict';

var ui = require('./../ui');

/**
 * Create a new Tinker App
 * @param {Object} options
 */
var App = function(options){
	if (!(this instanceof App)){
		return new App(options);
	}

	ui.init();
};

module.exports = App;

