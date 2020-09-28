module.exports = function(part, data) {
    const grid = data.split('\n');
    const ks = findKeys(grid);

    if (part == 1) {
        bfs(ks[0], grid, ks.filter(x => /[a-z]/.test(x.ch)).length);
    } else {
        const {r, c} = ks[0];
        const rs = []; // entries
        for (let i = -1; i <= 1; i++) {
            grid[r + i] = grid[r + i].split('');
            for (let j = -1; j <= 1; j++) {
                const ch = (i == 0 || j == 0) ? '#' : '@';
                grid[r + i][c + j] = ch;
                if (ch === '@') rs.push({ch, r: r + i, c: c + j});
            }
            grid[r + i] = grid[r + i].join('');
        }

        bfs(rs[0], grid, ks.filter(x => /[a-z]/.test(x.ch)).length, rs);
    }
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

function bfs(rnode, map, limit, irs) {
    let ri = 0;
    const q = [{
        i: ri,
        r: rnode.r,
        c: rnode.c,
        d: 0,
        p: rnode.ch,
        rs: [...irs],
    }];
    const cache = {}; // p -> d

    let min = Infinity;
    while (q.length) {
        const {i, rs, r, c, d, p} = q.shift();
        if (d >= min) continue;

        console.log(q.length, p, d);
        const matches = p.match(/[a-z]/g);
        if (matches && matches.length === limit) {
            console.log(p, d);
            min = Math.min(min, d);
            continue;
        }

        const sorted = p.split('').sort().join('');
        const ns = innerBFS(map, r, c, p)
        ns.forEach(next => {
            const nd = d + next.d;
            const np = p + next.ch;
            // the cache is invalid for different `rs`
            const key = sorted + next.ch + getCacheKey(rs);
            if (cache[key] && cache[key] <= nd) return;
            cache[key] = nd;

            const idx = binarySearch(q, (x) => q[x].d <= nd);
            q.splice(idx + 1, 0, {
                i,
                r: next.r,
                c: next.c,
                d: nd,
                p: np,
                rs: [...rs]
            });
        });

        if (!ns.length && rs) {
            ri = i;

            // save the current bot position
            rs[ri] = {
                r,
                c,
                ch: map[r][c],
            };

            ri++;
            if (ri == rs.length) ri = 0;
            q.push({
                i: ri,
                r: rs[ri].r,
                c: rs[ri].c,
                d,
                p,
                rs: [...rs]
            });
        }
    }
}

function innerBFS(map, sr, sc, sp) {
    const ret = [];

    const visited = {};
    const q = [{r: sr, c: sc, d: 0}];
    while (q.length) {
        const {r, c, d} = q.shift();
        if (visited[key(r, c)]) continue;
        visited[key(r, c)] = 1;

        const ch = map[r][c];
        if (isValid(sp, ch)) {
            ret.push({ch, r, c, d});
        } else if (!isBlocked(sp, ch)) {
            add(q, map, r - 1, c, d + 1);
            add(q, map, r + 1, c, d + 1);
            add(q, map, r, c - 1, d + 1);
            add(q, map, r, c + 1, d + 1);
        }
    }

    return ret;
}
function isValid(p, ch) {
    return /[a-zA-Z]/.test(ch) && p.indexOf(ch) < 0 && !isBlocked(p, ch);
}
function isBlocked(p, ch) {
    return ch === '#' || (/[A-Z]/.test(ch) && p.indexOf(ch.toLowerCase()) < 0);
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
function getCacheKey(rs) {
    return rs ? rs.map(({r, c}) => [r, c].join('#')).join('#') : '';
}
