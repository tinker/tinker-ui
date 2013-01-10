'use strict';

var e = new Events();

/**
 * Emit an event
 * @param {String} type
 * @param {Array} args Passed to subscribers
 */
function emit(type, args){
	e.fireEvent(type, args);
}

/**
 * React to an event
 * @param {String} type
 * @param {Function} fn
 */
function on(type, fn){
	e.addEvent(type, fn);
}

module.exports = {
	emit: emit,
	on: on
};

