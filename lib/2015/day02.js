var _ = require('lodash');

function cost(part) {
	return part == 1 ? function(a, b, c) {
		return 3 * a * b + 2 * (a * c + b * c);
	} : function(a, b, c) {
		return 2 * (a + b) + a * b * c;
	};
}
function solve(part, data) {
	var total = 0;
	var fn = cost(part);
	_.each(data.split('\n'), function(line) {
		var dimensions = line.split('x');
		if (dimensions.length != 3) return;

		dimensions = _.map(dimensions, function(val) {
			return parseInt(val);
		});
		dimensions = _.sortBy(dimensions);
		total += fn.apply(this, dimensions);
	});
	console.log(total);
}
module.exports = solve;