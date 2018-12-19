'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const cache = {};
    const list = [];
    let grid = data.split('\n').map((line) => line.split(''));

    let i = 0;
    while (1) {
        grid = grid.map((row, r) => {
            return row.map((ch, c) => {
                const ns = getNeighbors(grid, r, c);
                if (ch === '.') {
                    return ns.filter((x) => x === '|').length >= 3 ? '|' : ch;
                } else if (ch === '|') {
                    return ns.filter((x) => x === '#').length >= 3 ? '#' : ch;
                } else if (ch === '#') {
                    return ns.some((x) => x === '#') && ns.some((x) => x === '|') ? ch : '.';
                } else {
                    return ch;
                }
            });
        });

        i++;
        if (part === 1) {
            if (i == 10) break;
        } else {
            const hash = grid.map((row) => row.join('')).join('\n');
            if (cache[hash]) {
                const target = cache[hash].id;
                const rest = (1000000000 - i) % (i - target);
                grid = list[target + rest - 1];
                break;
            }

            list.push(grid);
            cache[hash] = {
                id: list.length,
                grid
            };
        }
    }

    let c1 = 0;
    let c2 = 0;
    grid.forEach((row, r) => {
        row.forEach((ch, c) => {
            if (ch === '|') c1++;
            if (ch === '#') c2++;
        });
    });
    console.log(c1 * c2);
};

function getNeighbors(grid, r, c) {
    const list = [];
    addNeighbor(list, grid, r - 1, c);
    addNeighbor(list, grid, r + 1, c);
    addNeighbor(list, grid, r, c - 1);
    addNeighbor(list, grid, r, c + 1);
    addNeighbor(list, grid, r - 1, c - 1);
    addNeighbor(list, grid, r + 1, c - 1);
    addNeighbor(list, grid, r - 1, c + 1);
    addNeighbor(list, grid, r + 1, c + 1);
    return list;
}
function addNeighbor(list, grid, r, c) {
    grid[r] && grid[r][c] && list.push(grid[r][c]);
}
