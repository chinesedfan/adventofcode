'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const units = {}; // r#c -> {hp, power, name}
    const grid = data.split('\n').map((line, r) => {
        for (let c = 0; c < line.length; c++) {
            if (isUnit(line[c])) {
                units[key(r, c)] = {
                    r,
                    c,
                    name: line[c],
                    hp: 200,
                    power: 3
                };
            }
        }
        return line.split('');
    });

    let r = 0;
    while (1) {
        const result = round(grid, units);
        if (result) {
            if (result.full) r++;

            const sum = _(units)
                .values()
                .sumBy('hp');
            console.log(r, sum, r * sum);
            break;
        }

        r++;
        console.log('#', r);
        console.log(getGameState(grid, units));
    }
};

function isEnd(units) {
    const ne = _(units)
        .values()
        .filter((o) => o.name === 'E')
        .value()
        .length;
    const ng = _(units)
        .values()
        .filter((o) => o.name === 'G')
        .value()
        .length;
    return !ne || !ng;
}

function round(grid, units) {
    let result;
    _.sortBy(_.values(units), ['r', 'c'])
        .some(({r, c}, i, list) => {
            const u = units[key(r, c)];
            if (!u) return; // killed in previous turns

            if (attack(grid, r, c, units)) {
                // skip
            } else {
                move(grid, r, c, units);
                attack(grid, u.r, u.c, units);
            }

            if (isEnd(units)) {
                result = {
                    full: i == list.length - 1
                };
                return true;
            }
        });
    return result;
}

function attack(grid, r, c, units) {
    const adjs = _(getAdj(grid, r, c))
        .filter((other) => isEnemy(grid, r, c, other))
        .sortBy((other) => units[key(other.r, other.c)].hp)
        .value();
    if (adjs.length) {
        const other = adjs[0];
        const k1 = key(r, c);
        const k2 = key(other.r, other.c);

        units[k2].hp -= units[k1].power;
        if (units[k2].hp <= 0) {
            grid[other.r][other.c] = '.';
            delete units[k2];
        }
    }
    return adjs.length;
}
function move(grid, r, c, units) {
    // bfs
    const q = [{r, c, paths: []}];
    const visited = {};
    while (q.length) {
        const p = q.shift();
        if (visited[key(p.r, p.c)]) continue;
        visited[key(p.r, p.c)] = true;

        getAdj(grid, p.r, p.c).some((other) => {
            if (isEnemy(grid, r, c, other)) {
                // find an enemy
                const t = p.paths[0];
                grid[t.r][t.c] = grid[r][c];
                grid[r][c] = '.';
                units[key(t.r, t.c)] = units[key(r, c)];
                units[key(t.r, t.c)].r = t.r;
                units[key(t.r, t.c)].c = t.c;
                delete units[key(r, c)];
                // break;
                q.length = 0;
                return true;
            }
            if (grid[other.r][other.c] !== '.') return false;

            q.push({
                r: other.r,
                c: other.c,
                paths: [...p.paths, other]
            });
        });
    }
}

function isUnit(ch) {
    return ch === 'E' || ch === 'G';
}
function isEnemy(grid, r, c, other) {
    return isUnit(grid[other.r][other.c]) && grid[other.r][other.c] != grid[r][c];
}
function key(r, c) {
    return r + '#' + c;
}
function getAdj(grid, r, c) {
    const list = [];
    if (r) list.push({r: r - 1, c});
    if (c) list.push({r, c: c - 1});
    if (c != grid[r].length - 1) list.push({r, c: c + 1});
    if (r != grid.length - 1) list.push({r: r + 1, c});
    return list;
}
function getGameState(grid, units) {
    return grid.map((row, r) => {
        return row.join('') + '    '
            + row.map((ch, c) => isUnit(ch) ? `${ch}(${units[key(r, c)].hp})` : '')
                .filter((s) => s)
                .join(', ');
    }).join('\n');
}
