module.exports = function(part, data) {
    const grid = data.split('\n');
    const ks = findKeys(grid);

    const distance = {}; // k1#k2 -> d
    ks.forEach((k) => {
        bfsWithNode(k, grid, distance);
    });

    bfs('@', grid, distance, ks.length);
};

function findKeys(grid) {
    const ks = [];
    grid.forEach((line, r) => {
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (/[a-zA-Z]/.test(ch)) {
                ks.push({ch, r, c: i})
            } else if (ch === '@') {
                ks.unshift({ch, r, c: i})
            }
        }
    });
    return ks;
}
function bfsWithNode(rt, map, distance) {
    rt.d = 0;
    distance[rt.ch] = distance[rt.ch] || {};

    const q = [rt];
    const visited = {};
    while (q.length) {
        const {r: x, c: y, d} = q.shift(); // x as well as r, y as well as c
        if (visited[key(x, y)]) continue;
        visited[key(x, y)] = 1;

        const ch = map[x][y];
        if (/[a-zA-Z]/.test(ch)) {
            distance[rt.ch][ch] = d;
        }

        add(q, map, x - 1, y, d + 1);
        add(q, map, x + 1, y, d + 1);
        add(q, map, x, y - 1, d + 1);
        add(q, map, x, y + 1, d + 1);
    }
}

function bfs(rch, map, distance, limit) {
    const q = [{p: rch, ch: rch, d: 0}];
    while (q.length) {
        const {p, ch, d} = q.shift();

        if (p.length === limit) {
            console.log(d);
            break;
        }

        for (let other in distance[ch]) {
            const valid = p.indexOf(other) < 0
                && (/[a-z]/.test(ch)
                    || p.indexOf(ch.toLowerCase()) >= 0
                );
            if (!valid) continue;

            const nd = d + distance[ch][other];
            const idx = binarySearch(q, (x) => q[x].d <= nd);
            q.splice(idx + 1, 0, {
                p: p + other,
                ch: other,
                d: nd,
            });
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
function add(q, map, r, c, d) {
    if (r >= 0 && r < map.length
            && c >= 0 && c < map[0].length
            && map[r][c] !== '#') {
        q.push({r, c, d});
    }
}
function key(x, y) {
    return x + '#' + y;
}
