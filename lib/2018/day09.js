'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const [match, n, last] = data.match(/(\d+) players; last marble is worth (\d+) points/);

    const marbles = [0];
    const scores = {};
    let cur = 0;
    let p = 0;
    for (let i = 1; i <= +last; i++) {
        if (i % 23) {
            cur = (cur + 1) % marbles.length;
            cur++;
            marbles.splice(cur, 0, i);
        } else {
            cur = (cur - 7) % marbles.length;
            scores[p] = (scores[p] || 0) + i;
            scores[p] += marbles.splice(cur, 1)[0];
        }
        p = (p + 1) % +n;
    }

    let result;
    if (part === 1) {
        result = _.max(_.values(scores));
    } else {
    }

    console.log(result);
};
