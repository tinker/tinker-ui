// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var events = {};

// private
var ev = new Events();

/**
 * Publish an event
 * @param {String} type
 * @param {Array} args Passed to subscribers
 * @param {Number} delay delay in ms
 */
events.publish = function(type, args, delay){
	ev.fireEvent(type, args, delay);
};

/**
 * Subscribe to an event
 * @param {String} type
 * @param {Function} fn
 */
events.subscribe = function(type, fn, internal){
	ev.addEvent(type, fn, internal);
};

module.exports = events;
