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
    let win = 1;
    for (let i = 2; i <= n; i++) {
        // if `i - 1` elves starting with `1` then `win` wins
        // the start index increases every round, so `win` should also increase one
        win++;

        // if `removed` is after `win`, it doesn't change
        // otherwise, `win` increases to fix the effect of removed
        const removed = 1 + Math.floor(i / 2);
        if (removed <= win) {
            if (++win > i) win = 1;
        }
    }
    return win;
}
