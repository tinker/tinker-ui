'use strict';

var mixIn = require('mout/object/mixIn'),
	forOwn = require('mout/object/forOwn'),
	base64 = require('./../../lib/base64');
require('./codemirror');

module.exports = {
	mirrorOptions: {
		tabSize: 2,
		indentUnit: 2,
		indentWithTabs: true,
		lineNumbers: true,
		matchBrackets: true,
		autoCloseBrackets: true,
		styleActiveLine: true
	},

	/**
	 * Initialise new editor
	 * @param {Element} parent
	 */
	init: function(parent){
		this.parent = parent;
		mixIn(this.mirrorOptions, {mode: this.modes[this.defaultMode]});
		this.build();
		this.setEvents();
	},

	/**
	 * Build the editor
	 */
	build: function(){
		var html = '<div class="editor"><div class="editor-mode">'+
			'<select name="tinker[' + this.type + '][mode]">';

		forOwn(this.modes, function(mime, name){
			html += '<option>' + name + '</option>';
		});

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
	 *
	 */
	setEvents: function(){
		this.modeSelect.on('change', function(){
			this.selectedMode = this.getMode();
			this.codemirror.setOption('mode', this.modes[this.selectedMode]);
		}.bind(this));
	},

	/**
	 * Encode the value with base64 for safe form submission
	 */
	encode: function(){
		this.hidden.value(base64.encode(this.getValue()));
	},

	/**
	 * Set the mode of the editor
	 * @param {String} value
	 */
	setMode: function(value){
		if (!this.modes[value]) return false;

		this.modeSelect.value(value);
		this.codemirror.setOption('mode', this.modes[value]);
	},

	/**
	 * Get the currently selected mode
	 */
	getMode: function(){
		return this.modeSelect.value();
	},

	/**
	 * Set value of the editor
	 * @param {String} value
	 */
	setValue: function(value){
		this.codemirror.setValue(value);
	},

	/**
	 * Get the value of the editor
	 */
	getValue: function(){
		return this.codemirror.getValue();
	}
};
