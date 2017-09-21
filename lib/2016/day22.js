'use strict';
const _ = require('lodash');
const reg = /^\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+\d+%$/;

module.exports = function(part, data) {
    const nodes = _(data.split('\n')).map((line) => {
        const matches = reg.exec(line);
        return matches && {
            x: parseInt(matches[1]),
            y: parseInt(matches[2]),
            size: parseInt(matches[3]),
            used: parseInt(matches[4]),
            avil: parseInt(matches[5])
        };
    }).filter();

    if (part == 1) {
        const pairs = nodes.reduce((count, a) => {
            return count + nodes.filter((b) => a.used && b.avil >= a.used).value().length;
        }, 0);
        console.log(pairs);
    } else {
        /**
         * HINT:
         * 1. there exists only 1 empty node, and each viable pair contains it
         * 2. some high capacity nodes are impossiable to move data in/out, and they are far away
         */
        const grid = nodes.groupBy('y').values().value(); // trust the input is sorted
        const charsGrid = getCharsGrid(grid);

        // bfs, the goal to the empty, modifies grid
        const q = [grid[0][grid[0].length - 1]];
        q[0].distance = 0;
        q[0].visited = 1;
        const target = nodes.filter((n) => !n.used).value()[0];
        while (q.length) {
            const n = q.shift();
            if (n.x == target.x && n.y == target.y) {
                // add distances of the goal to the start
                // for each round, 1 step for swaping the goal with the empty
                // and 4 steps to move the empty before the goal
                console.log(n.distance - 1 + ((grid[0].length - 1) - 1) * 5 + 1);
                break;
            }

            tryToAdd(q, grid, charsGrid, n.x - 1, n.y, n.distance + 1);
            tryToAdd(q, grid, charsGrid, n.x + 1, n.y, n.distance + 1);
            tryToAdd(q, grid, charsGrid, n.x, n.y - 1, n.distance + 1);
            tryToAdd(q, grid, charsGrid, n.x, n.y + 1, n.distance + 1);
        }
    }
};

function getCharsGrid(grid) {
    return _.map(grid, (row) => {
        return _.map(row, (item) => {
            if (!item.used) {
                return '_';
            } else if (item.size < 100) { // FIXME: cheat here
                return '.';
            } else {
                return '#';
            }
        }).join('');
    });
}
function tryToAdd(q, grid, charsGrid, x, y, d) {
    if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
            && !grid[y][x].visited && charsGrid[y][x] != '#') {
        grid[y][x].distance = d;
        grid[y][x].visited = 1; // added means visited
        q.push(grid[y][x]);
    }
}
