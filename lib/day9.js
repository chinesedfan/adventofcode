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
function shortest(routes) {
	// dijkstra
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
	console.log(shortest(routes));
}
module.exports = solve;