var _ = require('underscore');

module.exports = solve;

function solve(part, data) {
	var liters = 150,
		containers = [], kinds = new Array(liters);

	_.each(data.split('\n'), function(line) {
		containers.push(parseInt(line));
	});

	console.log(f(containers, liters, 0));
}

function f(containers, liters, start) {
	if (liters == 0) return 1;

	if (start == containers.length - 1) {
		return liters == containers[start] ? 1 : 0;
	}

	// skip the first container
	var k1 = f(containers, liters, start + 1);
	// use the first container
	var k2 = (liters < containers[start] ? 0 : f(containers, liters - containers[start], start + 1));
	return k1 + k2;
}