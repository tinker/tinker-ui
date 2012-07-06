// Chiel Kunkels (@chielkunkels)
'use strict';

// required modules
var events = require('./../events/model');

// exposed
var layout = {};

// TODO: remove this
slab.register({
	layout: function() {
		return ['<form method="post" action="#sandbox" target="sandbox" class="wrapper">',
				'<header>',
					'<section class="rgn rgn-tl"></section>',
					'<section class="rgn rgn-tc"></section>',
					'<section class="rgn rgn-tr"></section>',
				'</header>',
				'<section class="body"></section>',
				'<footer>',
					'<section class="rgn rgn-bl"></section>',
					'<section class="rgn rgn-bc"></section>',
					'<section class="rgn rgn-br"></section>',
				'</footer>',
			'</form>'].join('');
	}
});

// private
var regions = {};

var build = function(){
	var html = slab.load('layout')();

	document.body.set('html', html);

	regions = $$('.rgn');
	console.log(regions);
};

// events
events.on('layout.init', build);

// export
module.exports = layout;

