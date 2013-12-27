'use strict';

var zen = require('elements/zen'),
	elements = require('./../elements'),
	execute = require('./../../lib/actions/execute');

require('elements/events');

// button
zen('button.icn.icn-execute')
	.insert(elements.regions.tl)
	.on('click', function(e){
		e.preventDefault();
		execute();
	});

module.exports = execute;

