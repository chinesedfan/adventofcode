'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const grid = part == 1 ? [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ] : [
        ['', '', '1', '', ''],
        ['', '2', '3', '4', ''],
        ['5', '6', '7', '8', '9'],
        ['', 'A', 'B', 'C', ''],
        ['', '', 'D', '', ''],
    ];
    let coordinate = part == 1 ? {
        x: 1,
        y: 1
    } : {
        x: 0,
        y: 2
    };

    const numbers = _.map(data.split('\n'), (line) => {
        _.each(line, (cmd) => {
            updateCoordinate(coordinate, cmd, grid);
        });
        return grid[coordinate.y][coordinate.x];
    });
    console.log(numbers.join(''));
};

function updateCoordinate(coordinate, cmd, grid) {
    switch (cmd) {
    case 'U':
        coordinate.y && grid[coordinate.y - 1][coordinate.x] && coordinate.y--; break;
    case 'D':
        coordinate.y < grid.length - 1 && grid[coordinate.y + 1][coordinate.x] && coordinate.y++; break;
    case 'L':
        coordinate.x && grid[coordinate.y][coordinate.x - 1] && coordinate.x--; break;
    case 'R':
        coordinate.x < grid[coordinate.y].length - 1 && grid[coordinate.y][coordinate.x + 1] && coordinate.x++; break;
    default:
        break;
    }
}
