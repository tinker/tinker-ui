// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var events = {};

// private
var ev = new Events();

/**
 * Emit an event
 * @param {String} type
 * @param {Array} args Passed to subscribers
 * @param {Number} delay delay in ms
 */
events.emit = function(type, args, delay){
	ev.fireEvent(type, args, delay);
};

/**
 * React to an event
 * @param {String} type
 * @param {Function} fn
 */
events.on = function(type, fn, internal){
	ev.addEvent(type, fn, internal);
};

module.exports = events;

