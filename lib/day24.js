var _ = require('lodash');

function f(containers, target) {
	var cache = {}, key, val;
	for (var i = 0; i < containers.length; i++) {
		for (var j = 0; j <= target; j++) {
			key = i + '-' + j;
			cache[key] = [];

			if (j == containers[i]) {
				// this container just fits
				cache[key].push([i]);
			} else if (j > containers[i] && i != 0) {
				// this container and others
				val = cache[(i-1) + '-' + (j-containers[i])];
				cache[key] = _.map(val, function(indexes) {
					indexes = _.clone(indexes);
					indexes.unshift(i);
					return indexes;
				});
			}

			if (i != 0) {
				// without this container
				cache[key] = cache[key].concat(cache[(i-1) + '-' + j]);
			}
		}
	}
	return cache[containers.length - 1 + '-' + target];
}

function solve(part, data) {
	var containers = [];

	_.each(data.split('\n'), function(line) {
		containers.push(parseInt(line));
	});

	var target = _.sum(containers) / 3;
	var result = f(containers, target);
	var minlen = _.min(result, 'length').length;
	console.log(minlen)
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
