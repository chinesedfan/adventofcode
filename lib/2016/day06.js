'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');
    const res = _(lines[0]).map((c, i) => {
        return _(lines).map((l) => l[i])
            .groupBy()
            .toArray()
            .sortBy([
                (g) => part == 1 ? -g.length : g.length,
                (g) => g[0]
            ])
            .map((g) => g[0])
            .first();
    }).join('');

    console.log(res);
};
