// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model'),
	layout = require('./../layout/client'),
	user = require('./model');

function build(){
	layout.addToRegion(new Element('a.icn50.icn-user[href=#user]', {
		events: { click: userClick }
	}), 5);
}

function userClick(e){
	e.preventDefault();
	user.auth();
}

// events
event.on('layout.build', build);

