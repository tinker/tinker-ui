'use strict';

var base64 = require('./../../lib/base64');

module.exports = {
	/**
	 * Initialise new editor
	 * @param {Element} parent
	 */
	init: function(parent){
		this.parent = parent;
		this.build();
	},

	/**
	 * Build the editor
	 */
	build: function(){
		var html = '<div class="editor">'+
				'<input type="hidden" name="tinker[' + this.type + ']">'+
				'<textarea></textarea>'+
			'</div>';
		this.parent.html(html);
		this.hidden = this.parent.search('input');
		this.textarea = this.parent.search('textarea');
	},

	/**
	 * Encode the value with base64 for safe form submission
	 */
	encode: function(){
		this.hidden.value(base64.encode(this.textarea.value()));
	}
};

