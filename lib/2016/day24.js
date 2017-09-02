'use strict';

const _ = require('lodash');
const allArrangement = require('../permutation');

module.exports = function(part, data) {
    const lines = data.split('\n');
    const map = {}; // n -> (n, i, j)
    _.each(lines, (l, i) => {
        _.each(l, (ch, j) => {
            if (ch >= '0' && ch <= '9') {
                map[ch] = {ch, i, j};
            }
        });
    });
    const dmap = _.mapValues(map, (item) => bfs(lines, item)); // n -> {x: distance}

    const keys = _.keys(map);
    _.remove(keys, (k) => k == 0);

    let min = Infinity;
    _.each(allArrangement(keys), (p) => {
        if (part == 2) {
            p = p.concat(['0']);
        }
        const sum = _.reduce(p, (memo, k, i) => {
            const prev = i ? p[i - 1] : '0';
            const d = dmap[prev][k];
            if (_.isUndefined(d)) return Infinity;
            return memo + d;
        }, 0);
        if (sum < min) min = sum;
    });
    console.log(min);
};

function bfs(lines, item) {
    const ds = {}; // n -> distance
    const grid = _.map(lines, (l) => l.split(''));

    const q = [item];
    grid[item.i][item.j] = '#'; // visited, mark as blocked
    let distance = 0;
    let count = q.length;
    while (q.length) {
        const node = q.shift();

        tryToPush(grid, node.i - 1, node.j, q, ds, distance);
        tryToPush(grid, node.i + 1, node.j, q, ds, distance);
        tryToPush(grid, node.i, node.j - 1, q, ds, distance);
        tryToPush(grid, node.i, node.j + 1, q, ds, distance);

        if (--count == 0) {
            distance++;
            count = q.length;
        }
    }
    return ds;
}
function tryToPush(grid, i, j, q, ds, distance) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return;

    const ch = grid[i][j];
    if (ch == '#') return;

    q.push({i, j});
    grid[i][j] = '#';
    if (ch >= '0' && ch <= '9') {
        ds[ch] = distance + 1;
    }
}

