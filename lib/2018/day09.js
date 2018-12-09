'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let [match, n, last] = data.match(/(\d+) players; last marble is worth (\d+) points/);
    n = +n;
    last = +last * (part == 1 ? 1 : 100);

    // list is much efficient than array
    let point = {
        val: 0
    };
    point.next = point;
    point.prev = point;

    const scores = {};
    let p = 0;
    for (let i = 1; i <= last; i++) {
        if (i % 23) {
            const added = {
                val: i,
                next: point.next.next,
                prev: point.next
            };
            added.next.prev = added;
            added.prev.next = added;
            point = added;
        } else {
            let step = 7;
            while (step--) point = point.prev;

            scores[p] = (scores[p] || 0) + i;
            scores[p] += point.val;

            point.prev.next = point.next;
            point.next.prev = point.prev;
            point = point.next;
        }
        p = (p + 1) % n;
    }

    console.log(_.max(_.values(scores)));
};
