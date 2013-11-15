'use strict';

var $ = require('elements');
require('elements/attributes');
require('elements/traversal');
require('moofx');

var elements = require('./elements'),
	Cell = require('./cell'),
	editors = require('./editor'),
	output = require('./output'),
	layouts = require('./../lib/layouts');

/**
 * Initialise the ui
 */
var init = function(){
	var template = '<form method="post" action="#" target="sandbox" class="app">'+
		'<header class="header">'+
			'<section class="rgn rgn-tl" data-position="tl">'+
				'<h1 class="icn icn-logo">Tinker</h1>'+
			'</section>'+
		'</header>'+
		'<section class="sidebar">'+
			'<section class="rgn rgn-lt" data-position="lb">'+
			'</section>'+
		'</section>'+
		'<section class="body"></section>'+
	'</form>';

	$(document.body).html(template);

	elements.body = $('.body');
	elements.regions = {};
	var regions = $('.rgn'), len = regions.length, i, region;
	for (i = 0; i < len; i++){
		region = $(regions[i]);
		elements.regions[region.attribute('data-position')] = region;
	}

	elements.cells = [];
	for (i = 0; i < 4; i++){
		elements.cells.push(new Cell(elements.body));
	}

	editors.markup.init(elements.cells[0].inner);
	editors.style.init(elements.cells[1].inner);
	editors.behavior.init(elements.cells[2].inner);
	output.init(elements.cells[3].inner);

	layouts.init();
};

module.exports = {
	init: init
};

