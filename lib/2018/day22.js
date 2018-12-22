'use strict';
const _ = require('lodash');
const EQ = {
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

    const offset = COST * 12; // try to determine by last best
    const limit = {
        x: target.x + offset,
        y: target.y + offset
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
        const q = [{x: 0, y: 0, time: 0, sw: 0, eq: EQ.torch}];
        const visited = {}; // x#y -> 1
        let min = Infinity;
        while (q.length) {
            const node = q.shift();
            let {x, y, time, sw, eq} = node;
            if (min <= time || visited[`${x}#${y}`] <= time) continue;
            visited[`${x}#${y}`] = time;
            if (x == target.x && y == target.y) {
                if (!(eq & EQ.torch)) {
                    sw++;
                    time += COST;
                }
                if (time < min) min = time;
                console.log(sw, time);
                continue;
            }

            checkAndPush(grid, q, visited, limit, node, x, y + 1);
            checkAndPush(grid, q, visited, limit, node, x, y - 1);
            checkAndPush(grid, q, visited, limit, node, x + 1, y);
            checkAndPush(grid, q, visited, limit, node, x - 1, y);
        }
        console.log(min);
    }
};

function checkAndPush(grid, q, visited, limit, prev, x, y) {
    if (x < 0 || x > limit.x || y < 0 || y > limit.y) return;

    let {eq, sw, time} = prev;
    time++;
    switch (grid[y][x].type) {
    case 0: // rocky
        if (!eq) {
            sw++;
            time += COST;
            eq = EQ.gear | EQ.torch;
        }
        break;
    case 1: // wet
        if (eq === EQ.torch) {
            sw++;
            time += COST;
        }
        eq &= ~EQ.torch;
        break;
    case 2: // narrow
        if (eq === EQ.gear) {
            sw++;
            time += COST;
        }
        eq &= ~EQ.gear;
        break;
    }
    if (visited[`${x}#${y}`] <= time) return;

    const node = {
        x,
        y,
        time,
        sw,
        eq
    };
    q.push(node);
    // just for easy debugging
    node.prev = prev;
}
