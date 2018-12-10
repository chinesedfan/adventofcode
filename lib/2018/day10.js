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

    const view = 100;
    const round = 1000;
    let r = 0;
    let t = 0;
    let reachMin = false;
    while (r++ < round) {
        const [xmin, xmax, ymin, ymax] = getArea(xs, ys);
        const scale = Math.ceil((xmax - xmin) / view); // assume scaleX === scaleY
        if (scale == 1) {
            reachMin = true;
        } else if (reachMin) break;

        const speed = Math.ceil(scale / 1);
        t += speed;

        const map = {};
        xs.length = 0;
        ys.length = 0;
        points.forEach((p) => {
            p.x += p.vx * speed;
            p.y += p.vy * speed;
            map[`${Math.ceil(p.x / scale)}#${Math.ceil(p.y / scale)}`] = 1;
            xs.push(p.x);
            ys.push(p.y);
        });

        console.log(`t=${t} scale=${scale}`);
        print(map, Math.ceil(xmin / scale), Math.ceil(xmax / scale),
            Math.ceil(ymin / scale), Math.ceil(ymax / scale));

        await sleep(50);
    }
};

function getArea(xs, ys) {
    return [_.min(xs), _.max(xs), _.min(ys), _.max(ys)];
}

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
