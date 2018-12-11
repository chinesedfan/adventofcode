'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const serial = +data;

    const n = 300; // total size
    const k = 3;   // square size
    let range = _.range(1, n + 1);
    const levels = range.map((y) => {
        return range.map((x) => {
            const rack = x + 10;
            const temp = (rack * y + serial) * rack;
            return Math.floor(temp % 1000 / 100) - 5;
        });
    });

    const sums = [];
    range = _.range(1, n - k + 1);
    range.forEach((y) => {
        range.forEach((x) => {
            sums.push({
                x, y,
                s: _.sum([
                    levels[y - 1][x - 1], levels[y - 1][x], levels[y - 1][x + 1],
                    levels[y][x - 1], levels[y][x], levels[y][x + 1],
                    levels[y + 1][x - 1], levels[y + 1][x], levels[y + 1][x + 1]
                ])
            });
        });
    });

    const largest = _.maxBy(sums, 's');
    console.log(`${largest.x},${largest.y}`);
};
