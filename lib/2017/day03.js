'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const n = parseInt(data);
    console.log(part == 1 ? getDistance(n) : getFirstLarger(n));
};

function getDistance(n) {
    // layer 0 has 1 number
    // layer i has 8 * i number
    let layer = 0;
    let count = 1;
    while (count < n) {
        layer++;
        count += 8 * layer;
    }
    if (layer == 0) return 0;

    // centers of each edge
    const centers = [count - layer, count - 3 * layer, count - 5 * layer, count - 7 * layer];
    const offset = _(centers)
            .map((c) => Math.abs(n - c))
            .min();

    return layer + offset;
}

function getFirstLarger(n) {
    const map = {}; // {x,y => val}
    const p = {x: 0, y: 0, val: 1};
    const layer = {
        i: 0,
        cur: 1 // start from 1
    };

    const DIR = {
        UP: {x: 0, y: 1},
        DOWN: {x: 0, y: -1},
        LEFT: {x: -1, y: 0},
        RIGHT: {x: 1, y: 0}
    };
    let dir = DIR.RIGHT;

    while (p.val < n) {
        // save in map
        map[getMapKey(p.x, p.y)] = p.val;
        // change direction if needs
        // for layer i, the edge size is 2 * i + 1
        if (layer.cur == 1 && layer.i != 0) {
            dir = DIR.UP;
        } else if (layer.cur == layer.i * 2) {
            dir = DIR.LEFT;
        } else if (layer.cur == layer.i * 4) {
            dir = DIR.DOWN;
        } else if (layer.cur == layer.i * 6) {
            dir = DIR.RIGHT;
        }
        // prepare next
        p.x += dir.x;
        p.y += dir.y;
        p.val = getNeighboursSum(map, p.x, p.y);
        // update layer info
        if (layer.i == 0 || layer.cur == layer.i * 8) {
            layer.i++;
            layer.cur = 1;
        } else {
            layer.cur++;
        }
    }
    return p.val;
}
function getNeighboursSum(map, x, y) {
    const nbs = [];
    addNeighbour(nbs, map, x - 1, y + 1);
    addNeighbour(nbs, map, x, y + 1);
    addNeighbour(nbs, map, x + 1, y + 1);
    addNeighbour(nbs, map, x - 1, y);
    addNeighbour(nbs, map, x + 1, y);
    addNeighbour(nbs, map, x - 1, y - 1);
    addNeighbour(nbs, map, x, y - 1);
    addNeighbour(nbs, map, x + 1, y - 1);
    return _.sum(nbs);
}
function addNeighbour(nbs, map, x, y) {
    const k = getMapKey(x, y);
    if (k in map) nbs.push(map[k]);
}
function getMapKey(x, y) {
    return `${x}#${y}`;
}
