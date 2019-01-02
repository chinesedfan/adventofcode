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

    if (part == 1) {
        run(grid, units, part, 3);
    } else {
        let n = 4;
        // find the bound
        while (!run(grid, units, part, n)) {
            n *= 2;
            console.log(n);
        }
        // binary search
        let left = n / 2;
        let right = n;
        while (right > left + 1) {
            n = Math.ceil((left + right) / 2);
            const elfWins = run(grid, units, part, n);

            if (elfWins) {
                right = n;
            } else {
                left = n;
            }
            console.log(left, right, n);
        }

        const elfWins = run(grid, units, part, right);
        console.log(elfWins);
    }
};

/**
 * @return {number|boolean} returns `false` if elves died, otherwise the outcome
 */
function run(grid, units, part, elfPower) {
    const log = part === 1 ? console.log : () => {};
    grid = _.cloneDeep(grid);
    units = _.mapValues(units, (u) => {
        const clone = { ...u };
        if (grid[clone.r][clone.c] === 'E') {
            clone.power = elfPower;
        }
        return clone;
    });

    let r = 0;
    while (1) {
        let result;
        try {
            result = round(grid, units, part);
        } catch (e) {
            if (e.message === 'elf dies') return false;

            throw e;
        }

        if (result) {
            if (result.full) r++;

            const sum = _(units)
                .values()
                .sumBy('hp');
            log(r, sum, r * sum);
            return r * sum;
        }

        r++;
        log('#', r);
        log(getGameState(grid, units));
    }
    // never reach
    return true;
}
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

/**
 * @return {object|undefined} returns `{full}` if the game ends, otherwise `undefined`
 */
function round(grid, units, part) {
    let result;
    _.sortBy(_.values(units), ['r', 'c'])
        .some(({r, c}, i, list) => {
            const u = units[key(r, c)];
            if (!u) return; // killed in previous turns

            if (attack(grid, r, c, units, part == 2)) {
                // skip
            } else {
                move(grid, r, c, units);
                attack(grid, u.r, u.c, units, part == 2);
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

function attack(grid, r, c, units, elf) {
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
            if (elf && grid[other.r][other.c] === 'E') throw new Error('elf dies');
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

            const added = {
                r: other.r,
                c: other.c,
                paths: [...p.paths, other]
            };
            // insert at the right position
            let i = 0;
            while (i < q.length && isLessOrEqual(q[i], added)) i++;
            q.splice(i, 0, added);
        });
    }
}

function isLessOrEqual(p1, p2) {
    if (p1.paths.length === p2.paths.length) {
        // as same as:
        // p1 = _.last(p1.paths);
        // p2 = _.last(p2.paths);
        if (p1.r === p2.r) {
            return p1.c <= p2.c;
        } else {
            return p1.r < p2.r;
        }
    } else {
        return p1.paths.length < p2.paths.length;
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
