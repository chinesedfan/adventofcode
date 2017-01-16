'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const reg = /([RL])(\d+)/;

    let dir = '';
    let coordinate = {
        x: 0,
        y: 0
    };
    let visited = {
        '0-0': 1
    };

    _.each(data.split(','), (token) => {
        const matches = reg.exec(token);
        if (!matches) return;

        dir = updateDirection(dir, matches[1]);
        updateCoordinate(coordinate, dir, parseInt(matches[2]), visited);
    });

    if (part == 1) {
        console.log(Math.abs(coordinate.x) + Math.abs(coordinate.y));
    } else {
        console.log(visited.twiceLocationDistance);
    }
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

function updateCoordinate(coordinate, dir, distance, visited) {
    switch (dir) {
    case 'e':
        for (let i = 1; i <= distance; i++) {
            updateVisited(visited, coordinate.x + i, coordinate.y);
        }
        coordinate.x += distance; break;
    case 'w':
        for (let i = 1; i <= distance; i++) {
            updateVisited(visited, coordinate.x - i, coordinate.y);
        }
        coordinate.x -= distance; break;
    case 'n':
        for (let i = 1; i <= distance; i++) {
            updateVisited(visited, coordinate.x, coordinate.y + i);
        }
        coordinate.y += distance; break;
    case 's':
        for (let i = 1; i <= distance; i++) {
            updateVisited(visited, coordinate.x, coordinate.y - i);
        }
        coordinate.y -= distance; break;
    default:
        throw new Error('unknow direction:', dir);
    }
}

function updateVisited(visited, x, y) {
    const key = `${x}-${y}`;
    if (typeof visited.twiceLocationDistance === 'undefined' && visited[key]) {
        visited.twiceLocationDistance = Math.abs(x) + Math.abs(y);
    }
    visited[key] = 1;
}
