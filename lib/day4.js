var _ = require('underscore');
var crypto = require('crypto');

function md5(content) {
	var hash = crypto.createHash('md5');
	hash.update(content);
	return hash.digest('hex');
}
function solve(part, data) {
	var n = 1;

	data = data.replace(/\n/g, '');
	while (1) {
		if (md5(data + n).indexOf('00000') == 0) break;
		n++;
	}
	console.log(n);
}
module.exports = solve;