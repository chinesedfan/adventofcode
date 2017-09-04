'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const n = parseInt(data.replace('\n', ''));
    console.log(part == 1 ? f1(n) : f2(n));
};

function f1(rest) {
    let res = 1;
    let factor = 2;

    // for each round, suppose `rest` elves have gifts
    // if `rest` is even, the `res` one keeps having gifts
    // if `rest` is odd, we should update `res`
    while (rest > 1) {
        if (rest & 1) {
            res += factor;
        }

        rest >>= 1;
        factor <<= 1;
    }
    return res;
}

// the current O(n) solution is inspired by
// https://www.reddit.com/r/adventofcode/comments/5j4lp1/2016_day_19_solutions/dbf6lrf/
// there exists a better O(1) solution, but I can't understand
// https://www.reddit.com/r/adventofcode/comments/5j4lp1/2016_day_19_solutions/dbdihvu/
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
