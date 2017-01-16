var _ = require('lodash');

function escape(line) {
	// be careful that do not replace with any special letter again
	// i.e. "\\x27" -> \x27 -> '
	return line.replace(/^"/, '')
		.replace(/"$/, '')
		.replace(/\\\\/g, ' ')
		.replace(/\\"/g, ' ')
		.replace(/\\x[0-9a-f]{2}/g, ' ');
}
function encode(line) {
	return '"' + line.replace(/"/g, '  ')
		.replace(/\\/g, '  ') + '"';
}

function solve(part, data) {
	var total = 0;

	_.each(data.split('\n'), function(line) {
		if (part == 1) {
			total += line.length - escape(line).length;
		} else if (part == 2) {
			total += encode(line).length - line.length;	
		}
	});
	console.log(total);
}
module.exports = solve;