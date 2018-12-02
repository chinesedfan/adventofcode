'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');

    let result;
    if (part === 1) {
        let c2 = 0, c3 = 0;
        lines.forEach((l) => {
            const c = _(l.split(''))
                .groupBy().values().map((x) => x.length);
            if (c.some((x) => x === 2)) c2++;
            if (c.some((x) => x === 3)) c3++;
        });
        result = c2 * c3;
    } else {
        lines.sort();
        lines.some((l, i) => {
            if (i === 0) return false;

            let n = 0;
            const same = [];
            // suppose them are the same length
            l.split('').forEach((c, j) => {
                if (c !== lines[i - 1][j]) n++;
                else same.push(c);
            });

            if (n === 1) {
                result = same.join('');
                return true;
            }
        });
    }

    console.log(result);
};
