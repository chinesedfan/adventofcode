'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    console.log(bfs(parseRegExp(data)));
};

function parseRegExp(reg) {
    const cache = {}; // r1#c1#r2#c2 -> 1
    const stack = [];

    let total = []; // [{r, c}]
    let ps = [{r: 0, c: 0}];
    stack.push({total, ps});
    for (let i = 0; i < reg.length; i++) {
        switch (reg[i]) {
        case 'N':
            ps.forEach((p) => {
                cache[key(p.r, p.c, --p.r, p.c)] = 1;
            });
            break;
        case 'E':
            ps.forEach((p) => {
                cache[key(p.r, p.c, p.r, ++p.c)] = 1;
            });
            break;
        case 'W':
            ps.forEach((p) => {
                cache[key(p.r, p.c, p.r, --p.c)] = 1;
            });
            break;
        case 'S':
            ps.forEach((p) => {
                cache[key(p.r, p.c, ++p.r, p.c)] = 1;
            });
            break;
        case '(':
            stack.push({total, ps});
            total = [];
            ps = _.cloneDeep(ps);
            break;
        case ')':
            ps = total.concat(ps);
            ps = _.uniqBy(ps, (p) => key(p.r, p.c));
            total = stack.pop().total;
            break;
        case '|':
            total = total.concat(ps);
            ps = _.cloneDeep(_.last(stack).ps);
            break;
        default:
            break;
        }
    }
    return cache;
}
function bfs(cache) {
    const q = [{r: 0, c: 0, d: 0}];
    const visited = {}; // r#c -> 1
    let farest = 0;
    while (q.length) {
        const p = q.shift();
        if (visited[key(p.r, p.c)]) continue;
        visited[key(p.r, p.c)] = 1;
        if (p.d > farest) farest = p.d;

        if (cache[key(p.r, p.c, p.r + 1, p.c)]) q.push({r: p.r + 1, c: p.c, d: p.d + 1});
        if (cache[key(p.r, p.c, p.r - 1, p.c)]) q.push({r: p.r - 1, c: p.c, d: p.d + 1});
        if (cache[key(p.r, p.c, p.r, p.c + 1)]) q.push({r: p.r, c: p.c + 1, d: p.d + 1});
        if (cache[key(p.r, p.c, p.r, p.c - 1)]) q.push({r: p.r, c: p.c - 1, d: p.d + 1});
    }

    return farest;
}

function key(...args) {
    return args.join('#');
}
