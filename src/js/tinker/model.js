// Chiel Kunkels (@chielkunkels)
'use strict';

var event = require('./../event/model');

// private
var format = {
	meta: {
		hash: "",
		revision: 0,
		title: "",
		description: "",
		created: ""
	},
	dependencies: [""],
	code: {
		markup: {
			type: "",
			body: ""
		},
		style: {
			type: "",
			body: ""
		},
		behaviour: {
			type: "",
			body: ""
		}
	}
};

var dirty = false, data = {};

data.current = {
	code: {
		markup: {
			type: "html",
			body: ""
		},
		style: {
			type: "css",
			body: ""
		},
		behaviour: {
			type: "js",
			body: ""
		}
	}
}


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
		data.current = validateData(parseData(), format);
	}
	data.saved = data.current;
}

/**
 * Attempt to fetch the tinker data from the dom and parse it
 * @return {Object, Boolean} The tinker data, or false if not found
 */
function parseData(){
	var el = $('tinker-data');
	if (el !== null) {
		var data = el.get('text');
		try {
			var parsed = JSON.parse(data);
			return parsed;
		} catch(e) {
			console.warn('Failed to parse Tinker json data: '+e.message);
			return false;
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
			if (d[k] !== value) {
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
	console.log('save tinker');
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

