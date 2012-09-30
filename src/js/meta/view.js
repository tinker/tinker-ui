// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model'),
	layout = require('./../layout/client'),
	tinker = require('./../tinker/model'),
	Popover = require('./../popover/view');

var metaButton, metaPopover, metaTitle, metaDescription;

/**
 * Build up required elements
 */
function build(){
	metaButton = new Element('span.icn50.icn-meta', {
		events: { click: metaClick }
	});
	layout.addToRegion(metaButton, 0);

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

// events
event.on('layout.build', build);
event.on('tinker.update', update);

