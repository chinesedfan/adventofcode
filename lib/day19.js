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
	if (part == 1) {
		result = step(input, rules);
		console.log(_.keys(result).length);
	} else {
		var round = 0,
			target = 'HOHOHO', before;

		result = {e: 1};
		while (!result[target]) {
			before = result;
			result = {};
			_.each(before, function(val, key) {
				_.extend(result, step(key, rules));
			});
			_.each(result, function(val, key) {
				if (key.length > target.length) delete result[key];
			});
			round++;

			console.log(result);
		}
		console.log(round);
	}
}

function step(input, rules) {
	var result = {}, start, after;
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
	return result;
}