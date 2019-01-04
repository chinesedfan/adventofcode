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
        // FIXME: following is not a very clever solution
        //        searching with different distances to (0, 0, 0) seems better
        //        check https://github.com/sguest/advent-of-code/blob/master/2018/23/part2.js

        const scopes = ['x', 'y', 'z'].map((name) => {
            return {
                min: _.minBy(points, name)[name],
                max: _.maxBy(points, name)[name]
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
        let cubes = [cube];
        while (cubes[0].r > 1) {
            const sub = cubes.reduce((cs, c) => cs.concat(getSubCubes(c)), []);
            const ns = sub.map((c) => points.map((p) => cubeInRange(p, c)).filter((b) => b).length);
            const m = _.max(ns);
            cubes = sub.filter((c, i) => ns[i] === m);

            console.log(m, cubes.length);
        }

        console.log('length of possible unit cubes:', cubes.length);
        cubes = _.sortBy(
            cubes.reduce((cs, c) => cs.concat(getPointsOfUnitCube(c)), []),
            [
                (p1) => -points.map((p2) => inRange(p2, p1)).filter((b) => b).length,
                (p) => p.x + p.y + p.z
            ]
        );
        cube = cubes[0];
        console.log('final point:', cube);
        result = cube.x + cube.y + cube.z;
    }

    console.log(result);
};

function inRange(src, dst) {
    return src.r >= Math.abs(src.x - dst.x) + Math.abs(src.y - dst.y) + Math.abs(src.z - dst.z);
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
    return [
        {x: x - r, y: y - r, z: z - r, r},
        {x: x - r, y: y + r, z: z - r, r},
        {x: x + r, y: y - r, z: z - r, r},
        {x: x + r, y: y + r, z: z - r, r},
        {x: x - r, y: y - r, z: z + r, r},
        {x: x - r, y: y + r, z: z + r, r},
        {x: x + r, y: y - r, z: z + r, r},
        {x: x + r, y: y + r, z: z + r, r}
    ];
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
