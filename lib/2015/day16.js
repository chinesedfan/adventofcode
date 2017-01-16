var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	// in fact, the problem can give any kinds of instructions
	// but each record in the input always contains 3
	var rLine = /^Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)$/,
		matches;
	var aunts = {}, a;

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (!matches) return;

		aunts[matches[1]] = a = {};

		a[matches[2]] = matches[3];
		a[matches[4]] = matches[5];
		a[matches[6]] = matches[7];
	});

	var tips = {
		children: 3,
		cats: 7,
		samoyeds: 2,
		pomeranians: 3,
		akitas: 0,
		vizslas: 0,
		goldfish: 5,
		trees: 3,
		cars: 2,
		perfumes: 1
	};
	_.any(aunts, function(a, index) {
		var isok = _.every(a, function(val, key) {
			if (part == 2) {
				if (key == 'cats' || key == 'trees') {
					return val > tips[key];
				} else if (key == 'pomeranians' || key == 'goldfish') {
					return val < tips[key];
				}
			}
			return val == tips[key];
		});
		if (isok) {
			console.log(index);
		}
		return isok;
	});
}
