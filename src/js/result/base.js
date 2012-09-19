// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var result = {
	/**
	 * Create a new result view
	 */
	init: function(wrapper){
		this.wrapper = wrapper;
		this.build();
	},

	/**
	 * Build it
	 */
	build: function(){
		this.frame = new Element('div.result');
		this.iframe = new Element('iframe', {name: 'sandbox'}).inject(this.frame);
		this.frame.inject(this.wrapper);
	}
};

// export
exports = module.exports = result;

