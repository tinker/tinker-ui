'use strict';

var agent = require('agent'),
	config = require('./../config');

/**
 * Execute the user's current code
 * @param {Object} bundle
 */
var save = function(bundle){
	var req = agent('post', config.urls.api + '/bundles');
	req.data(JSON.stringify(bundle));
	req.header('content-type', 'application/json');

	req.send(function(err, response){
		if (err){
			console.log(err);
			return;
		}

		console.log(response.body);
	});
};

module.exports = save;
