'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const reg = /([RL])(\d+)/;

    let dir = '';
    let coordinate = {
        x: 0,
        y: 0
    };

    _.each(data.split(','), (token) => {
        const matches = reg.exec(token);
        if (!matches) return;

        dir = updateDirection(dir, matches[1]);
        updateCoordinate(coordinate, dir, parseInt(matches[2]));
    });
    console.log(Math.abs(coordinate.x) + Math.abs(coordinate.y));
};

function updateDirection(dir, cmd) {
    switch (dir) {
    case 'e':
        return cmd == 'L' ? 'n' : 's';
    case 's':
        return cmd == 'L' ? 'e' : 'w';
    case 'w':
        return cmd == 'L' ? 's' : 'n';
    case 'n':
    case '':
    default:
        return cmd == 'L' ? 'w' : 'e';
    }
}

function updateCoordinate(coordinate, dir, distance) {
    switch (dir) {
    case 'e':
        coordinate.x += distance; break;
    case 'w':
        coordinate.x -= distance; break;
    case 'n':
        coordinate.y += distance; break;
    case 's':
        coordinate.y -= distance; break;
    default:
        throw new Error('unknow direction:', dir);
    }
}
