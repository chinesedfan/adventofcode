var _ = require('underscore');

function has3vowels(str) {
	var count = 0;
	return _.any(str, function(letter) {
		if (/[aeiou]/.test(letter)) count++;
		if (count >= 3) return true;
	});
}
function has2InRow(str) {
	return _.any(str, function(letter, i) {
		return (i != 0 && letter == str[i - 1]);
	});
}
function notContain(str) {
	return !/ab|cd|pq|xy/.test(str);
}
function isNice(str) {
	return has3vowels(str) && has2InRow(str) && notContain(str);
}
function solve(part, data) {
	var total = 0;
	_.each(data.split('\n'), function(word) {
		if (isNice(word)) total++;
	});
	console.log(total);
}
module.exports = solve;