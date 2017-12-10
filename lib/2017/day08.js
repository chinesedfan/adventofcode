'use strict';
const _ = require('lodash');
const rLine = /^(\w+) (inc|dec) (-?\d+) if (\w+) ((?:>|<|=|!)=?) (-?\d+)$/;

module.exports = function(part, data) {
    const map = {};
    let max = 0;
    _.each(data.split('\n'), (line) => {
        // save
        const matches = rLine.exec(line);
        const item = {
            name: matches[1],
            isInc: matches[2] == 'inc',
            delta: parseInt(matches[3]),
            other: matches[4],
            op: matches[5],
            opTarget: matches[6]
        };

        // execute
        const result = eval(`${map[item.other] || 0} ${item.op} ${item.opTarget}`);
        if (!result) return;

        if (!map[item.name]) map[item.name] = 0;
        if (item.isInc) {
            map[item.name] += item.delta;
        } else {
            map[item.name] -= item.delta;
        }
        max = Math.max(map[item.name], max);
    });

    // max
    if (part == 1) {
        max = _(map).mapValues((v, k) => ({k, v})).values().maxBy((o) => o.v).v;
    }
    console.log(max);
};
