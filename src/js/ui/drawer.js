'use strict';

// all open drawers
var openDrawers = [];

function Drawer(content){
	this.hidden = false;
	this.build(content);
}

/**
 * Build the basics of the drawer
 * @param {Element} content
 */
Drawer.prototype.build = function(content){
	this.el = new Element('div.drw').inject($('wrapper'));
	this.el.set('morph', {duration: 150});

	if (typeOf(content) === 'element'){
		this.el.adopt(content);
	}
};

/**
 * Show the drawer
 * @param {Boolean} instant Whether the showing should be instant
 */
Drawer.prototype.show = function(instant){
	if (!this.hidden) return;

	while (openDrawers.length){
		openDrawers.pop().hide();
	}

	openDrawers.push(this);

	if (instant){
		this.el.setStyles({
			'display': 'block',
			'margin-left': 0
		});
	} else {
		this.el.setStyle('display', 'block');
		this.el.morph({'margin-left': 0});
	}
	this.hidden = false;
	return this;
};

/**
 * Hide the drawer
 * @param {Boolean} instant Whether the hiding should be instant
 */
Drawer.prototype.hide = function(instant){
	if (this.hidden) return;
	instant = instant === true ? true : false;

	if (instant){
		this.el.setStyles({
			display: 'none',
			'margin-left': -250
		});
	} else {
		var self = this;
		this.el.morph({'margin-left': -250}).get('morph').chain(function(){
			self.el.setStyle('display', 'none');
		});
	}
	this.hidden = true;
	return this;
};

/**
 * Toggle the drawer
 * @param {Boolean} instant Whether the toggle should be instant
 */
Drawer.prototype.toggle = function(instant){
	if (this.hidden){
		this.show(instant);
	} else {
		this.hide(instant);
	}
	return this;
};

module.exports = Drawer;

