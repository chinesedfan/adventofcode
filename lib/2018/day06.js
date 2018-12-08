'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const xs = [];
    const ys = [];
    const points = data.split('\n').map((line) => {
        const t = line.split(',');
        const p = {
            x: +t[0],
            y: +t[1]
        };
        xs.push(p.x);
        ys.push(p.y);
        return p;
    });

    const xmin = _.min(xs);
    const xmax = _.max(xs);
    const ymin = _.min(ys);
    const ymax = _.max(ys);
    const area = {};

    for (let x = xmin; x <= xmax; x++) {
        for (let y = ymin; y <= ymax; y++) {
            // stupid
            const obj = _(points).map((p, i) => ({
                id: i,
                d: distance({x, y}, p)
            })).groupBy((o) => o.d) // d => o
                .entries() // [[d, o]]
                .minBy((o) => +o[0]); // [d, o]
            if (obj[1].length === 1) {
                const id = obj[1][0].id;
                area[id] = (area[id] || 0) + 1;
            }
        }
    }

    let result;
    if (part === 1) {
        result = _(area).values().max();
    }

    console.log(result);
};

function distance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}
