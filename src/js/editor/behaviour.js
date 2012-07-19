// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var editorBase = require('./base');

// exposed
var editor = Object.merge({}, editorBase, {
	/**
	 * Build up the editor
	 */
	build: function(){
		this.frame = new Element('div.editor');
		this.textarea = new Element('textarea', {
			name: 'behaviour'
		});
		this.frame.adopt(this.textarea).inject(this.wrapper);
		var options = Object.append({mode: 'text/javascript'}, this.mirrorOptions);
		this.textarea.addClass('is-hidden');
		this.codemirror = CodeMirror(this.frame, options);
	}
});

module.exports = editor;

