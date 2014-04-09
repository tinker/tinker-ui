'use strict';

var zen = require('elements/zen');
require('elements/insertion');

var index = 0;

/**
 * New cell
 * @param {Element} parent
 */
var Cell = function(parent){
	if (!(this instanceof Cell)){
		return new Cell(parent);
	}

	this.index = index++;
	this.parent = parent;
	this.build();
};

/**
 * Build the cell's elements
 */
Cell.prototype.build = function(){
	this.outer = zen('section.cell').attribute('data-index', this.index);
	this.inner = zen('div.cell-inner').insert(this.outer);
	this.outer.insert(this.parent);
};

module.exports = Cell;
