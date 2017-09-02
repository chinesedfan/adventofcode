'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const n = parseInt(data.replace('\n', ''));
    console.log(part == 1 ? f1(n) : f2(n));
};

function f1(rest) {
    let res = 1;
    let factor = 2;

    while (rest > 1) {
        if (rest & 1) {
            res += factor;
        }

        rest >>= 1;
        factor <<= 1;
    }
    return res;
}

function f2(n) {
    if (n == 1) return 1;

    let win = f2(n - 1) + 1;
    const removed = 1 + Math.floor(n / 2);
    if (removed <= win) {
        if (++win > n) win = 1;
    }
    return win;
}
