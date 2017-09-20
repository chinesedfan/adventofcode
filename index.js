var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
var year = process.env.YEAR || '2015';
var day, part, solve;

if (args.length < 1) {
	console.log('Useage: node ' + path.basename(__filename) + ' <day> [part] [-f input]');
	return;
}

day = args.shift();
if (day.length < 2) {
    day = '0' + day;
}
part = 1;
if (args.length > 0 && /^1|2$/.test(args[0])) {
	part = args.shift();
}

solve = require('./lib/' + year + '/day' + day);
if (args.length > 1 && args[0] === '-f') {
	fs.readFile(args[1], (err, buf) => {
		if (err) throw err;
		solve(part, buf.toString());
	});
	return;
}
process.stdin.on('data', function(chunk) {
	var data = chunk.toString();
	if (data === '\n') {
		process.exit(0);
	}
	solve(part, data);
});
