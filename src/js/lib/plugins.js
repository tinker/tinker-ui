'use strict';

var events = require('./../lib/events');

/**
 * Register a new plugin
 */
function register(name, plugin){
	if (typeOf(plugin) !== 'object') throw new Error('plugin needs to be an object');
	if (typeOf(plugin.events) !== 'object') throw new Error('plugin should listen for some events');

	var type;
	Object.each(plugin.events, function(value, key){
		type = typeOf(value);
		if (type !== 'string' && type !== 'function') throw new Error('events need to be string:string or string:function pairs');
		if (type === 'string'){
			if (!plugin[value])  throw new Error('cannot find function `' + value + '` in plugin');
			value = plugin[value];
		}

		events.on(key, value);
	});
}

module.exports = {
	register: register
};

