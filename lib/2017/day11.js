'use strict';
const _ = require('lodash');

const DIRECTIONS = ['n', 'ne', 'se', 's', 'sw', 'nw']; // clockwise

module.exports = function(part, data) {
    const counts = {};
    _.each(DIRECTIONS, (k) => {
        counts[k] = 0;
    });

    let max = 0, d;
    _.each(data.split(','), (dir) => {
        counts[dir]++;

        d = getDistance(counts);
        if (d > max) max = d;
    });
    console.log(part == 1 ? d : max);
};

function getDistance(counts) {
    const deltas = {};
    addDelta(deltas, counts, 'n', 's');
    addDelta(deltas, counts, 'ne', 'sw');
    addDelta(deltas, counts, 'nw', 'se');

    // a <= b <= c
    const [a, b, c] = _(deltas).values().sortBy().value();
    if (isSameSide(_.keys(deltas))) {
        return b + c;
    } else {
        return c - b + b - a;
    }
}

function addDelta(deltas, counts, k1, k2) {
    if (counts[k1] > counts[k2]) {
        deltas[k1] = counts[k1] - counts[k2];
    } else {
        deltas[k2] = counts[k2] - counts[k1];
    }
}

function isSameSide(dirs) {
    let indexes = _(dirs).map((d) => DIRECTIONS.indexOf(d)).sortBy().value();
    // concat a copy to handle the ring
    indexes = indexes.concat(_.map(indexes, (index) => index + DIRECTIONS.length));
    return _.some(indexes, (index, i) => {
        if (i + 2 < indexes.length) {
            return indexes[i + 1] == index + 1 && indexes[i + 2] == index + 2;
        }
        return false;
    });
}
