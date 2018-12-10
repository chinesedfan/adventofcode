'use strict';
const _ = require('lodash');
const reg = /position=<\s*(\-?\d+),\s*(\-?\d+)> velocity=<\s*(\-?\d+),\s*(\-?\d+)>/;

module.exports = async function(part, data) {
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

    const scale = 2000;
    const speed = 100;
    const tmax = 1000;
    let t = 0;
    while (t++ < tmax) {
        const map = {};
        points.forEach((p) => {
            p.x += p.vx * speed;
            p.y += p.vy * speed;
            map[`${Math.ceil(p.x / scale)}#${Math.ceil(p.y / scale)}`] = 1;
        });

        console.log(`t=${t * speed}`);
        print(map, Math.ceil(xmin / scale), Math.ceil(xmax / scale),
            Math.ceil(ymin / scale), Math.ceil(ymax / scale));

        await sleep(50);
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

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
