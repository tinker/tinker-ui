// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model');

// private
function build(){
	console.log('build embed!');
}

// events
event.on('layout.init', build);

