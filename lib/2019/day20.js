const MRGIN = 2;
const BORDER = 35;

module.exports = function(part, data) {
    const grid = data.split('\n');
    const {outter, inner} = findEntry(grid);
    const ns = outter.concat(inner);

    const distance = {}; // k1#k2 -> d
    inner.forEach((o) => {
        const k2 = o.k.replace('i-', 'o-');
        distance[key(o.k, k2)] = 1;
        distance[key(k2, o.k)] = 1;
    });
    outter.forEach(o => bfs(o, grid, distance, ns));

    // parse as adjacent table
    const table = {}; // k -> [k]
    for (let k in distance) {
        const [k1, k2] = k.split('#');
        table[k1] = table[k1] || {};
        table[k2] = table[k2] || {};
        table[k1][k2] = 1;
        table[k2][k1] = 1;
    }
    const ks = Object.keys(table);
    bfsWithNode({k: 'o-AA'}, table, distance, ns);
    return;

    // Dijkstra
    const min = {'o-AA': 0};
    const confirmed = {'o-AA': 1};
    while (1) {
        const edge = {d: Infinity};
        for (let k2 of ks) {
            if (confirmed[k2]) continue;

            const k = key('o-AA', k2);
            const d = Math.min(min[k2] || Infinity, distance[k] || Infinity);
            if (d < edge.d) {
                edge.d = d;
                edge.k1 = 'o-AA';
                edge.k2 = k2;
            }
        }

        min[edge.k2] = edge.d;
        confirmed[edge.k2] = 1;
        console.log('confirmed', edge.k2, min[edge.k2]);
        if (edge.k2 === 'o-ZZ') {
            console.log(min[edge.k2]);
            break;
        }

        // update others
        for (let k3 in table[edge.k2]) {
            min[k3] = Math.min(
                k3 in min ? min[k3] : Infinity,
                min[edge.k2] + distance[key(edge.k2, k3)]
            );
            console.log('update', k3, min[k3]);
        }
        console.log();
    }
};

function findEntry(grid) {
    const outter = []; // {k, r, c}
    const inner = [];

    for (let i = 0; i < grid.length; i++) {
        let r, c;

        // outter

        r = MRGIN;
        c = i;
        if (grid[r][c] === '.') {
            outter.push({k: [grid[r - 2][c], grid[r - 1][c]].join(''), r, c});
        }

        r = grid.length - 1 - MRGIN;
        c = i;
        if (grid[r][c] === '.') {
            outter.push({k: [grid[r + 1][c], grid[r + 2][c]].join(''), r, c});
        }

        r = i;
        c = MRGIN;
        if (grid[r][c] === '.') {
            outter.push({k: [grid[r][c - 2], grid[r][c - 1]].join(''), r, c});
        }

        r = i;
        c = grid[0].length - 1 - MRGIN;
        if (grid[r][c] === '.') {
            outter.push({k: [grid[r][c + 1], grid[r][c + 2]].join(''), r, c});
        }

        // inner

        r = MRGIN + BORDER - 1;
        c = i;
        if (grid[r][c] === '.' && isInner(grid, r, c)) {
            inner.push({k: [grid[r + 1][c], grid[r + 2][c]].join(''), r, c});
        }

        r = grid.length - MRGIN - BORDER;
        c = i;
        if (grid[r][c] === '.' && isInner(grid, r, c)) {
            inner.push({k: [grid[r - 2][c], grid[r - 1][c]].join(''), r, c});
        }

        r = i;
        c = MRGIN + BORDER - 1;
        if (grid[r][c] === '.' && isInner(grid, r, c)) {
            inner.push({k: [grid[r][c + 1], grid[r][c + 2]].join(''), r, c});
        }

        r = i;
        c = grid[0].length - MRGIN - BORDER;
        if (grid[r][c] === '.' && isInner(grid, r, c)) {
            inner.push({k: [grid[r][c - 2], grid[r][c - 1]].join(''), r, c});
        }
    }

    outter.forEach(o => o.k = `o-${o.k}`);
    inner.forEach(o => o.k = `i-${o.k}`);

    return {outter, inner};
}

function bfsWithNode(rn, table, distance, ns) {
    rn.d = 0;

    const q = [rn];
    const visited = {};
    while (q.length) {
        const {k, d} = q.shift(); // x as well as r, y as well as c
        if (visited[k]) continue;
        visited[k] = 1;

        if (k === 'o-ZZ') {
            console.log(d);
            break;
        }

        for (let k2 in table[k]) {
            if (visited[k2]) continue;

            for (let i = 0; i < ns.length; i++) {
                if (ns[i].k === k2) {
                    const nd = d + distance[key(k, k2)];
                    const idx = binarySearch(q, (x) => q[x].d <= nd);
                    q.splice(idx + 1, 0, {
                        k: k2,
                        d: nd
                    });
                    break;
                }
            }
        }
    }
}
function binarySearch(q, fn) {
    let left = 0;
    let right = q.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (fn(mid)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}
function bfs(rt, map, distance, ns) {
    rt.d = 0;

    const q = [rt];
    const visited = {};
    while (q.length) {
        const {r: x, c: y, d} = q.shift(); // x as well as r, y as well as c
        if (visited[key(x, y)]) continue;
        visited[key(x, y)] = 1;

        if (isInner(map, x, y) || isOutter(map, x, y)) {
            for (let i = 0; i < ns.length; i++) {
                if (x === ns[i].r && y === ns[i].c) {
                    distance[key(rt.k, ns[i].k)] = d;
                    distance[key(ns[i].k, rt.k)] = d;
                    break;
                }
            }
        }

        add(q, map, x - 1, y, d + 1);
        add(q, map, x + 1, y, d + 1);
        add(q, map, x, y - 1, d + 1);
        add(q, map, x, y + 1, d + 1);
    }
}
function add(q, map, r, c, d) {
    if (r >= 0 && r < map.length
            && c >= 0 && c < map[0].length
            && map[r][c] === '.') {
        q.push({r, c, d});
    }
}
function key(x, y) {
    return x + '#' + y;
}

function isOutter(grid, x, y) {
    return check(grid, x, y, grid.length, grid[0].length, MRGIN)
        || check(grid, y, x, grid[0].length, grid.length, MRGIN);
}
function isInner(grid, x, y) {
    return check(grid, x, y, grid.length, grid[0].length, MRGIN + BORDER - 1)
        || check(grid, y, x, grid[0].length, grid.length, MRGIN + BORDER - 1);
}
function check(grid, x, y, xlen, ylen, d) {
    return (x === d || x === xlen - 1 - d) && (y >= d && y < ylen - d);
}
