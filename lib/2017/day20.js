'use strict';
const _ = require('lodash');
const reg = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/;

module.exports = function(part, data) {
    const ps = _.map(data.split('\n'), (line) => {
        const matches = reg.exec(line);

        return {
            p: matches.slice(1, 4).map((str) => parseInt(str)),
            v: matches.slice(4, 7).map((str) => parseInt(str)),
            a: matches.slice(7, 10).map((str) => parseInt(str))
        };
    });

    let t = 1;
    let min = 0;
    let count = 0;
    // not exactly, just try
    while (1) {
        const distances = _.map(ps, (p, i) => ({
            i,
            d: getDistance(p, t)
        }));
        const id = _.minBy(distances, (item) => item.d).i;
        if (id == min) {
            count++;
            if (count == 5) break; // maybe stable
        } else {
            count = 1;
        }

        t *= 2;
        min = id;
    }

    console.log(min);
};

function getDistance(particle, t) {
    const {p, v, a} = particle;
    const cur = _.map(p, (x, i) => a[i] * t * t / 2 + v[i] * t);
    return _.reduce(cur, (d, x) => d += x * x, 0); // without sqrt
}
