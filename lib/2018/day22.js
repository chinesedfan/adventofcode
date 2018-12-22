'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');

    const depth = +lines[0].replace('depth: ', '');
    const xy = lines[1].replace('target: ', '').split(',');
    const target = {
        x: +xy[0],
        y: +xy[1]
    };

    const grid = [];
    _.range(0, target.y + 1).forEach((y) => {
        grid.push([]);
        _.range(0, target.x + 1).forEach((x) => {
            let index;
            if (y == 0 && x == 0 || y == target.y && x == target.x) {
                index = 0;
            } else if (x == 0) {
                index = y * 48271;
            } else if (y == 0) {
                index = x * 16807;
            } else {
                index = grid[y - 1][x].level * grid[y][x - 1].level;
            }

            const level = (index + depth) % 20183;
            grid[y][x] = {
                level,
                type: level % 3
            };
        });
    });

    console.log(_.sumBy(grid, (row) => _.sumBy(row, (o) => o.type)));
};
