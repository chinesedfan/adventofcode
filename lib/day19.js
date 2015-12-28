var _ = require('underscore');

module.exports = solve;

function solve(part, data) {
	var rRule = /^(\w+) => (\w+)$/, matches;
	var rules = [], input;
	var keys = {};

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
			keys[matches[1]] = 1;
		}
	});
	keys['Rn'] = 1;
	keys['Y'] = 1;
	keys['Ar'] = 1;
	// special one not existed in left sides
	keys['C[^a]'] = 1;

	var result = {};
	if (part == 1) {
		result = step(input, rules);
		console.log(_.keys(result).length);
	} else {
		/**
		 * Notice that 'Rn' always appears with 'Ar', and 'Y' are in the middle of them,
		 * which is similar with parentheses and commas.
		 *
		 * Suppose the initial length is 1 and the final string contains t tokens. If
		 * duaring every step one token becomes two tokens, then it requires t-1 steps.
		 *
		 * Consider parentheses, it requires t-parentheses-1 steps.
		 *
		 * Consider commas, because every comma introduces an extra token, it requries
		 * t-parentheses-2*commas-1 steps.
		 */
		var tokens = _.reduce(keys, function(memo, v, k) {
			memo += count(input, k);
			return memo;
		}, 0);
		var parentheses = count(input, 'Rn') + count(input, 'Ar');
		var commas = count(input, 'Y');
		console.log(tokens - parentheses - 2*commas - 1);
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

function count(input, letter) {
	return (input.match(new RegExp(letter, 'g')) || []).length;
}
