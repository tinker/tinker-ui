// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var editorBase = require('./base'),
	tinker = require('./../tinker/model');

// exposed
var editor = Object.merge({}, editorBase, {
	/**
	 * Build up the editor
	 */
	build: function(){
		this.frame = new Element('div.editor');
		this.textarea = new Element('textarea', {
			name: 'markup',
			value: tinker.get('code.markup.body')
		});
		this.frame.adopt(this.textarea).inject(this.wrapper);
		var options = Object.append({
			mode: 'text/html',
			value: this.textarea.get('value')
		}, this.mirrorOptions);
		this.textarea.addClass('is-hidden');
		this.codemirror = CodeMirror(this.frame, options);
	}
});

module.exports = editor;

