'use strict';
const _ = require('lodash');

const DIR = [
    {x: 0, y: -1}, // down
    {x: -1, y: 0}, // left
    {x: 0, y: 1},  // up
    {x: 1, y: 0}   // right
];

module.exports = function(part, data) {
    const lines = data.split('\n');
    const yoffset = (lines.length - 1) / 2;
    const xoffset = (lines[0].length - 1) / 2;

    const grid = {};
    _.each(lines, (line, y) => {
        _.each(line.split(''), (c, x) => {
            grid[`${x - xoffset}#${yoffset - y}`] = c;
        });
    });

    const p = {x: 0, y: 0};
    let dirIndex = 2; // up

    const f = part == 1 ? f1 : f2;
    const infection = f(grid, p, dirIndex);
    console.log(infection);
};
function f1(grid, p, dirIndex) {
    let bursts = 10000;
    let infection = 0;
    while (bursts--) {
        const c = getCell(grid, p);
        // infect/clean and turn
        if (c == '#') {
            grid[`${p.x}#${p.y}`] = '.';
            dirIndex++;
            if (dirIndex >= DIR.length) dirIndex = 0;
        } else {
            grid[`${p.x}#${p.y}`] = '#';
            infection++;

            dirIndex--;
            if (dirIndex < 0) dirIndex = DIR.length - 1;
        }
        // move
        p.x += DIR[dirIndex].x;
        p.y += DIR[dirIndex].y;
    }

    return infection;
}
function f2(grid, p, dirIndex) {
    let bursts = 10000000;
    let infection = 0;
    while (bursts--) {
        const c = getCell(grid, p);
        // infect/clean and turn
        if (c == '.') {
            grid[`${p.x}#${p.y}`] = 'W';
            dirIndex--;
            if (dirIndex < 0) dirIndex = DIR.length - 1;
        } else if (c == 'W') {
            grid[`${p.x}#${p.y}`] = '#';
            infection++;
        } else if (c == '#') {
            grid[`${p.x}#${p.y}`] = 'F';
            dirIndex++;
            if (dirIndex >= DIR.length) dirIndex = 0;
        } else if (c == 'F') {
            grid[`${p.x}#${p.y}`] = '.';
            if (dirIndex < 2) {
                dirIndex += 2;
            } else {
                dirIndex -= 2;
            }
        }
        // move
        p.x += DIR[dirIndex].x;
        p.y += DIR[dirIndex].y;
    }

    return infection;
}

function getCell(grid, p) {
    const k = `${p.x}#${p.y}`;
    if (!grid[k]) grid[k] = '.';
    return grid[k];
}
