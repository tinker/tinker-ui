'use strict';

var events = require('./../../lib/events'),
	tinker = require('./../../lib/tinker');

module.exports = {
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
		this.mode = tinker.get('code.'+this.type+'.type');
		this.build();
		this.setEvents();
	},

	/**
	 * Build up the editor
	 */
	build: function(){
		var data = {
			modeName: 'tinker[code]['+this.type+'][type]',
			name: 'tinker[code]['+this.type+'][body]',
			value: new Element('div', {
				text: tinker.get('code.'+this.type+'.body') || ''
			}).get('html'),
			modes: this.modes,
			mode: this.mode
		};
		this.frame = new Element('div', {
			html: window.slab.load('editor')(data)
		}).getChildren()[0].inject(this.wrapper);
		this.modeSelect = this.frame.getElement('.editor-mode select');
		this.textarea = this.frame.getElement('textarea');
		this.textarea.addClass('is-hidden');

		var options = Object.append({
			mode: this.modes[this.mode],
			value: this.textarea.get('value')
		}, this.mirrorOptions);
		this.codemirror = window.CodeMirror(this.frame, options);
	},

	/**
	 * Attach events
	 */
	setEvents: function(){
		var self = this;
		this.modeSelect.addEvent('change', function(){
			self.changeMode(this.getElement(':selected').get('value'));
			self.codemirror.focus();
		});

		events.on('tinker.run', this.onRun.bind(this));
		events.on('tinker.update', this.onUpdate.bind(this));

		this.codemirror.on('focus', this.focus.bind(this));
		this.codemirror.on('blur', this.blur.bind(this));
		this.codemirror.on('cursorActivity', this.highlightLine.bind(this));
	},

	changeMode: function(mode){
		if (!this.modes[mode]) return false;

		this.codemirror.setOption('mode', this.modes[mode]);
		this.mode = mode;
	},

	/**
	 * Focus the editor and highlight the last active line
	 */
	focus: function(){
		this.frame.addClass('has-focus');
		this.highlightLine();
	},

	/**
	 * Remove focus and the active line
	 */
	blur: function(){
		this.frame.removeClass('has-focus');
		this.codemirror.removeLineClass(this.curLine, 'wrap');
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
		tinker.set('code.'+this.type+'.type', this.mode);
		tinker.set('code.'+this.type+'.body', this.codemirror.getValue());
	},

	/**
	 * Highlight the active line
	 */
	highlightLine: function(){
		if (!this.codemirror) return;
		this.codemirror.removeLineClass(this.curLine, 'wrap');
		this.curLine = this.codemirror.getCursor().line;
		this.codemirror.addLineClass(this.curLine, 'wrap', 'active-line');
	}
};

