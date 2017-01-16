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

function hasRepeatedPair(str) {
	return _.any(str, function(letter, i) {
		if (i < 1) return false;

		var key = str.substring(i - 1, i + 1),
			prestr = str.substring(0, i - 1),
			posstr = str.substring(i + 1);
		return ~prestr.indexOf(key) || ~posstr.indexOf(key);
	});
}
function hasABA(str) {
	return _.any(str, function(letter, i) {
		if (i < 2) return false;

		return letter == str[i - 2];
	});
}

function isNice(part, str) {
	if (part == 1) {
		return has3vowels(str) && has2InRow(str) && notContain(str);
	} else if (part == 2) {
		return hasRepeatedPair(str) && hasABA(str);
	}
}
function solve(part, data) {
	var total = 0;
	_.each(data.split('\n'), function(word) {
		if (isNice(part, word)) total++;
	});
	console.log(total);
}
module.exports = solve;