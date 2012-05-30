// Chiel Kunkels (@chielkunkels)
'use strict';

// exposed
var user = {};

/**
 * Attempt to log a user in
 * @param {String} email
 * @param {String} password
 * @return {Boolean}
 */
user.login = function(email, password){
	console.log('./user/model.login(', email, password, ');');
};

/**
 * Log the current user out
 * @return {Boolean}
 */
user.logout = function(){
	console.log('./user/model.logout();');
};

module.exports = user;

