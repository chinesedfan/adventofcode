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

        const centers = scopes.map((s) => ({
            c: Math.floor((s.min + s.max) / 2),
            r: Math.ceil((s.max - s.min) / 2)
        }));
        // octotree searching
        let cube = {
            x: centers[0].c,
            y: centers[1].c,
            z: centers[2].c,
            r: Math.max.apply(Math, centers.map((o) => o.r))
        };
        console.log('convert to cube with center:', cube);
        while (cube.r > 1) {
            cube = _.maxBy(
                getSubCubes(cube),
                // (c) => points.map((p) => cubeInRange(p, c)).filter((b) => b).length
                (c) => {
                    const n = max.map((p) => cubeInRange(p, c)).filter((b) => b).length;
                    console.log(n);
                    return n;
                }
            );
            console.log(cube, points.map((p) => cubeInRange(p, cube)).filter((b) => b).length);
        }

        cube = _.maxBy(
            getPointsOfUnitCube(cube),
            (p1) => {
                const n = points.map((p2) => inRange(p2, p1)).filter((b) => b).length;
                console.log(n);
                return n;
            }
        );
        console.log('final point:', cube);
        result = cube.x + cube.y + cube.z;
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

/**
 * @param {Point} p - contains x, y, z, r
 * @param {Cube} cube - also contains x, y, z, r, which mean the center and the radius
 * @return {boolean} whether the cube has intersection with `p`
 */
function cubeInRange(p, cube) {
    const {x, y, z, r} = cube;
    return p.r >= getDelta(p.x, x - r, x + r) + getDelta(p.y, y - r, y + r)
        + getDelta(p.z, z - r, z + r);
}
function getDelta(x, xmin, xmax) {
    if (x < xmin) {
        return xmin - x;
    } else if (x > xmax) {
        return x - xmax;
    } else {
        return 0;
    }
}

/**
 * @return {Cube} eight sub-cubes
 */
function getSubCubes(cube) {
    const {x, y, z} = cube;
    const r = Math.ceil(cube.r / 2);
    // sorted by nearest to farest, based on (0, 0, 0)
    return _.sortBy([
        {x: x - r, y: y - r, z: z - r, r},
        {x: x - r, y: y + r, z: z - r, r},
        {x: x + r, y: y - r, z: z - r, r},
        {x: x + r, y: y + r, z: z - r, r},
        {x: x - r, y: y - r, z: z + r, r},
        {x: x - r, y: y + r, z: z + r, r},
        {x: x + r, y: y - r, z: z + r, r},
        {x: x + r, y: y + r, z: z + r, r}
    ], (c) => c.x + c.y + c.z);
}

function getPointsOfUnitCube(cube) {
    const {x, y, z} = cube;
    const list = [];
    [-1, 0, 1].forEach((dx) => {
        [-1, 0, 1].forEach((dy) => {
            [-1, 0, 1].forEach((dz) => {
                list.push({
                    x: x + dx,
                    y: y + dy,
                    z: z + dz
                });
            });
        });
    });
    return list;
}
