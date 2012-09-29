// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model'),
	config = require('./../config/model'),
	util = require('./../util/model');

// private
var format = {
	meta: {
		hash: '',
		revision: 0,
		title: '',
		description: '',
		created: ''
	},
	dependencies: [''],
	code: {
		markup: {
			type: '',
			body: ''
		},
		style: {
			type: '',
			body: ''
		},
		behaviour: {
			type: '',
			body: ''
		}
	}
};

var dirty = false, data = {};

data.current = {
	code: {
		markup: {
			type: 'html'
		},
		style: {
			type: 'css'
		},
		behaviour: {
			type: 'js'
		}
	}
};


/**
 * Executed the first time the module is loaded
 */
function setup(){
	window.onbeforeunload = function(){
		if (isDirty()){
			return 'You have unsaved changes to this Tinker';
		}
	};

	if ($('tinker-data')) {
		data.current = validateData(util.parseData('tinker-data'), format);
	}
	data.saved = data.current;

	var meta = get('meta');
	if (meta && meta.hash){
		var url = '/'+meta.hash+'/'+meta.revision+'/';
		if (url !== window.location.pathname) {
			if (!!(window.history && window.history.pushState)) {
				window.history.pushState(null, null, url);
			} else {
				window.location = url;
			}
		}
	}
}

/**
 * Validate a data structure against a valid tinker format
 * @param {Mixed} data The data to validate
 * @param {Mixed} compare The format to validate against
 * @return {Mixed} The filtered/validated data
 */
function validateData(data, compare){
	var valid = {};
	Object.each(data, function(value, key){
		if (key in compare) {
			valid[key] = typeOf(value) === 'object' ?
				validateData(value, compare[key]) :
				value;
		}
	});
	return valid;
}

/**
 * Executed upon layout built
 */
function init(){
	if (get('meta.hash')) run();
}

/**
 * Check if a given key is valid
 * @param {String} key The path to validate
 */
function isValidKey(key){
	var path = key.split('.'), k, f = format;
	while (path.length) {
		k = path.shift();
		if (k in f) {
			f = f[k];
		} else {
			return false;
		}
	}
	return true;
}

/**
 * Check if the tinker has unsaved changes
 */
function isDirty(){
	return dirty;
}

/**
 * Get data from the current tinker
 * @param {String} key The key to fetch
 * @return {Mixed} The data
 */
function get(key){
	if (!key) return data.current;
	var path = key.split('.'), k, d = data.current;
	while (path.length) {
		k = path.shift();
		if (d && k in d) {
			d = d[k];
		} else {
			d = undefined;
			break;
		}
	}
	return d;
}

/**
 * Set some new data into the tinker
 * @param {String} key The key to set
 * @param {Mixed} value The value to set
 */
function set(key, value){
	if (!isValidKey(key)) return;
	var clone = Object.clone(data.current), change = false,
		path = key.split('.'), k, d = clone;
	while (path.length) {
		k = path.shift();
		if (path.length){
			if (!(k in d)) d[k] = {};
			d = d[k];
		} else {
			if (!util.isEqual(d[k], value)) {
				change = true;
				d[k] = value;
			}
		}
	}
	if (change) {
		data.current = clone;
		dirty = true;
	}
}


/**
 * Run the tinker
 */
function run(){
	event.emit('tinker.update');
	event.emit('tinker.run');
	$('wrapper').submit();
}

/**
 * Save the tinker
 */
function save(){
	run();
	event.emit('tinker.update');
	new Request.JSON({
		method: 'post',
		url: config.urls.api+'/tinkers',
		data: JSON.stringify(get()),
		onSuccess: function(response){
			data.saved = Object.clone(data.current);
			dirty = false;
			var url = config.urls.client;
			url += '/'+response.meta.hash+'/'+response.meta.revision+'/';

			if (!!(window.history && window.history.pushState)) {
				window.history.pushState(null, null, url);
			} else {
				window.location = url;
			}
		},
		onFailure: function(){
			console.log('oooooh shit', arguments);
		}
	}).send();
}

event.on('tinker.load', init);
setup();

// export
exports = module.exports = {
	get: get,
	set: set,
	run: run,
	save: save
};

