'use strict';

var events = require('./../../lib/events'),
	config = require('./../../lib/config'),
	layouts = require('./../../lib/layouts'),
	Cell = require('./../cell');

var layout, body, cells, regions = [];

function init(){
	layout = config.layout === 'embed' ? 'embed' : 'client';

	var data = { urls: config.urls };
	$(document.body).adopt(
		new Element('div', {
			html: window.slab.load('layout')(data)
		}).getChildren()
	);

	body = $('body');
	cells = [
		new Cell(body),
		new Cell(body),
		new Cell(body),
		new Cell(body)
	];

	/* TODO: fix this ugly hack */
	config.body = body;
	config.cells = cells;

	$$('.rgn').forEach(function(el){
		regions[el.get('data-name')] = el;
	});

	addToRegion(new Element('span.icn42.icn-logo'), 'tl');

	layouts.activate(0, false);

	require('./../editors/markup').init(cells[0].getInner());
	require('./../editors/style').init(cells[1].getInner());
	require('./../editors/behaviour').init(cells[2].getInner());
	require('./../result').init(cells[3].getInner());

	if (layout === 'embed') {
		require('./embed');
	} else {
		require('./client');
	}

	events.emit('layout.build', layout);
}

/**
 * Add a node to a region
 * @param {Element} el Node to add
 * @param {String} pos Region to add the node to
 */
function addToRegion(el, pos){
	if (typeOf(el) !== 'element' || typeOf(pos) !== 'string') {
		return;
	}
	if (!regions[pos]){
		console.warn('Invalid region: ', pos);
		return;
	}

	el.inject(regions[pos]);
}

events.on('init', init);

module.exports = {
	addToRegion: addToRegion
};

