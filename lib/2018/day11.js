'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const serial = +data;

    const n = 300; // total size
    let range = _.range(1, n + 1);
    const levels = range.map((y) => {
        return range.map((x) => {
            const rack = x + 10;
            const temp = (rack * y + serial) * rack;
            return Math.floor(temp % 1000 / 100) - 5;
        });
    });

    let largest;
    if (part == 1) {
        largest = findMax(levels, 3);
    } else {
        const ls = range.map((k) => findMax(levels, k));
        largest = _.maxBy(ls, (o) => o.s);
    }

    console.log(`${largest.x},${largest.y}`);
};

function findMax(levels, k) {
    const sums = [];
    const range = _.range(0, levels.length - k);
    range.forEach((y) => {
        range.forEach((x) => {
            sums.push({
                x: x + 1,
                y: y + 1,
                s: _.sumBy(
                    _.range(y, y + k),
                    (j) => _.sumBy(_.range(x, x + k), (i) => levels[j][i])
                )
            });
        });
    });
    return _.maxBy(sums, 's');
}
