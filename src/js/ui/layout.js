'use strict';

var config = require('./../lib/config'),
	cells = require('./layouts/cells');

module.exports = new Class({
	active: false,

	/**
	 * Create a new layout
	 * @param {Object} layout Specification of how the layout should look
	 */
	initialize: function(layout){
		this.layout = layout;
		this.bound = {
			resize: this.resize.bind(this)
		};
	},

	/**
	 * Activate this layout
	 * @param {Boolean} animate Whether the reflow should be animated
	 */
	activate: function(animate){
		this.active = true;

		/* TODO: fix this ugly hack */
		this.parent = config.body;

		this.calculateGrid();
		this.reflowCells(animate);
		// TODO: create handles
		// TODO: draw handles on grid

		window.addEvent('resize', this.bound.resize);
	},

	/**
	 * Deactivate this layout
	 */
	deactivate: function(){
		window.removeEvent('resize', this.bound.resize);
		this.active = false;
	},

	/**
	 * Resize event
	 */
	resize: function(){
		this.calculateGrid();
		this.reflowCells(false);
	},

	/**
	 * Calculate the start coords of columns and rows based on the parent
	 */
	calculateGrid: function(){
		var l = this.layout, i, pSize = this.parent.getSize(),
			opw = pSize.x/100, oph = pSize.y/100;

		this.cols = [];
		this.rows = [];

		for (i = 0; i < l.cols.length; i++){
			this.cols.push(Math.round(l.cols[i] * opw));
			if (!l.cols[i + 1]){
				this.cols.push(pSize.x);
			}
		}

		for (i = 0; i < l.rows.length; i++){
			this.rows.push(Math.round(l.rows[i] * oph));
			if (!l.rows[i + 1]){
				this.rows.push(pSize.y);
			}
		}
	},

	/**
	 * Draw cells on the calculated grid
	 * @param {Boolean} animate Whether the reflow should be animated
	 */
	reflowCells: function(animate){
		var i, coords, styles,
			method = animate === false ? 'setStyles' : 'morph';

		for (i = 0; i < this.layout.cells.length; i++){
			coords = this.getCellCoords(this.layout.cells[i]);
			styles = {
				top: coords.y1, left: coords.x1,
				width: coords.x2 - coords.x1,
				height: coords.y2 - coords.y1
			};
			cells[i].getOuter()[method](styles);
		}
	},

	/**
	 * Get coordinates for a single cell based on the calculated grid
	 * @param {Array} cell Specification of how the cell should look
	 * @return {Object} Object with x1/y1/x2/y2 attributes
	 */
	getCellCoords: function(cell){
		return {
			x1: this.cols[cell[0]],
			x2: this.cols[cell[2]],
			y1: this.rows[cell[1]],
			y2: this.rows[cell[3]]
		};
	}
});

