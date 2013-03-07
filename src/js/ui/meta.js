'use strict';

var events = require('./../lib/events'),
	layout = require('./layouts/init'),
	tinker = require('./../lib/tinker'),
	Drawer = require('./drawer');

var button, drawer, metaTitle, metaDescription;

/**
 * Build up required elements
 */
function build(){
	button = new Element('span.icn42.icn-meta', {
		events: { click: metaClick }
	});
	layout.addToRegion(button, 'lt');

	var data = {
		title: tinker.get('meta.title') || '',
		description: tinker.get('meta.description') || ''
	};

	var content = new Element('div', {html: slab.load('meta')(data)}).getChildren()[0];
	drawer = new Drawer(content).hide(true);
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
	drawer.toggle();
}

events.on('layout.build', build);
events.on('tinker.update', update);

