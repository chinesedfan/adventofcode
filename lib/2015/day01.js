var _ = require('lodash');

function solve(part, data) {
	var floor = 0;
	_.any(data, function(letter, i) {
		if (letter == '(') {
			floor++;
		} else if (letter == ')') {
			floor--;
		}

		if (part == 2 && floor == -1) {
			console.log(i + 1);
			return true;
		}
	});

	(part == 1) && console.log(floor);
}
module.exports = solve;