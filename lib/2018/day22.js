'use strict';
const _ = require('lodash');
const EQ = {
    none: 0,
    torch: 1 << 0,
    gear: 1 << 1
};
const COST = 7;

module.exports = function(part, data) {
    const lines = data.split('\n');

    const depth = +lines[0].replace('depth: ', '');
    const xy = lines[1].replace('target: ', '').split(',');
    const target = {
        x: +xy[0],
        y: +xy[1]
    };

    const f = part == 1 ? f1 : f2;
    f(depth, target);
};

function f1(depth, target) {
    const grid = [];
    _.range(0, target.y + 1).forEach((y) => {
        grid.push([]);
        _.range(0, target.x + 1).forEach((x) => {
            grid[y][x] = getLevelAndType(depth, target, grid, x, y);
        });
    });

    console.log(_.sumBy(grid, (row) => _.sumBy(row, (o) => o.type)));
}

function f2(depth, target) {
    // bfs
    const grid = [];
    const cache = [[{x: 0, y: 0, eq: EQ.torch}]]; // t -> [possible item[]]
    const visited = {}; // x#y#eq -> 1
    let t = 0;
    while (1) {
        if (!cache[t]) {
            t++;
            continue;
        }

        const hasReached = cache[t].some(({x, y, eq}) => {
            const key = [x, y, eq].join('#');
            if (visited[key]) return false;

            visited[key] = 1;
            if (x == target.x && y == target.y) {
                if (eq !== EQ.torch) {
                    cache[t + COST] = cache[t + COST] || [];
                    cache[t + COST].push({x, y, eq: EQ.torch});
                    return false;
                }
                return true;
            } else {
                [{x: x - 1, y}, {x: x + 1, y}, {x, y: y - 1}, {x, y: y + 1}].forEach((item) => {
                    checkAndPush(depth, target, grid, cache, eq, item.x, item.y, t + 1);
                });
                return false;
            }
        });
        if (hasReached) break;

        t++;
    }
    console.log(t);
}

function getLevelAndType(depth, target, grid, x, y) {
    if (grid[y][x]) return grid[y][x];

    let index;
    if (y == 0 && x == 0 || y == target.y && x == target.x) {
        index = 0;
    } else if (x == 0) {
        index = y * 48271;
    } else if (y == 0) {
        index = x * 16807;
    } else {
        index = getLevelAndType(depth, target, grid, x - 1, y).level
            * getLevelAndType(depth, target, grid, x, y - 1).level;
    }

    const level = (index + depth) % 20183;
    return {
        level,
        type: level % 3
    };
}
function checkAndPush(depth, target, grid, cache, eq, x, y, t) {
    if (x < 0 || y < 0) return;

    grid[y] = grid[y] || [];
    grid[y][x] = getLevelAndType(depth, target, grid, x, y);

    switch (grid[y][x].type) {
    case 0: // rocky
        if (eq === EQ.none) {
            cache[t + COST] = cache[t + COST] || [];
            cache[t + COST].push({x, y, eq: EQ.gear});
            cache[t + COST].push({x, y, eq: EQ.torch});
            return;
        }
        break;
    case 1: // wet
        if (eq === EQ.torch) {
            cache[t + COST] = cache[t + COST] || [];
            cache[t + COST].push({x, y, eq: EQ.none});
            cache[t + COST].push({x, y, eq: EQ.gear});
            return;
        }
        break;
    case 2: // narrow
        if (eq === EQ.gear) {
            cache[t + COST] = cache[t + COST] || [];
            cache[t + COST].push({x, y, eq: EQ.none});
            cache[t + COST].push({x, y, eq: EQ.torch});
            return;
        }
        break;
    }

    cache[t] = cache[t] || [];
    cache[t].push({x, y, eq});
}
