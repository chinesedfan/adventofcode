var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var rLine = /^(\S+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/,
		matches;
	var deers = {}, d, n, r,
		time = 2503, max;

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (!matches) return;

		d = deers[matches[1]] = {
			name: matches[1],
			speed: parseInt(matches[2]),
			keep: parseInt(matches[3]),
			rest: parseInt(matches[4]),
			//
			running: true,
			time: 0,
			distance: 0,
			point: 0
		};
	});

	for (var i = 0; i < time; i++) {
		max = -Infinity;
		_.each(deers, function(d) {
			d.time++;
			if (d.running) {
				d.distance += d.speed;
				if (d.time == d.keep) {
					d.running = false;
					d.time = 0;
				}
			} else {
				if (d.time == d.rest) {
					d.running = true;
					d.time = 0;
				}
			}
			if (d.distance > max) { max = d.distance; }
		});

		_.each(deers, function(d) {
			if (d.distance == max) { d.point++; }
		});
	}

	max = _.max(deers, function(d) {
		d.result = (part == 1) ? d.distance : d.point;
		return d.result; 
	});
	console.log(max.result);
}
