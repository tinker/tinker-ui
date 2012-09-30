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
		});

		event.on('tinker.run', this.onRun.bind(this));
		event.on('tinker.update', this.onUpdate.bind(this));
	},

	changeMode: function(mode){
		if (!this.modes[mode]) return false;

		this.codemirror.setOption('mode', this.modes[mode]);
		this.mode = mode;
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
		tinker.set('code.'+this.type+'.type', this.mode);
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

