var _ = require('lodash');

function next(str) {
	var should = true, letter,
		ret = [];

	for (var i = str.length - 1; i >= 0; i--) {
		letter = str[i];
		if (should) {
			if (letter == 'z') {
				letter = 'a';
				should = true;
			} else {
				letter = String.fromCharCode(str.charCodeAt(i) + 1);
				should = false;
			}
		}
		ret.unshift(letter);
	}
	return ret.join('');
}

function isok(str) {
	return notConfused(str) && hasABC(str) && has2pairs(str);
}
function hasABC(str) {
	return _.any(str, function(letter, i) {
		if (i < 2) return false;

		return (str.charCodeAt(i) == str.charCodeAt(i - 1) + 1)
			&& (str.charCodeAt(i) == str.charCodeAt(i + 1) - 1);
	});
}
function notConfused(str) {
	return !/[iol]/.test(str);
}
function has2pairs(str) {
	var pairs = {}, count = 0, limit = 2;
	return _.any(str, function(letter, i) {
		if (i != 0 && str[i] == str[i - 1] && !pairs[letter]) {
			count++;
			pairs[letter] = 1;
		}
		return count >= limit;
	});
}

function solve(part, data) {
	data = data.replace(/\n/g, '');
	while (!isok(data)) {
		data = next(data);
	}
	if (part == 2) {
		data = next(data);
		while (!isok(data)) {
			data = next(data);
		}
	}
	console.log(data);
}
module.exports = solve;