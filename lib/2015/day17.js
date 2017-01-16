var _ = require('underscore');

module.exports = solve;

function solve(part, data) {
	var liters = 150,
		containers = [], kinds = new Array(liters);

	_.each(data.split('\n'), function(line) {
		containers.push(parseInt(line));
	});

	var result = f(containers, liters, 0);
	if (part == 2) {
		var min = _.min(result, 'length').length;
		result = _.filter(result, function(indexes) {
			return indexes.length == min;
		});
	}
	console.log(result.length);
}

function f(containers, liters, start) {
	if (liters == 0) return [[]];

	if (start == containers.length - 1) {
		return liters == containers[start] ? [[start]] : [];
	}

	// skip the first container
	var k1 = f(containers, liters, start + 1);
	// use the first container
	var k2 = (liters < containers[start] ? [] : f(containers, liters - containers[start], start + 1));
	_.each(k2, function(indexes) {
		indexes.unshift(start);
	});
	return k1.concat(k2);
}