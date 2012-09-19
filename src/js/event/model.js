// Chiel Kunkels (@chielkunkels)
'use strict';

// private
var ev = new Events();

/**
 * Emit an event
 * @param {String} type
 * @param {Array} args Passed to subscribers
 */
function emit(type, args){
	ev.fireEvent(type, args);
}

/**
 * React to an event
 * @param {String} type
 * @param {Function} fn
 */
function on(type, fn){
	ev.addEvent(type, fn);
}

exports = module.exports = {
	emit: emit,
	on: on
};

