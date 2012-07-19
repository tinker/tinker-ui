// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var result = {
	/**
	 *
	 */
	init: function(wrapper){
		this.wrapper = wrapper;
		this.build();
	},

	/**
	 *
	 */
	build: function(){
		this.frame = new Element('div.result');
		this.iframe = new Element('iframe', {name: 'sandbox'}).inject(this.frame);
		this.frame.inject(this.wrapper);
	}
};

// export
module.exports = result;

