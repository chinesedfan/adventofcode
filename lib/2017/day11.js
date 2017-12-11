'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const counts = _(data.split(','))
            .groupBy()
            .mapValues((g) => g.length)
            .value();
    _.each(['n', 's', 'nw', 'sw', 'ne', 'se'], (k) => {
        if (!counts[k]) counts[k] = 0;
    });

    const deltas = _.sortBy([
        counts.n - counts.s,
        counts.nw - counts.se,
        counts.ne - counts.sw
    ]);

    const result = getDistance(deltas);
    console.log(result);
};

function getDistance(deltas) {
    // a <= b <= c
    const [a, b, c] = _(deltas).map((x) => Math.abs(x)).sortBy().value();
    if (a >= 0 || c <= 0) {
        // the same side
        return b + c;
    } else {
        return c - b + b - a;
    }
}
