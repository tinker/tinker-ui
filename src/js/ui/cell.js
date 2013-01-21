'use strict';

var index = 0;

var Cell = new Class({
	/**
	 * Initialise a new cell object
	 * @param element wrapper The wrapper element
	 */
	initialize: function(wrapper){
		this.index = index++;
		this.wrapper = wrapper;
		this.outer = new Element('section.cell#cell'+this.index);
		this.inner = new Element('div.cell-inner').inject(this.outer);
		this.outer.inject(this.wrapper);
		this.outer.set('morph', {duration: 150});
	},

	/**
	 * @return element The outer element of the cell
	 */
	getOuter: function(){
		return this.outer;
	},

	/**
	 * @return element The inner element of the cell
	 */
	getInner: function(){
		return this.inner;
	},

	/**
	 * @return object A set of coordinate
	 */
	getCoords: function(){
		var pos = this.inner.getPosition(this.wrapper),
			size = this.inner.getSize();

		return {
			x1: pos.x,
			y1: pos.y,
			x2: pos.x + size.x,
			y2: pos.y + size.y
		};
	}
});

exports = module.exports = Cell;

