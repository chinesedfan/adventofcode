'use strict';
const _ = require('lodash');
const EQ = {
    torch: 1 << 0,
    gear: 1 << 1
};

module.exports = function(part, data) {
    const lines = data.split('\n');

    const depth = +lines[0].replace('depth: ', '');
    const xy = lines[1].replace('target: ', '').split(',');
    const target = {
        x: +xy[0],
        y: +xy[1]
    };

    const limit = {
        x: target.x + 5,
        y: target.x + 5
    };
    const grid = [];
    _.range(0, limit.y + 1).forEach((y) => {
        grid.push([]);
        _.range(0, limit.x + 1).forEach((x) => {
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

    if (part == 1) {
        console.log(_.sumBy(grid.slice(0, target.y + 1),
            (row) => _.sumBy(row.slice(0, target.x + 1), (o) => o.type)));
    } else {
        // bfs
        const q = [{x: 0, y: 0, time: 0, eq: EQ.torch}];
        const visited = {}; // x#y -> 1
        const ts = [];
        while (q.length) {
            let {x, y, time, eq} = q.shift();
            if (visited[`${x}#${y}`]) continue;
            visited[`${x}#${y}`] = 1;
            if (x == target.x && y == target.y) {
                if (!(eq | EQ.torch)) time += 7;
                ts.push(time);
            }

            checkAndPush(grid, q, visited, limit, eq, time, x, y + 1);
            checkAndPush(grid, q, visited, limit, eq, time, x, y - 1);
            checkAndPush(grid, q, visited, limit, eq, time, x + 1, y);
            checkAndPush(grid, q, visited, limit, eq, time, x - 1, y);
        }
        console.log(_.min(ts));
    }
};

function checkAndPush(grid, q, visited, limit, eq, time, x, y) {
    if (x < 0 || x > limit.x || y < 0 || y > limit.y
        || visited[`${x}#${y}`]) return;

    let cost = 0;
    switch (grid[y][x].type) {
    case 0: // rocky
        if (!eq) cost += 7;
        eq = EQ.gear | EQ.torch;
        break;
    case 1: // wet
        if (eq === EQ.torch) cost += 7;
        eq &= ~EQ.torch;
        break;
    case 2: // narrow
        if (eq === EQ.gear) cost += 7;
        eq &= ~EQ.gear;
        break;
    }

    q.push({
        x,
        y,
        time: time + cost + 1,
        eq
    });
}
