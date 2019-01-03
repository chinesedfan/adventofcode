'use strict';
const _ = require('lodash');
const reg = /(x|y)=(\d+), (?:x|y)=(\d+)\.\.(\d+)/;

module.exports = function(part, data) {
    const xs = {}; // x -> [{beg, end}]
    const ys = {}; // y -> [{beg, end}]
    let ymin = Infinity;
    let ymax = -Infinity;
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
        } else {
            if (k < ymin) ymin = k;
            if (k > ymax) ymax = k;
        }
    });

    const visited = {};
    drop(500, ymin - 1, xs, ys, visited, ymax, 0);
    console.log(_.keys(visited).length);
};

function drop(x, y, xs, ys, visited, ymax, level) {
    log(level, 'spring:', x, y);
    // down
    while (1) {
        if (visited[key(x, y + 1)]) return;
        if (isClay(x, y + 1, xs, ys)) break;

        visited[key(x, y + 1)] = 1;
        y++;
        if (y === ymax) return;
    }
    log(level, 'down to:', x, y);

    const sx = x; // spring x
    while (1) {
        let willDrop = false;
        // left
        x = sx;
        while (1) {
            if (visited[key(x - 1, y)]) break;
            if (isClay(x - 1, y, xs, ys)) break;

            visited[key(x - 1, y)] = 1;
            x--;
            if (!canHold(x, y, xs, ys, visited)) {
                willDrop = true;
                drop(x, y, xs, ys, visited, ymax, level + 1);
                break;
            }
        }
        log(level, 'left to:', x, y);

        // right
        x = sx;
        while (1) {
            if (visited[key(x + 1, y)]) break;
            if (isClay(x + 1, y, xs, ys)) break;

            visited[key(x + 1, y)] = 1;
            x++;
            if (!canHold(x, y, xs, ys, visited)) {
                willDrop = true;
                drop(x, y, xs, ys, visited, ymax, level + 1);
                break;
            }
        }
        log(level, 'right to:', x, y);

        if (willDrop) break;
        y--;
    }
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
    return isClay(x, y + 1, xs, ys) || visited[key(x, y + 1)];
}
