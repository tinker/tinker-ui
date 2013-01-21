'use strict';

var events = require('./events'),
	config = require('./config'),
	Layout = require('./../ui/layout'),
	layouts = [], curLayout;

/**
 * Register pre-defined layouts
 */
function init(){
	for (var i = 0; i < config.layouts.length; i++){
		layouts.push(new Layout(config.layouts[i]));
	}
}

/**
 * Activate a layout by index
 * @param {Number} index Layout to activate
 * @param {Bool} animate Whether the transition should be animated
 */
function activate(index, animate){
	if (typeOf(index) !== 'number') throw new Error('Layout index has to be an integer');
	if (!layouts[index]) return false;

	if (curLayout){
		layouts[curLayout].deactivate();
	}
	curLayout = index;
	layouts[index].activate(animate);
	return true;
}

/**
 * Register a new layout
 * @param {Object} layout Specification of how the layout should look
 */
function register(layout){
	console.log('layout.register(', layout, ');');
}

events.on('init', init);

module.exports = {
	activate: activate,
	register: register
};

