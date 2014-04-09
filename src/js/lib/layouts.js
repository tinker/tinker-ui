'use strict';

var isNumber = require('mout/lang/isNumber'),
	Layout = require('./../ui/layout');

var layouts = [],
	curLayout = -1;

/**
 * Initialise
 */
var init = function(){
	layouts[0].activate(false);
	curLayout = 0;
};

/**
 * Activate a layout by index
 * @param {Number} index
 * @param {Bool} animate
 */
var activate = function(index, animate){
	if (!isNumber(index)) throw new Error('Layout index has to be an integer');
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
 * Register a new layout
 * @param {Object} spec
 */
var register = function(spec){
	if (!spec.cols || !spec.rows || !spec.cells){
		throw new Error('Incorrect spec format');
	}
	layouts.push(new Layout(spec));
};

module.exports = {
	init: init,
	activate: activate,
	register: register
};
