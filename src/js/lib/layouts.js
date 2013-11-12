'use strict';

var type = require('prime/type'),
	config = require('./config'),
	Layout = require('./../ui/layout');

var layouts = [],
	curLayout = -1;

/**
 * Initialise
 */
var init = function(){
	for (var i = 0, len = config.layouts.length; i < len; i++){
		layouts.push(new Layout(config.layouts[i]));
	}

	layouts[0].activate(false);
	curLayout = 0;
};

/**
 * Activate a layout by index
 * @param {Number} index
 * @param {Bool} animate
 */
var activate = function(index, animate){
	if (type(index) !== 'number') throw new Error('Layout index has to be an integer');
	index = parseInt(index, 10);
	if (!layouts[index]) return false;

	if (curLayout > -1){
		layouts[curLayout].deactivate();
	}
	curLayout = index;
	layouts[index].activate(animate);
	return true;
};

/**
 *
 */
var register = function(){
	console.log('This functionality hasn\'t been implemented yet');
};

module.exports = {
	init: init,
	activate: activate,
	register: register
};

