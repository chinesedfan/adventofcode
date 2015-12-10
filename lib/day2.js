var _ = require('underscore');

function solve(part, data) {
	var total = 0;
	_.each(data.split('\n'), function(line) {
		var dimensions = line.split('x');
		if (dimensions.length != 3) return;

		dimensions = _.sortBy(dimensions, function(val) {
			return parseInt(val);
		});
		total += 3 * dimensions[0] * dimensions[1] + 2 * (dimensions[1] * dimensions[2] + dimensions[2] * dimensions[0]);
	});
	(part == 1) && console.log(total);
}
module.exports = solve;