'use strict';

var events = require('./../lib/events'),
	layout = require('./layouts/init'),
	tinker = require('./../lib/tinker'),
	Popover = require('./popover');

var metaButton, metaPopover, metaTitle, metaDescription;

/**
 * Build up required elements
 */
function build(){
	metaButton = new Element('span.icn42.icn-meta', {
		events: { click: metaClick }
	});
	layout.addToRegion(metaButton, 'lt');

	var data = {
		title: tinker.get('meta.title') || '',
		description: tinker.get('meta.description') || ''
	};

	var content = new Element('div', {html: slab.load('meta')(data)}).getChildren()[0];
	metaPopover = new Popover(content, {toggle: metaButton});
	metaTitle = content.getElement('#meta-title');
	metaDescription = content.getElement('#meta-description');
}

/**
 *
 */
function update(){
	tinker.set('meta.title', metaTitle.get('value'));
	tinker.set('meta.description', metaDescription.get('value'));
}

/**
 * Handle click on meta button
 */
function metaClick(e){
	e.preventDefault();
	metaPopover.toggle();
}

events.on('layout.build', build);
events.on('tinker.update', update);

