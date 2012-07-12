// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model');

// exposed
var layout = {};

// private
var build = function(){
	console.log('build embed!');
};

// events
event.on('layout.init', build);

// export
module.exports = layout;

