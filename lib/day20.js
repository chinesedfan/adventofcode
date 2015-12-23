var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var target = data.replace(/\n/g, '');
	target /= 10;

	// get the upper bound
	var n = 1, max = 2;
	while (getSumOfPow(2, n) < target) {
		n++;
		max <<= 1;
	}

	// simulate
	var houses = new Array(max + 1); // skip element 0
	for (var i = 1; i <= max; i++) {
		for (var h = i; h < houses.length; h += i) {
			houses[h] = houses[h] || 0;
			houses[h] += i;
		}
	}

	// scan and find the first
	_.any(houses, function(sum, h) {
		if (sum >= target) {
			console.log(h)
			return true;
		}
		return false;
	});
}

/**
 * returns the sum of divisors of Math.pow(x, n)
 */
function getSumOfPow(x, n) {
	// divisors are 1, x, x^2, ..., x^n
	return (Math.pow(x, n + 1) - 1)/(x - 1);
}