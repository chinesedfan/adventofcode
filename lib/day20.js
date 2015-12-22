var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var target = data.replace(/\n/g, '');
	target /= 10;

	var cache = {},
		n = 1, sum;

	while (1) {
		findDividers(n, cache);
		sum = _.sum(cache[n], function(flag, key) {
			return parseInt(key);
		});
		if (sum >= target) break;
		n++;
	}
	console.log(n);
}

function findDividers(n, cache) {
	var result, a, limit, b;

	for (a = 2, limit = Math.floor(Math.sqrt(n)); a <= limit; a++) {
		if (n % a) continue;

		b = n / a;
		// merge dividers of b with a
		result = _.mapKeys(cache[b], function(flag, x) {
			return a * x;
		});
		_.extend(result, cache[b]);
		result[1] = 1;
		// calculate the sum
		cache[n] = result;
		break;
	}

	// prime
	if (!cache[n]) {
		cache[n] = {1: 1};
		cache[n][n] = 1;
	}
}