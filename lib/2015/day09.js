var _ = require('lodash');
var allArrangement = require('../permutation');

function getNode(routes, id) {
	if (!routes[id]) {
		routes[id] = {
			__id: id
		};
	}
	return routes[id];
}
function addRoute(routes, src, dst, distance) {
	src = getNode(routes, src);
	dst = getNode(routes, dst);
	src[dst.__id] = distance;
	dst[src.__id] = distance;	
}
function checkEach(routes, shortest) {
	var keys = _.keys(routes),
		min = Infinity, max = -Infinity, cur, distance;

	// Stupid! Check every possiable path
	_.each(allArrangement(keys), function(path) {
		cur = _.reduce(path, function(memo, id, i) {
			if (_.isUndefined(memo)) return;
			if (i == 0) return memo;

			distance = routes[id][path[i - 1]];
			if (_.isUndefined(distance)) return undefined;

			memo += distance;
			return memo;
		}, 0);
		// invalid path
		if (_.isUndefined(cur)) return;
		// update
		if (cur < min) min = cur;
		if (cur > max) max = cur;
	});
	return shortest ? min : max;
}

function floyd(routes) {
	var keys = _.keys(routes),
		row, prev, cur;

	// init the matrix
	_.each(keys, function(src, i) {
		row = {};
		_.each(keys, function(dst, j) {
			if (dst == src) {
				row[dst] = 0;
			} else {
				row[dst] = _.isUndefined(routes[src][dst]) ? Infinity : routes[src][dst];	
			}
		});
		routes[src].shortest = row;
	});

	// try to include node 0 ~ i
	_.each(keys, function(mid) {
		_.each(keys, function(src) {
			row = routes[src].shortest;
			_.each(keys, function(dst) {
				prev = row[dst];
				cur = row[mid] + routes[dst].shortest[mid];
				if (cur < prev) {
					row[dst] = cur;
				}
			});
		});
	});

	// find the min
	row = routes[keys[0]].shortest;
	cur = Infinity;
	_.each(row, function(val) {
		if (val < cur) {
			cur = val;
		}
	})
	return cur;
}

function solve(part, data) {
	var rLine = /(\w+) to (\w+) = (\d+)/,
		matches;
	var routes = {};

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (matches) {
			addRoute(routes, matches[1], matches[2], parseInt(matches[3]));
		}	
	});
	console.log(checkEach(routes, part == 1));
}
module.exports = solve;