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
			name: 'tinker[code][style][body]',
			value: tinker.get('code.style.body')
		});
		this.frame.adopt(this.textarea).inject(this.wrapper);
		var options = Object.append({
			mode: 'text/css',
			value: this.textarea.get('value')
		}, this.mirrorOptions);
		this.textarea.addClass('is-hidden');
		this.codemirror = CodeMirror(this.frame, options);
	}
});

exports = module.exports = editor;

