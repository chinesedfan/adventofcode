var _ = require('underscore');

function getKey(pos, letter) {
	var x = pos.x,
		y = pos.y;
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
	pos.x = x;
	pos.y = y;
	return x + '-' + y;
}

function solve(part, data) {
	var santa = {x: 0, y: 0},
		robot = {x: 0, y: 0},
		houses = {}, key;

	houses['0-0'] = 1;
	_.each(data, function(letter, i) {
		key = getKey((part == 2 && (i & 1)) ? robot : santa, letter);
		if (!houses[key]) {
			houses[key] = 1;
		}
	});

	console.log(_.keys(houses).length);
}
module.exports = solve;