'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const ps = data.split('\n')
        .map((line) => line.split(',').map((x) => +x));

    const connected = {}; // i -> [j]
    for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
            if (distance(ps[i], ps[j]) <= 3) {
                connected[i] = connected[i] || [];
                connected[i].push(j);
                connected[j] = connected[j] || [];
                connected[j].push(i);
            }
        }
    }

    const visited = {}; // x#y#z#w -> 1
    let r = 0;
    while (bfs(ps, connected, visited)) r++;
    console.log(r);
};

function bfs(ps, connected, visited) {
    const first = _.findIndex(ps, (p) => !visited[p.join('#')]);
    if (first < 0) return false;

    let q = [first];
    while (q.length) {
        const i = q.shift();
        const p = ps[i];
        const k = p.join('#');
        if (visited[k]) continue;
        visited[k] = 1;

        q = q.concat(connected[i] || []);
    }

    return true;
}

function distance(p1, p2) {
    return p1.reduce((s, x, i) => s + Math.abs(x - p2[i]), 0);
}
