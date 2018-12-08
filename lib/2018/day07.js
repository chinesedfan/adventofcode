'use strict';
const _ = require('lodash');
const reg = /Step ([A-Z]) must be finished before step ([A-Z]) can begin\./;

module.exports = function(part, data) {
    const nodes = {};
    data.split('\n').forEach((line) => {
        const [match, src, dst] = reg.exec(line);
        nodes[src] = nodes[src] || {
            id: src,
            parents: [],
            children: []
        };
        nodes[dst] = nodes[dst] || {
            id: dst,
            parents: [],
            children: []
        };

        nodes[src].children.push(nodes[dst]);
        nodes[dst].parents.push(nodes[src]);
    });
    const rs = _.values(nodes).filter((n) => !n.parents.length);

    const result = [];
    const visited = {};
    if (part === 1) {
        const cmp = (a, b) => a.id > b.id;
        const q = [...rs].sort(cmp);
        while (q.length) {
            const n = q.shift();
            visited[n.id] = 1;
            result.push(n.id);

            n.children.forEach((c) => {
                if (visited[c.id]) return;
                if (_.every(c.parents, (p) => visited[p.id])) {
                    q.push(c);
                }
            });
            q.sort(cmp); // FIXME: binary insert, instead of sorting the whole queue
        }
    } else {
    }

    console.log(result.join(''));
};
