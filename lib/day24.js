var _ = require('lodash');

function f(containers, target) {
	var cache = {}, prev, key, val;
	for (var i = 0; i < containers.length; i++) {
		if (i != 0) {
			prev = cache;
			cache = {};
		}
		for (var j = 0; j <= target; j++) {
			cache[j] = [];

			if (j == containers[i]) {
				// this container just fits
				cache[j].push([i]);
				continue;
			} else if (j > containers[i] && i != 0) {
				// this container and others
				val = prev[j - containers[i]];
				cache[j] = _.map(val, function(indexes) {
					indexes = _.clone(indexes);
					indexes.unshift(i);
					return indexes;
				});
			}

			if (i != 0) {
				// without this container
				if (!cache[j].length) {
					cache[j] = prev[j];
				} else if (prev[j].length) {
					// only keep shorter ones
					if (prev[j][0].length == cache[j][0].length) {
						cache[j] = cache[j].concat(prev[j]);
					} else if (prev[j][0].length < cache[j][0].length) {
						cache[j] = prev[j];
					}
				}
			}
		}
	}
	return cache[target];
}

function solve(part, data) {
	var containers = [];

	_.each(data.split('\n'), function(line) {
		containers.push(parseInt(line));
	});

	var target = _.sum(containers) / (part == 1 ? 3 : 4);
	var result = f(containers, target);
	var minlen = _.min(result, 'length').length;
	var minqe = Infinity, qe;
	_.each(result, function(indexes) {
		if (indexes.length != minlen) return;

		qe = _.reduce(indexes, function(memo, i) {
			return memo * containers[i];
		}, 1);
		if (qe < minqe) { minqe = qe; }
	})
	console.log(minqe);
}

module.exports = solve;
