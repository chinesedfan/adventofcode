var _ = require('underscore');

module.exports = solve;

function solve(part, data) {
	var rLine = /^(\S+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/,
		matches;
	var deers = {}, d, n, r
		time = 2503, result = -Infinity;

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (!matches) return;

		d = deers[matches[1]] = {
			name: matches[1],
			speed: parseInt(matches[2]),
			keep: parseInt(matches[3]),
			rest: parseInt(matches[4])
		};

		n = Math.floor(time / (d.keep + d.rest));
		r = time % (d.keep + d.rest);
		d.distance = (n * d.keep + Math.min(r, d.keep)) * d.speed;

		if (d.distance > result) { result = d.distance; }
	});
	console.log(result);
}
