var _ = require('underscore');

function allArrangement(list) {
	if (list.length == 1) {
		return [list];
	}

	var ret = [], i, tmp;
	for (i = 0; i < list.length; i++) {
		// swap element 0 and i
		tmp = list[0];
		list[0] = list[i];
		list[i] = tmp;

		_.each(allArrangement(list.slice(1)), function(rest) {
			ret.push([list[0]].concat(rest));
		});
	}
	return ret;
}

module.exports = allArrangement;
