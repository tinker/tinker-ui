'use strict';

var zen = require('elements/zen'),
	elements = require('./../elements'),
	editors = require('./../../ui/editor'),
	execute = require('./execute'),
	save = require('./../../lib/actions/save');

require('elements/events');

// button
zen('button.icn.icn-save')
	.insert(elements.regions.tl)
	.on('click', function(e){
		e.preventDefault();
		execute();
		var bundle = {
			code: {
				markup: {
					mode: editors.markup.getMode(),
					body: editors.markup.getValue()
				},
				style: {
					mode: editors.style.getMode(),
					body: editors.style.getValue()
				},
				behavior: {
					mode: editors.behavior.getMode(),
					body: editors.behavior.getValue()
				},
			}
		};
		save(bundle);
	});

module.exports = save;

