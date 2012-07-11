// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./../events/model'),
	config = require('./../config/model'),
	Cell = require('./../cell/view');

// exposed
var layout = {};

// private
var regions = [], curLayout = null, layoutPicker, body, cells, init = true,
	widths = [], heights = [];

// builds up the base layout
var build = function(){
	document.body.set('html', slab.load('layout')());
	body = $('body');
	cells = [
		new Cell(body),
		new Cell(body),
		new Cell(body),
		new Cell(body)
	];
	regions = $$('.rgn');

	var els = $$(cells.map(function(cell){
		return cell.getOuter();
	})).set('morph', {duration: 150});

	buildLayoutPicker();

	if (!config.layouts.length) {
		console.log('No layouts found!');
	}

	layout.activate(0);
	init = false;
};

/**
 *
 */
var buildLayoutPicker = function(){
	layout.addToRegion(slab.load('layoutPicker')());
};

/**
 * Recalculate col/row sizes
 */
var recalc = function(){
	var l = config.layouts[curLayout], i = 0, percent,
		bSize = body.getSize(), opWidth = bSize.x/100, opHeight = bSize.y/100,
		width, height, consumed = 0;

	widths = [];
	heights = [];

	for (; i < l.cols.length; i++){
		if (l.cols[i+1]) {
			percent = l.cols[i+1] - l.cols[i];
			width = Math.round(percent * opWidth);
			widths.push(width);
			consumed += width;
		} else {
			widths.push(bSize.x - consumed);
		}
	}

	i = 0;
	consumed = 0
	for (; i < l.rows.length; i++){
		if (l.rows[i+1]) {
			percent = l.rows[i+1] - l.rows[i];
			height = Math.round(percent * opHeight);
			heights.push(height);
			consumed += height;
		} else {
			heights.push(bSize.y - consumed);
		}
	}
};

/**
 * Reflow the layout
 */
var reflow = function(){
	var i = 0, c, coords, styles;
	for (; i < config.layouts[curLayout].cells.length; i++){
		c = config.layouts[curLayout].cells[i];
		coords = cellCoords(c);
		styles = {
			top: coords.y1,
			left: coords.x1,
			width: coords.x2 - coords.x1,
			height: coords.y2 - coords.y1
		};
		if (init) {
			cells[i].getOuter().setStyles(styles);
		} else {
			cells[i].getOuter().morph(styles);
		}
	}
};

/**
 * Calculate coords of a cell
 * @param object spec Specification of how the cell should look
 * @return object Coordinates
 */
var cellCoords = function(spec){
	var i = 0, j = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0;

	for (; i < spec[0]; i++){
		x1 += widths[i];
	}
	for (; j < spec[2]; i++, j++){
		x2 += widths[i];
	}
	x2 += x1;

	i = 0;
	j = 0;
	for (; i < spec[1]; i++){
		y1 += heights[i];
	}
	for (; j < spec[3]; i++, j++){
		y2 += heights[i];
	}
	y2 += y1;

	return {x1: x1, y1: y1, x2: x2, y2: y2}
};

/**
 * Handle window resizes
 */
var resize = function(){
	recalc();
	reflow();
};

/**
 * Add a chunk of html or an element node to a region
 */
layout.addToRegion = function(){

};

/**
 * Activate a layout by index
 */
layout.activate = function(index){
	if (!config.layouts[index]) {
		return;
	}

	curLayout = index;
	recalc();
	reflow();
};

// events
events.on('layout.init', build);
window.addEvent('resize', resize);

// export
module.exports = layout;

