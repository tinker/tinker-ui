'use strict';

var events = require('./../../lib/events');

function build(){
	console.log('build embed!');
}

events.on('layout.init', build);

