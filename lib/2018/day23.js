'use strict';
const _ = require('lodash');
const reg = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/;

module.exports = function(part, data) {
    const points = data.split('\n').map((line) => {
        const [match, x, y, z, r] = reg.exec(line);
        return {
            x: +x,
            y: +y,
            z: +z,
            r: +r
        };
    });

    let result;
    if (part === 1) {
        const max = _.maxBy(points, (o) => o.r);
        result = _.filter(points, (p) => inRange(max, p)).length;
    } else {
        // find the max clique
        let max = [];
        const q = [{
            i: 0, // checked `index < i` points
            points: []
        }];
        while (q.length) {
            const state = q.shift();
            const canAdd = _.every(state.points, (p) => hasIntersection(p, points[state.i]));
            if (canAdd) {
                const added = {
                    i: state.i + 1,
                    points: state.points.concat([points[state.i]])
                };
                if (added.points.length > max.length) max = added.points;
                if (state.i + 1 < points.length) q.push(added);
            } else if (state.points.length + points.length - state.i - 1 > max.length) {
                if (state.i + 1 < points.length) q.push({
                    i: state.i + 1,
                    points: state.points
                });
            } else {
                // prune if not possible to form a bigger clique
            }
        }
        console.log('max clique size:', max.length);

        const p1 = max[0];
        const scopes = ['x', 'y', 'z'].map((name) => {
            const limits = max.slice(1).map((p2) => findScope(p1, p2, name));
            return {
                min: _.maxBy(limits, 'min').min,
                max: _.minBy(limits, 'max').max
            };
        });
        console.log('scopes:', scopes);
        for (let x = scopes[0].min; x <= scopes[0].max; x++) {
            for (let y = scopes[1].min; y <= scopes[1].max; y++) {
                for (let z = scopes[2].min; z <= scopes[2].max; z++) {
                    if (_.every(max, (p) => inRange(p, {x, y, z}))) {
                        result = x + y + z;
                        // break;
                        x = Infinity;
                        y = Infinity;
                        z = Infinity;
                    }
                }
            }
        }
    }

    console.log(result);
};

function inRange(src, dst) {
    return src.r >= Math.abs(src.x - dst.x) + Math.abs(src.y - dst.y) + Math.abs(src.z - dst.z);
}
function hasIntersection(p1, p2) {
    const r = p1.r + p2.r;
    return r >= Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) + Math.abs(p1.z - p2.z);
}
function findScope(p1, p2, name) {
    return {
        min: Math.min(p1[name] - p1.r, p2[name] - p2.r),
        max: Math.min(p1[name] + p1.r, p2[name] + p2.r)
    };
}
