var _ = require('underscore');

function solve(part, data) {
	var floor = 0;
	_.each(data, function(letter) {
		if (letter == '(') {
			floor++;
		} else if (letter == ')') {
			floor--;
		}
	});

	console.log(floor);
}
module.exports = solve;