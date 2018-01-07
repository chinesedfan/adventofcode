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

    const f = part == 1 ? f1 : f2;
    f(ps);
};

function f1(ps) {
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
}

function getCur(particle, t) {
    const {p, v, a} = particle;
    return _.map(p, (x, i) => a[i] * t * t / 2 + v[i] * t + x);
}
function getDistance(particle, t) {
    return _.reduce(getCur(particle, t), (d, x) => d += Math.abs(x), 0);
}

function f2(ps) {
    _.each(ps, (p1, i) => {
        _.each(ps, (p2, j) => {
            if (i == j) return;

            if (willCollide(p1, p2)) {
                p1.collided = true;
                p2.collided = true;
            }
        });
    });

    const left = _.filter(ps, (p) => !p.collided);
    console.log(left.length);
}

function willCollide(p1, p2) {
    const a = (p1.a[0] - p2.a[0]) / 2;
    const b = p1.v[0] - p2.v[0];
    const c = p1.p[0] - p2.p[0];

    // solve the equation
    if (!a) return isSame(p1, p2, b ? -c / b : 0);

    const delta = b * b - 4 * a * c;
    if (delta < 0) return false;

    const t1 = (-b + Math.sqrt(delta)) / (2 * a);
    const t2 = (-b - Math.sqrt(delta)) / (2 * a);
    return isSame(p1, p2, t1) || isSame(p1, p2, t2);
}
function isSame(p1, p2, t) {
    if (t < 0) return false;
    if (!_.isInteger(t)) return false;

    const c1 = getCur(p1, t);
    const c2 = getCur(p2, t);
    return _.every(c1, (v, i) => Math.abs(c1[i] - c2[i]) < 10e-6);
}
