var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var rLine = /^(\w+): capacity (\-?\d+), durability (\-?\d+), flavor (\-?\d+), texture (\-?\d+), calories (\-?\d+)$/,
		matches;
	var items = [];

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (!matches) return;

		items.push({
			name: matches[1],
			capacity: parseInt(matches[2]),
			durability: parseInt(matches[3]),
			flavor: parseInt(matches[4]),
			texture: parseInt(matches[5]),
			calories: parseInt(matches[6])
		});
	});

	var c, d, f, t,
		calories,
		score, max = 0;

	_.each(divide(100, items.length), function(ts) {
		c = _.sum(items, function(item, i) {
			return item.capacity * ts[i];
		});
		if (c <= 0) return;

		d = _.sum(items, function(item, i) {
			return item.durability * ts[i];
		});
		if (d <= 0) return;

		f = _.sum(items, function(item, i) {
			return item.flavor * ts[i];
		});
		if (f <= 0) return;

		t = _.sum(items, function(item, i) {
			return item.texture * ts[i];
		});
		if (t <= 0) return;

		if (part == 2) {
			calories = _.sum(items, function(item, i) {
				return item.calories * ts[i];
			});

			if (calories != 500) return;
		}

		score = c * d * f * t;
		if (score > max) {
			max = score;
		}
	});
	console.log(max);
}

function divide(teaspoons, n) {
	if (n == 1) return [[teaspoons]];

	var ret = [];
	for (var i = 0; i < teaspoons; i++) {
		_.each(divide(teaspoons - i, n - 1), function(list) {
			list.unshift(i);
			ret.push(list);
		});
	}
	return ret;
}