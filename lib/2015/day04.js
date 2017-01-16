var _ = require('lodash');
var crypto = require('crypto');

function md5(content) {
	var hash = crypto.createHash('md5');
	hash.update(content);
	return hash.digest('hex');
}
function solve(part, data) {
	var n = 1;
	var prefix = (part == 1) ? '00000' : '000000'

	data = data.replace(/\n/g, '');
	while (1) {
		if (md5(data + n).indexOf(prefix) == 0) break;
		n++;
	}
	console.log(n);
}
module.exports = solve;