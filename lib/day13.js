var _ = require('underscore');

function allArrangement(list) {
	if (list.length == 1) {
		return [list];
	}

	var ret = [], i, tmp;
	for (i = 0; i < list.length; i++) {
		// swap element 0 and i
		tmp = list[0];
		list[0] = list[i];
		list[i] = tmp;

		_.each(allArrangement(list.slice(1)), function(rest) {
			ret.push([list[0]].concat(rest));
		});
	}
	return ret;
}
function addRule(rules, a, b, change) {
	rules[a] = rules[a] || {};
	rules[a][b] = change;
}
function optimal(rules) {
	var prev, next,
		max = -Infinity, change;

	_.each(allArrangement(_.keys(rules)), function(list) {
		change = _.reduce(list, function(memo, name, i) {
			// ignore the case that only has one guest
			prev = (i == 0) ? list[list.length - 1] : list[i - 1];
			next = (i == list.length - 1) ? list[0] : list[i + 1];

			memo += rules[name][prev];
			memo += rules[name][next];
			return memo;
		}, 0);

		if (change > max) {
			max = change;
		}
	});
	return max;
}

function solve(part, data) {
	var rLine = /^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\.$/,
		matches;
	var rules = {}, change;

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (matches) {
			change = parseInt(matches[3]);
			if (matches[2] == 'lose') change = -change;

			addRule(rules, matches[1], matches[4], change);
		}	
	});
	console.log(optimal(rules));
}
module.exports = solve;