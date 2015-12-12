var _ = require('underscore');

function getSum(o) {
	if (typeof o === 'number') {
		return o;
	} else if (typeof o === 'string') {
		return 0;
	}

	return _.reduce(o, function(memo, val) {
		memo += getSum(val);
		return memo;
	}, 0);
}

function solve(part, data) {
	data = data.replace(/\n/g, '');
	console.log(getSum(JSON.parse(data)));
}
module.exports = solve;