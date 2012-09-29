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
 * Remove a dependency
 * @param {String} href URL to the dependency
 */
function remove(href){
	if (!dependencies.contains(href)) return;
	dependencies.erase(href);
	event.emit('dependency.remove', href);
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
	remove: remove,
	list: list
};

event.on('tinker.update', onUpdate);

