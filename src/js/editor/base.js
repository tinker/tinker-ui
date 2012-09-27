// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model'),
	tinker = require('./../tinker/model');

// exposed
var editor = {

	curLine: 0,

	/**
	 * CodeMirror options
	 */
	mirrorOptions: {
		tabSize: 4,
		indentUnit: 4,
		indentWithTabs: true,
		lineNumbers: true,
		matchBrackets: true,
		fixedGutter: true
	},

	/**
	 * Initialise a new editor
	 * @param {Element} wrapper The element to create the editor in
	 */
	init: function(wrapper){
		this.wrapper = wrapper;
		Object.append(this.mirrorOptions, {
			onFocus: this.onFocus.bind(this),
			onCursorActivity: this.highlightLine.bind(this),
			onBlur: this.onBlur.bind(this)
		});
		this.build();
		this.setEvents();
	},

	setEvents: function(){
		event.on('tinker.run', this.onRun.bind(this));
		event.on('tinker.update', this.onUpdate.bind(this));
	},

	/**
	 * Focus the editor and highlight the last active line
	 */
	onFocus: function(){
		this.frame.addClass('has-focus');
		this.highlightLine();
	},

	/**
	 * Remove focus and the active line
	 */
	onBlur: function(){
		this.frame.removeClass('has-focus');
		this.codemirror.setLineClass(this.curLine, null);
	},

	onRun: function(){
		if (!this.codemirror) return;
		this.textarea.set('value', this.codemirror.getValue().toBase64());
	},

	/**
	 * Update tinker data with latest from editor
	 */
	onUpdate: function(){
		if (!this.codemirror) return;
		tinker.set('code.'+this.type+'.type', this.language);
		tinker.set('code.'+this.type+'.body', this.codemirror.getValue());
	},

	/**
	 * Highlight the active line
	 */
	highlightLine: function(){
		if (!this.codemirror) return;
		this.codemirror.setLineClass(this.curLine, null, null);
		this.curLine = this.codemirror.getCursor().line;
		this.codemirror.setLineClass(this.curLine, null, 'active-line');
	}
};

// export
exports = module.exports = editor;

