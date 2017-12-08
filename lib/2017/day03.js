'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const n = parseInt(data);
    console.log(getDistance(n));
};

function getDistance(n) {
    // layer 0 has 1 number
    // layer i has 8 * i number
    let layer = 0;
    let count = 1;
    while (count < n) {
        layer++;
        count += 8 * layer;
    }
    if (layer == 0) return 0;

    // centers of each edge
    const centers = [count - layer, count - 3 * layer, count - 5 * layer, count - 7 * layer];
    const offset = _(centers)
            .map((c) => Math.abs(n - c))
            .min();

    return layer + offset;
}
