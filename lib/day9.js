var _ = require('underscore');

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
function dijkstra(routes) {
	var rest = _.keys(routes),
		cur = [rest.pop()], mincur, optimal;

	while (rest.length) {
		optimal = _.min(rest, function(r) {
			mincur = _.min(cur, function(c) {
				return routes[r][c];
			});
			return routes[r][mincur];
		});

		cur.push(optimal);
		rest.splice(rest.indexOf(optimal), 1);
	}

	return _.reduce(cur, function(memo, id, i) {
		console.log(id);
		(i != 0) && (memo += routes[id][cur[i - 1]]);
		return memo;
	}, 0);
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
	console.log(floyd(routes));
}
module.exports = solve;