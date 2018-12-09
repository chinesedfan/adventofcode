'use strict';
const _ = require('lodash');
const reg = /Step ([A-Z]) must be finished before step ([A-Z]) can begin\./;

module.exports = function(part, data) {
    const nodes = {};
    data.split('\n').forEach((line) => {
        const [match, src, dst] = reg.exec(line);
        nodes[src] = nodes[src] || {
            id: src,
            cost: src.charCodeAt(0) - 4, // i.e 65 -> 61
            parents: [],
            children: []
        };
        nodes[dst] = nodes[dst] || {
            id: dst,
            cost: dst.charCodeAt(0) - 4, // i.e 65 -> 61
            parents: [],
            children: []
        };

        nodes[src].children.push(nodes[dst]);
        nodes[dst].parents.push(nodes[src]);
    });
    const rs = _.values(nodes).filter((n) => !n.parents.length);

    const result = [];
    const visited = {};
    const workers = part == 1 ? 1 : 5;
    const cmpId = (a, b) => a.id > b.id;
    const cmpCost = (a, b) => a.cost > b.cost;
    let q = rs.sort(cmpId);
    let time = 0;
    while (q.length) {
        let processing = q.slice(0, workers);
        const waiting = q.slice(workers);

        const n = processing.sort(cmpCost)[0];
        const cost = n.cost;
        time += cost;
        const done = [];
        for (let i = 0; i < processing.length; i++) {
            q[i].cost -= cost;
            if (!q[i].cost) {
                done.push(q[i]);
            }
        }
        processing = processing.filter((p) => p.cost);

        done.sort(cmpId).forEach((d) => {
            visited[d.id] = 1;
            result.push(d.id);
        });
        done.forEach((d) => {
            d.children.forEach((c) => {
                if (visited[c.id]) return;
                if (_.every(c.parents, (p) => visited[p.id])) {
                    waiting.push(c);
                }
            });
        });
        waiting.sort(cmpId); // don't break processing ones

        q = processing.concat(waiting);
    }

    console.log(part == 1 ? result.join('') : time);
};
