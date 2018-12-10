'use strict';
const _ = require('lodash');
const reg = /position=<\s*(\-?\d+),\s*(\-?\d+)> velocity=<\s*(\-?\d+),\s*(\-?\d+)>/;

module.exports = function(part, data) {
    const xs = [];
    const ys = [];
    const points = data.split('\n').map((line) => {
        const [match, x, y, vx, vy] = line.match(reg);
        xs.push(x);
        ys.push(y);
        return {
            x: +x,
            y: +y,
            vx: +vx,
            vy: +vy
        };
    });

    const xmin = _.min(xs);
    const xmax = _.max(xs);
    const ymin = _.min(ys);
    const ymax = _.max(ys);

    let t = 3;
    while (t--) {
        const map = {};
        points.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            map[`${p.x}#${p.y}`] = 1;
        });

        console.log('\n');
        print(map, xmin, xmax, ymin, ymax);
    }
};

function print(map, xmin, xmax, ymin, ymax) {
    const output = [];
    for (let y = ymin; y <= ymax; y++) {
        output.push([]);
        for (let x = xmin; x <= xmax; x++) {
            output[y - ymin].push(map[`${x}#${y}`] ? '#' : '.');
        }
    }
    console.log(output.map((dots) => dots.join('')).join('\n'));
}
