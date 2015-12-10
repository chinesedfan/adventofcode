var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
var day, part, solve;

if (args.length < 1) {
	console.log('Useage: node ' + path.basename(__filename) + ' <day> [part]');
	return;
}

day = args.shift();
part = 1;
if (args.length > 0) {
	part = args[1];
}

solve = require('./lib/day' + day);
process.stdin.on('data', function(chunk) {
	var data = chunk.toString();
	if (data === '\n') {
		process.exit(0);
	}
	solve(part, data);
});
