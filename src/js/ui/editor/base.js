'use strict';

var mixIn = require('prime/object/mixIn'),
	base64 = require('./../../lib/base64');
require('./codemirror');

module.exports = {
	mirrorOptions: {
		tabSize: 4,
		indentUnit: 4,
		indentWithTabs: true,
		lineNumbers: true,
		matchBrackets: true,
		fixedGutter: true
	},

	/**
	 * Initialise new editor
	 * @param {Element} parent
	 */
	init: function(parent){
		this.parent = parent;
		mixIn(this.mirrorOptions, {mode: this.modes[0].mime});
		this.build();
	},

	/**
	 * Build the editor
	 */
	build: function(){
		var html = '<div class="editor"><div class="editor-mode">'+
			'<select name="tinker[' + this.type + '][type]">';

		for (var i = 0; i < this.modes.length; i++){
			html += '<option value="' + i + '">' + this.modes[i].name + '</option>';
		}

		html += '</select></div>'+
			'<input type="hidden" name="tinker[' + this.type + '][body]">'+
			'<textarea></textarea></div>';
		this.parent.html(html);
		this.modeSelect = this.parent.search('select');
		this.hidden = this.parent.search('input');
		this.textarea = this.parent.search('textarea');
		this.codemirror = window.CodeMirror.fromTextArea(
			this.textarea[0],
			this.mirrorOptions
		);
	},

	/**
	 * Encode the value with base64 for safe form submission
	 */
	encode: function(){
		this.hidden.value(base64.encode(this.codemirror.getValue()));
	}
};

