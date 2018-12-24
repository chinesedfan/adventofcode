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
    }

    console.log(result);
};

function inRange(src, dst) {
    return src.r >= Math.abs(src.x - dst.x) + Math.abs(src.y - dst.y) + Math.abs(src.z - dst.z);
}
