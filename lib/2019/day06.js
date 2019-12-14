module.exports = function(part, data) {
    const ns = {}; // key -> node
    data.split('\n').forEach((x) => {
        const [a, b] = x.split(')');
        ns[a] = ns[a] || {key: a, children: [], parents: []};
        ns[b] = ns[b] || {key: b, children: [], parents: []};
        ns[a].children.push(ns[b]);
        ns[b].parents.push(ns[a]);
    });

    (part == 1 ? f1 : f2)(ns);
};

function f1(ns) {
    const visited = {}; // key -> 1
    let sum = 0;
    for (const key in ns) {
        if (!ns[key].parents.length) {
            sum += bfs(ns[key], visited);
        }
    }
    console.log(sum);
}
function f2(ns) {
    const a = ns.YOU;
    const b = ns.SAN;
    const p1 = findAncestors(a);
    const p2 = findAncestors(b);

    let i = 0;
    while (i < p1.length && i < p2.length & p1[i] === p2[i]) i++;

    console.log(p1.length + p2.length - 2 * i);
}

function bfs(r, visited) {
    let sum = 0;
    r.depth = 0;

    const q = [r];
    while (q.length) {
        const node = q.shift();
        if (visited[node.key]) continue;
        visited[node.key] = 1;
        sum += node.depth;

        node.children.forEach((child) => {
            if (!visited[child.key]) {
                child.depth = node.depth + 1;
                q.push(child);
            }
        });
    }
    return sum;
}
function findAncestors(node) {
    const keys = [];
    while (node) {
        keys.unshift(node.key);
        node = node.parents[0];
    }

    keys.pop(); // pop self
    return keys;
}
