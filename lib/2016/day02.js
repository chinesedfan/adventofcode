'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let coordinate = {
        x: 1,
        y: 1
    };
    const numbers = _.map(data.split('\n'), (line) => {
        _.each(line, (cmd) => {
            updateCoordinate(coordinate, cmd);
        });
        return coordinate.y * 3 + coordinate.x + 1;
    });
    console.log(numbers.join(''));
};

function updateCoordinate(coordinate, cmd) {
    switch (cmd) {
    case 'U':
        coordinate.y && coordinate.y--; break;
    case 'D':
        coordinate.y < 2 && coordinate.y++; break;
    case 'L':
        coordinate.x && coordinate.x--; break;
    case 'R':
        coordinate.x < 2 && coordinate.x++; break;
    default:
        break;
    }
}
