// Chiel Kunkels (@chielkunkels)
'use strict';

Element.Events.outerClick = {
	base : 'click',
	condition : function(e){
		e.stopPropagation();
		return false;
	},
	onAdd : function(fn){
		this.getDocument().addEvent('click', fn);
	},
	onRemove : function(fn){
		this.getDocument().removeEvent('click', fn);
	}
};

var backdrop;

var Popover = new Class({

	Implements: Options,

	options: {
		anchor: 'tl',
		toggle: null,
		position: {
			x: 0,
			y: 50
		}
	},

	/**
	 * Create a new popover
	 * @param {Element} body Node to get injected into the popover
	 * @param {Object} options Options to apply
	 */
	initialize: function(body, options){
		this.setOptions(options);
		this.el = new Element('div.po').inject($('wrapper'));
		this.el.set('morph', {duration: 200});

		if (typeOf(body) === 'element') {
			body.inject(this.el);
		}

		if (!backdrop) {
			backdrop = new Element('div.po-backdrop').inject(document.body);
			backdrop.set('morph', {duration: 200});
		}

		this.position();
	},

	/**
	 * Position the overlay
	 */
	position: function(){
		if (this.options.toggle) {
			var pos = this.options.toggle.getPosition(),
				size = this.options.toggle.getSize();
			this.el.setStyles({
				top: pos.y + size.y,
				left: pos.x
			});
		} else {
			this.el.setStyles({
				top: this.options.position.x,
				left: this.options.position.y
			});
		}
	},

	/**
	 * Toggle display of the popover
	 */
	toggle: function(){
		if (this.shown) {
			this.hide();
		} else {
			this.show();
		}
	},

	/**
	 * Display the popover
	 */
	show: function(){
		if (this.shown) return;
		this.shown = true;
		backdrop.setStyles({
			display: 'block',
			opacity: 0
		}).morph({opacity: 1});

		this.el.setStyles({
			display: 'block',
			opacity: 0,
			marginTop: -5
		}).morph({
			opacity: 1,
			marginTop: 0
		});

		var self = this;
		this.el.addEvent('outerClick', this.outerClickEvent = function(e){
			if (!self.options.toggle) return;
			if (self.options.toggle === e.target) return;
			self.hide();
		});
	},

	/**
	 * Hide the popover
	 */
	hide: function(){
		if (!this.shown) return;
		this.shown = false;
		backdrop.setStyles({
			display: 'none',
			opacity: '0'
		});
		this.el.setStyle('display', 'none');

		this.el.removeEvent('outerClick', this.outerClickEvent);
	}
});

exports = module.exports = Popover;

