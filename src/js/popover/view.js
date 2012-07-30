// Chiel Kunkels (@chielkunkels)

var backdrop;

var Popover = new Class({

	Implements: Options,

	options: {
		anchor: 'tl',
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
		this.el = new Element('div.po').inject(document.body);
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
		this.el.setStyles({
			top: this.options.position.x,
			left: this.options.position.y
		});
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
	},

	/**
	 * Hide the popover
	 */
	hide: function(){
		this.shown = false;
		backdrop.setStyles({
			display: 'none',
			opacity: '0'
		});
		this.el.setStyle('display', 'none');
	}
});

module.exports = Popover;

