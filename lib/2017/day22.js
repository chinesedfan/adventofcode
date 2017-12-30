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

    if (part == 1) {
        console.log(infection);
    }
};

function getCell(grid, p) {
    const k = `${p.x}#${p.y}`;
    if (!grid[k]) grid[k] = '.';
    return grid[k];
}
