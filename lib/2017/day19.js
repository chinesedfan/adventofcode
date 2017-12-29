'use strict';
const _ = require('lodash');

const DIR = {
    UP: {x: 0, y: 1},
    DOWN: {x: 0, y: -1},
    LEFT: {x: -1, y: 0},
    RIGHT: {x: 1, y: 0}
};

module.exports = function(part, data) {
    const lines = data.split('\n');
    const row = 0;
    const col = _.findIndex(lines[row], (c) => c == '|');

    const p = {x: col, y: row};
    const chs = [];
    let dir = DIR.UP;
    let step = 1;

    while (1) {
        p.x += dir.x;
        p.y += dir.y;
        if (!isValidChar(lines, p.x, p.y)) break;
        step++;

        const c = lines[p.y][p.x];
        if (/[A-Z]/.test(c)) {
            chs.push(c);
        } else if (c == '|') {
            // keep moving
        } else if (c == '-') {
            // keep moving
        } else if (c == '+') {
            dir = getNextDirection(p, dir, lines);
        } else {
            break;
        }
    }

    if (part == 1) {
        console.log(chs.join(''));
    } else {
        console.log(step);
    }
};

function getNextDirection(p, dir, lines) {
    if (dir == DIR.LEFT || dir == DIR.RIGHT) {
        return isValidChar(lines, p.x + DIR.UP.x, p.y + DIR.UP.y) ? DIR.UP : DIR.DOWN;
    } else {
        return isValidChar(lines, p.x + DIR.LEFT.x, p.y + DIR.LEFT.y) ? DIR.LEFT : DIR.RIGHT;
    }
}
function isValidChar(lines, x, y) {
    return y >= 0 && y < lines.length && x >= 0 && x < lines[y].length && lines[y][x] != ' ';
}
