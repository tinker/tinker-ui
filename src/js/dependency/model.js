// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model'),
	tinker = require('./../tinker/model');

var dependencies = [];

/**
 * Add a new dependency
 * @param {String} href URL to the dependency
 */
function add(href){
	if (dependencies.contains(href)) return;
	dependencies.push(href);
	event.emit('dependency.add', href);
}

/**
 * Return all dependencies
 * @return {Array}
 */
function list(){
	return dependencies;
}

/**
 * Save the latest dependencies to the tinker
 */
function onUpdate(){
	tinker.set('dependencies', list());
}

exports = module.exports = {
	add: add,
	list: list
};

event.on('tinker.update', onUpdate);

