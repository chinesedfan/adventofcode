var _ = require('lodash');

function lookAndSay(line) {
	var cur, count = 0,
		ret = [];
	for (var i = 0; i < line.length; i++) {
		if (i == 0) {
			cur = line[i];
			count = 1;
		} else if (line[i] == cur) {
			count++;
		} else {
			ret.push(count, cur);
			cur = line[i];
			count = 1;
		}
	}
	ret.push(count, cur);
	return ret.join('');
}

function solve(part, data) {
	var round = (part == 1) ? 40 : 50;
	data = data.replace(/\n/g, '');
	for (var i = 0; i < round; i++) {
		data = lookAndSay(data);
	}
	console.log(data.length);
}
module.exports = solve;