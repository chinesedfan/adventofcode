'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const serial = +data;

    const n = 300; // total size
    const levels = {};
    const range = _.range(1, n + 1);
    range.forEach((y) => {
        range.forEach((x) => {
            const rack = x + 10;
            const temp = (rack * y + serial) * rack;
            levels[key(x, y)] = {
                x,
                y,
                k: 1,
                s: Math.floor(temp % 1000 / 100) - 5
            };
        });
    });

    let largest;
    let prev = levels;
    if (part == 1) {
        prev = calculateSums(prev, levels, n, 2);
        prev = calculateSums(prev, levels, n, 3);
        largest = _.maxBy(_.values(prev), (o) => o.s);
        console.log(`${largest.x},${largest.y}`);
    } else {
        // FIXME: too slow, maybe 5+ minutes
        largest = _(range)
            .map((k) => {
                const ret = _.maxBy(_.values(prev), (o) => o.s);
                if (k != n) {
                    // side effect in map, prepare for next
                    prev = calculateSums(prev, levels, n, k + 1);
                }
                return ret;
            })
            .maxBy((o) => o.s);
        console.log(`${largest.x},${largest.y},${largest.k}`);
    }
};

function key(x, y) {
    return `${x}#${y}`;
}
function calculateSums(prev, levels, n, k) {
    const sums = {}; // x#y -> {x, y, s}
    const range = _.range(1, n - k);
    range.forEach((y) => {
        range.forEach((x) => {
            sums[key(x, y)] = {
                x,
                y,
                k,
                s: prev[key(x, y)].s + _.sumBy(_.range(0, k), (i) => levels[key(x + k - 1, y + i)].s)
                    + _.sumBy(_.range(0, k), (j) => levels[key(x + j, y + k - 1)].s) - levels[key(x + k - 1, y + k - 1)].s
            };
        });
    });
    return sums;
}
