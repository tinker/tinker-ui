// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var event = {};

// private
var ev = new Events();

/**
 * Emit an event
 * @param {String} type
 * @param {Array} args Passed to subscribers
 */
event.emit = function(type, args){
	ev.fireEvent(type, args);
};

/**
 * React to an event
 * @param {String} type
 * @param {Function} fn
 */
event.on = function(type, fn){
	ev.addEvent(type, fn);
};

module.exports = event;

