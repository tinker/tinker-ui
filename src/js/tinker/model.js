// Chiel Kunkels (@chielkunkels)

// exposed
var tinker = {};

// private
var validFormat = {
	meta: {
		hash: "",
		revision: 0,
		title: "",
		description: "",
		created: ""
	},
	dependancies: {
		javascripts: [""],
		stylesheets: [""]
	},
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

/**
 * Attempt to fetch the tinker data from the dom and parse it
 * @return {Object, Boolean} The tinker data, or false if not found
 */
var parseData = function(){
	var el;
	if ((el = $('tinker-data')) !== null) {
		var data = el.get('text');
		try {
			var parsed = JSON.parse(data);
			return parsed;
		} catch(e) {
			console.warn('Failed to parse Tinker json data: '+e.message);
			return false;
		}
	}
};

/**
 *
 */
var validateData = function(data, compare){
	var valid = {};
	Object.each(data, function(value, key){
		if (key in compare) {
			valid[key] = typeOf(value) === 'object'
				? validateData(value, compare[key])
				: value;
		}
	});
	return valid;
};

var parsed = parseData(), validated;
if (parsed) {
	validated = validateData(parsed, validFormat);
}

/**
 * Get data from the current tinker
 */
tinker.get = function(key){
	var path = key.split('.'), data = validated, key;
	while (path.length) {
		key = path.shift();
		if (key in data) {
			data = data[key];
		} else {
			break;
		}
	}
	return data;
};

/**
 * Run the tinker
 */
tinker.run = function(){
	console.log('run tinker');
};

/**
 * Save the tinker
 */
tinker.save = function(){
	console.log('save tinker');
};

// export
module.exports = tinker;
