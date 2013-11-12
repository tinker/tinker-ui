'use strict';

module.exports = {
	/**
	 * Create a new result view
	 * @param {Element} parent
	 */
	init: function(parent){
		this.parent = parent;
		this.build();
	},

	/**
	 * Build it
	 */
	build: function(){
		var html = '<div class="output"><iframe name="sandbox"></iframe></div>';
		this.parent.html(html);
	}
};
