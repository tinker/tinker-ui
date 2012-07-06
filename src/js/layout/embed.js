// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./../events/model');

// exposed
var layout = {};

// private
var build = function(){
	console.log('build embed!');
};

// events
events.on('layout.init', build);

// export
module.exports = layout;

