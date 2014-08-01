'use strict';

var agent = require('agent'),
	bundles = require('../bundles'),
	config = require('../config');

/**
 * Execute the user's current code
 * @param {Object} bundle
 */
var save = function(bundle){
	var urlHash = bundle.meta.hash ? '/' + bundle.meta.hash : '',
		req = agent('post', config.urls.api + '/bundles' + urlHash);
	req.data(JSON.stringify(bundle));
	req.header('content-type', 'application/json');

	req.send(function(err, response){
		if (err){
			console.log(err);
			return;
		}

		var meta = response.body.meta;
		bundles.setHash(meta.hash);
		window.history.pushState(null, '', '/' + meta.hash + '/' + meta.revision + '/');
	});
};

module.exports = save;
