// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model');

var dependencies = [];

function add(href){
	dependencies.include(href);
	event.emit('dependency.add', href);
}

function list(){
	return dependencies;
}

exports = module.exports = {
	add: add,
	list: list
};

