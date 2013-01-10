'use strict';

/**
 * Attempt to fetch data from the dom and parse it
 * @return {Object, Boolean} The data, or false if not found
 */
function parseData(id){
	var data = $(id);
	if (data === null) return;

	try {
		return JSON.parse(data.get('text'));
	} catch(e) {
		console.warn('Failed to parse json data: '+e.message);
		return false;
	}
}

function isEmpty(v){
	switch(typeOf(v)){
		case 'null': return true;
		case 'object': return !Object.keys(v).length;
		case 'array': return !v.length;
		case 'string': return !v.length;
	}
}

function isEqual(a, b){
	return a === b;
}

exports = module.exports = {
	parseData: parseData,
	isEmpty: isEmpty,
	isEqual: isEqual
};

