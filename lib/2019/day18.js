module.exports = function(part, data) {
    const grid = data.split('\n');
    const ks = findKeys(grid);

    bfs(ks[0], grid, ks.length);
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

function bfs(rnode, map, limit) {
    const q = [{
        r: rnode.r,
        c: rnode.c,
        d: 0,
        p: rnode.ch
    }];
    const cache = {}; // p -> d

    let min = Infinity;
    while (q.length) {
        const {r, c, d, p} = q.shift();
        if (d >= min) continue;

        console.log(q.length, p, d);
        if (p.length === limit) {
            console.log(p, d);
            min = Math.min(min, d);
            continue;
        }

        const sorted = p.split('').sort().join('');
        innerBFS(map, r, c, p).forEach(next => {
            const nd = d + next.d;
            const np = p + next.ch;
            const key = sorted + next.ch;
            if (cache[key] && cache[key] <= nd) return;
            cache[key] = nd;

            const idx = binarySearch(q, (x) => q[x].d <= nd);
            q.splice(idx + 1, 0, {
                r: next.r,
                c: next.c,
                d: nd,
                p: np
            });
        });
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

function hasSameOrBetter(cache, nd, chs) {
    const ch = chs[chs.length - 1];
    if (!cache[ch]) return false;

    return cache[ch].some(({p, d}) => {
        if (d < nd && p.length > chs.length) return true;
        // if (p.length === chs.length)
    });
}
function isSame(a, b) {
    return a.length === b.length
        && a.join('') === b.join('');
}
