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

    let result;
    if (part === 1) {
        const area = {};
        const infintes = {};

        // check N+1 border to filter those infinte
        for (let x = xmin - 1; x <= xmax + 1; x++) {
            for (let y = ymin - 1; y <= ymax + 1; y++) {
                // stupid
                const obj = _(points).map((p, i) => ({
                    id: i,
                    d: distance({x, y}, p)
                })).groupBy((o) => o.d) // d => [o]
                    .entries() // [[d, [o]]]
                    .minBy(([d, o]) => +d); // [d, [o]]

                if (obj[1].length === 1) {
                    const id = obj[1][0].id;
                    area[id] = (area[id] || 0) + 1;

                    if (x == xmin - 1 || x == xmax + 1
                        || y == ymin - 1 || y == ymax + 1) {
                        obj[1].forEach((o) => infintes[o.id] = 1);
                    }
                }
            }
        }

        result = _(area)
            .entries()
            .filter(([k, v]) => !infintes[k])
            .map(([k, v]) => v)
            .max();
    } else {
        // in theory, the area may beyond the area of points, but we can ignore in this game
        result = 0;
        for (let x = xmin; x <= xmax; x++) {
            for (let y = ymin; y <= ymax; y++) {
                const s = _.sumBy(points, (p) => distance({x, y}, p));
                if (s < 10000) result++;
            }
        }
    }

    console.log(result);
};

function distance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}
