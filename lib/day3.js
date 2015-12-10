var _ = require('underscore');

function solve(part, data) {
	var x = 0, y = 0,
		houses = {}, key;

	houses[x + '-' + y] = 1;
	_.each(data, function(letter, i) {
		switch (letter) {
		case '>':
			x++; break;
		case '<':
			x--; break;
		case '^':
			y++; break;
		case 'v':
			y--; break;
		default:
			break;
		}

		key = x + '-' + y;
		if (!houses[key]) {
			houses[key] = 1;
		}
	});

	(part == 1) && console.log(_.keys(houses).length);
}
module.exports = solve;