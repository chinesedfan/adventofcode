var _ = require('lodash');

function getSum(o, filterRed) {
	if (typeof o === 'number') {
		return o;
	} else if (typeof o === 'string') {
		return 0;
	}

	if (filterRed && !_.isArray(o) && _.any(o, function(val) { return val === 'red'; })) {
		return 0;
	}

	return _.reduce(o, function(memo, val) {
		memo += getSum(val, filterRed);
		return memo;
	}, 0);
}

function solve(part, data) {
	data = data.replace(/\n/g, '');
	console.log(getSum(JSON.parse(data), part == 2));
}
module.exports = solve;