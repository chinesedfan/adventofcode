'use strict';
const _ = require('lodash');
const reg = /(x|y)=(\d+), (?:x|y)=(\d+)\.\.(\d+)/;

module.exports = function(part, data) {
    const xs = {}; // x -> [{beg, end}]
    const ys = {}; // y -> [{beg, end}]
    let ymin = Infinity;
    let ymax = -Infinity;
    let xmin = Infinity;
    let xmax = -Infinity;
    data.split('\n').forEach((line) => {
        let [match, axis, k, beg, end] = reg.exec(line);
        k = +k;
        beg = +beg;
        end = +end;

        const list = axis === 'x' ? xs : ys;
        list[k] = list[k] || [];
        list[k].push({beg, end});

        if (axis === 'x') {
            if (beg < ymin) ymin = beg;
            if (end > ymax) ymax = end;
            if (k < xmin) xmin = k;
            if (k > xmax) xmax = k;
        } else {
            if (beg < xmin) xmin = beg;
            if (end > xmax) xmax = end;
            if (k < ymin) ymin = k;
            if (k > ymax) ymax = k;
        }
    });

    const visited = {}; // x#y -> 1
    const springs = {}; // x#y -> 1
    drop(springs, 500, ymin - 1, xs, ys, visited, ymax, 0);
    draw(xmin, xmax, ymin, ymax, xs, ys, visited);
    console.log(_.keys(visited).length);

    if (part == 2) {
        _.forEach(visited, (v1, str) => {
            if (v1 !== 'v') return;

            const [x, y] = str.split('#').map((k) => +k);
            let i;
            for (i = x; ; i--) {
                const v2 = visited[key(i, y)];
                if (!v2) break;
                if (v2 !== 'v') visited[key(i, y)] = 'r';
            }
            for (i = x; ; i++) {
                const v2 = visited[key(i, y)];
                if (!v2) break;
                if (v2 !== 'v') visited[key(i, y)] = 'r';
            }
        });
        draw(xmin, xmax, ymin, ymax, xs, ys, visited);
        console.log(_.values(visited)
            .filter((v) => v !== 'v' && v !== 'r')
            .length);
    }
};

function drop(springs, x, y, xs, ys, visited, ymax, level) {
    if (springs[key(x, y)]) return;
    springs[key(x, y)] = 1;

    log(level, 'spring:', x, y);
    // down
    while (1) {
        if (isClay(x, y + 1, xs, ys)) break;

        const old = visited[key(x, y + 1)];
        visited[key(x, y + 1)] = 'v';
        y++;
        if (y === ymax) return;
        if (old) break;
    }
    log(level, 'down to:', x, y);

    const sx = x; // spring x
    while (1) {
        visited[key(x, y)] = '^';
        let willDrop = false;
        // left
        x = sx;
        while (1) {
            if (isClay(x - 1, y, xs, ys)) break;

            visited[key(x - 1, y)] = '<';
            x--;
            if (!canHold(x, y, xs, ys, visited)) {
                willDrop = true;
                visited[key(x, y)] = 'v';
                drop(springs, x, y, xs, ys, visited, ymax, level + 1);
                break;
            }
        }
        log(level, 'left to:', x, y);

        // right
        x = sx;
        while (1) {
            if (isClay(x + 1, y, xs, ys)) break;

            visited[key(x + 1, y)] = '>';
            x++;
            if (!canHold(x, y, xs, ys, visited)) {
                willDrop = true;
                visited[key(x, y)] = 'v';
                drop(springs, x, y, xs, ys, visited, ymax, level + 1);
                break;
            }
        }
        log(level, 'right to:', x, y);

        if (willDrop) break;
        x = sx;
        y--;
        if (isClay(x, y, xs, ys)) break;
    }
}
function draw(xmin, xmax, ymin, ymax, xs, ys, visited) {
    const grid = [];
    for (let y = ymin; y <= ymax; y++) {
        const row = [];
        for (let x = xmin; x <= xmax; x++) {
            let ch = ' ';
            if (isClay(x, y, xs, ys)) {
                ch = '#';
            } else if (visited[key(x, y)]) {
                ch = visited[key(x, y)];
            }
            row.push(ch);
        }
        grid.push(row);
    }
    console.log(grid.map((r) => r.join('')).join('\n'));
}

function log(level, ...args) {
    const indentation = Array(level * 4).fill(' ').join('');
    console.log(indentation, ...args);
}
function key(...args) {
    return args.join('#');
}
function isClay(x, y, xs, ys) {
    return xs[x] && _.some(xs[x], ({beg, end}) => y >= beg && y <= end)
        || ys[y] && _.some(ys[y], ({beg, end}) => x >= beg && x <= end);
}
function canHold(x, y, xs, ys, visited) {
    const v = visited[key(x, y + 1)];
    return isClay(x, y + 1, xs, ys) || v && v != 'v';
}
