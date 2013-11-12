'use strict';

var elements = require('./elements');

var index = 0;

/**
 * Create a new Layout
 * @param {Object} spec
 */
var Layout = function(spec){
	if (!(this instanceof Layout)){
		return new Layout(spec);
	}

	this.active = false;
	this.index = index++;
	this.spec = spec;
};

/**
 * Deactivate this layout
 */
Layout.prototype.deactivate = function(){
	if (!this.active) return;
	this.active = false;
};

/**
 * Activate this layout
 * @param {Bool} animate
 */
Layout.prototype.activate = function(animate){
	if (this.active) return;
	this.active = true;
	this.calculateGrid();
	this.reflowCells(animate);
};

/**
 * Calculate this layout's grid
 */
Layout.prototype.calculateGrid = function(){
	var s = this.spec, i,
		width = parseInt(elements.body.compute('width'), 10),
		height = parseInt(elements.body.compute('height'), 10),
		opw = width/100,
		oph = height/100;

	this.cols = [];
	this.rows = [];

	for (i = 0; i < s.cols.length; i++){
		this.cols.push(Math.round(s.cols[i] * opw));
	}
	this.cols.push(width);

	for (i = 0; i < s.rows.length; i++){
		this.rows.push(Math.round(s.rows[i] * oph));
	}
	this.rows.push(height);
};

/**
 * Get a single cell's coords on the grid
 */
Layout.prototype.getCellCoords = function(cell){
	return {
		x1: this.cols[cell[0]],
		x2: this.cols[cell[2]],
		y1: this.rows[cell[1]],
		y2: this.rows[cell[3]]
	};
};

/**
 * Lay the cells out on the grid
 * @param {Bool} animate
 */
Layout.prototype.reflowCells = function(animate){
	var i, coords, styles,
		method = animate === false ? 'style' : 'animate';

	for (i = 0; i < this.spec.cells.length; i++){
		coords = this.getCellCoords(this.spec.cells[i]);
		styles = {
			top: coords.y1,
			left: coords.x1,
			width: coords.x2 - coords.x1,
			height: coords.y2 - coords.y1
		};
		elements.cells[i].outer[method](styles);
	}
};

module.exports = Layout;

