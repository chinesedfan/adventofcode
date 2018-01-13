'use strict';
const _ = require('lodash');
const reg = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/;

module.exports = function(part, data) {
    const ps = _.map(data.split('\n'), (line, i) => {
        const matches = reg.exec(line);

        return {
            i,
            p: matches.slice(1, 4).map((str) => parseInt(str)),
            v: matches.slice(4, 7).map((str) => parseInt(str)),
            a: matches.slice(7, 10).map((str) => parseInt(str))
        };
    });

    const f = part == 1 ? f1 : f2;
    f(ps);
};

function f1(ps) {
    const sorted = _.sortBy(ps, [
        (item) => _.reduce(item.a, (sum, x) => sum + Math.abs(x), 0),
        (item) => _.reduce(item.v, (sum, x) => sum + Math.abs(x), 0),
        (item) => _.reduce(item.p, (sum, x) => sum + Math.abs(x), 0)
    ]);

    console.log(sorted[0].i);
}

function getCur(particle, t) {
    const {p, v, a} = particle;
    // important! even at tick 0, the velocity is updated with acceleration first
    return _.map(p, (x, i) => a[i] * (t + 1) * t / 2 + v[i] * t + x);
}

function f2(ps) {
    const times = [];
    _.each(ps, (p1, i) => {
        _.each(ps, (p2, j) => {
            if (i >= j) return;

            const t = getCollideTime(p1, p2);
            if (t < 0) return;

            times.push({i, j, t});
        });
    });

    times.sort((a, b) => b.t - a.t);
    _.each(times, (item) => {
        const p1 = ps[item.i];
        const p2 = ps[item.j];
        if ((p1.collided && p1.t < item.t) || (p2.collided && p2.t < item.t)) return;

        p1.collided = true;
        p1.t = item.t;
        p2.collided = true;
        p2.t = item.t;
    });

    const left = _.filter(ps, (p) => !p.collided);
    console.log(left.length);
}

function getCollideTime(p1, p2) {
    const a = (p1.a[0] - p2.a[0]) / 2;
    const b = p1.v[0] - p2.v[0] + a;
    const c = p1.p[0] - p2.p[0];

    // solve the equation
    if (!a) {
        const t = b ? -c / b : 0;
        return isSame(p1, p2, t) ? t : -1;
    }

    const delta = b * b - 4 * a * c;
    if (delta < 0) return -1;

    const t1 = (-b + Math.sqrt(delta)) / (2 * a);
    if (isSame(p1, p2, t1)) return t1;
    const t2 = (-b - Math.sqrt(delta)) / (2 * a);
    if (isSame(p1, p2, t2)) return t2;

    return -1;
}
function isSame(p1, p2, t) {
    if (t < 0) return false;
    if (!_.isInteger(t)) return false;

    const c1 = getCur(p1, t);
    const c2 = getCur(p2, t);
    return _.every(c1, (v, i) => Math.abs(c1[i] - c2[i]) < 10e-6);
}
