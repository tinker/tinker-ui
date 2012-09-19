// Chiel Kunkels (@chielkunkels)
'use strict';

/**
 * Attempt to authenticate a user through a provider
 * @param {String} provider
 */
function auth(provider){
	provider = provider || 'github';
	window.location = '/auth/'+provider;
}

module.exports = {
	auth: auth
};

