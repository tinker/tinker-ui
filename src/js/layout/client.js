// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var event = require('./../event/model'),
	config = require('./../config/model'),
	Cell = require('./../cell/view'),
	markupEditor = require('./../editor/markup.js'),
	styleEditor = require('./../editor/style.js'),
	behaviourEditor = require('./../editor/behaviour.js'),
	result = require('./../result/base');

// private
var regions = [], curLayout = null, body, cells,
	widths = [], heights = [];

/**
 * Build up the base layout
 */
function build(){
	$(document.body).adopt(
		new Element('div', {html: slab.load('layout')()})
	);
	body = $('body');
	cells = [
		new Cell(body),
		new Cell(body),
		new Cell(body),
		new Cell(body)
	];
	regions = $$('.rgn');

	$$(cells.map(function(cell){
		return cell.getOuter();
	})).set('morph', {duration: 150});

	if (!config.layouts.length) {
		console.warn('No layouts found!');
	}

	addToRegion(new Element('span.icn50.icn-logo'), 0);
	addToRegion(new Element('span.icn50.icn-info'), 3);

	activate(0, false);
	event.emit('layout.build');

	markupEditor.init(cells[0].getInner());
	styleEditor.init(cells[1].getInner());
	behaviourEditor.init(cells[2].getInner());
	result.init(cells[3].getInner());
}

/**
 * Recalculate col/row sizes
 */
function recalc(){
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
	consumed = 0;
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
}

/**
 * Reflow the cells
 * @param {Boolean} animate Whether the reflow should be animated
 */
function reflow(animate){
	animate = animate === false ? false : true;
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
		if (animate) {
			cells[i].getOuter().morph(styles);
		} else {
			cells[i].getOuter().setStyles(styles);
		}
	}
}

/**
 * Calculate coords of a cell
 * @param {Object} spec Specification of how the cell should look
 * @return {Object} Coordinates
 */
function cellCoords(spec){
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

	return {x1: x1, y1: y1, x2: x2, y2: y2};
}

/**
 * Handle window resizes
 */
function resize(){
	recalc();
	reflow(false);
}

/**
 * Add a node to a region
 * @param {Element} el Node to add
 * @param {Integer} index Region index to add to
 */
function addToRegion(el, index){
	if (typeOf(el) !== 'element' || typeOf(index) !== 'number') {
		return;
	}
	if (index < 0 || index >= regions.length) {
		console.warn('Invalid region index: ', index);
		return;
	}

	el.inject(regions[index]);
}

/**
 * Activate a layout by index
 * @param {Number} index Layout to activate
 * @param {Bool} animate Whether the transition should be animated
 */
function activate(index, animate){
	if (!config.layouts[index]) {
		return;
	}

	curLayout = index;
	recalc();
	reflow(animate);
}

// events
event.on('layout.init', build);
window.addEvent('resize', resize);

// export
exports = module.exports = {
	addToRegion: addToRegion
};

