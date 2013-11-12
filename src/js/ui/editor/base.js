'use strict';

module.exports = {
	/**
	 * Base editor
	 * @param {Element} parent
	 */
	init: function(parent){
		this.parent = parent;
		this.build();
	},

	/**
	 *
	 */
	build: function(){
		var html = '<div class="editor"><textarea></textarea></div>';
		this.parent.html(html);
	}
};

