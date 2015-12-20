var _ = require('underscore');

module.exports = solve;

function solve(part, data) {
	var rRule = /^(\w+) => (\w+)$/, matches;
	var rules = [], input;

	_.each(data.split('\n'), function(line, i, list) {
		if (i == list.length - 1) {
			input = line;
			return;
		}

		matches = rRule.exec(line);
		if (matches) {
			rules.push({
				before: matches[1],
				after: matches[2]
			});
		}
	});

	var result = {};
	step(input, rules, result);
	console.log(_.keys(result).length);
}

function step(input, rules, result) {
	var start, after;
	_.each(rules, function(rule) {
		start = 0;
		while (~(start = input.indexOf(rule.before, start))) {
			after = input.substr(0, start) + rule.after;
			start += rule.before.length;
			after += input.substr(start);

			if (!result[after]) {
				result[after] = 1;
			}
		}
	});
}