var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var i = 2, j = 1, prev = 20151125;

	while (1) {
		prev = prev * 252533 % 33554393;
		if (i == 2947 && j == 3029) {
			console.log(prev);
			break;
		}

		if (i == 1) {
			i = j + 1;
			j = 1;
		} else {
			i--;
			j++;
		}
	}
};
