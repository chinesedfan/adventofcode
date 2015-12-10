var _ = require('underscore');

function escape(line) {
	// be careful that do not replace with any special letter again
	// i.e. "\\x27" -> \x27 -> '
	return line.replace(/^"/, '')
		.replace(/"$/, '')
		.replace(/\\\\/g, ' ')
		.replace(/\\"/g, ' ')
		.replace(/\\x[0-9a-f]{2}/g, ' ');
}

function solve(part, data) {
	var total = 0;

	_.each(data.split('\n'), function(line) {
		total += line.length - escape(line).length;
	});
	console.log(total);
}
module.exports = solve;