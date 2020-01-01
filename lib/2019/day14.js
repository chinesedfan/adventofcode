module.exports = function(part, data) {
    const ns = {};
    const eqs = {};
    data.split('\n').forEach((str) => {
        const [input, output] = str.split(' => ');

        const [n, k] = output.split(' ');
        const parent = ns[k] = ns[k] || {k, children: {}, parents: 0};
        eqs[k] = {k, n: +n, children: {}};

        const deps = input.split(', ');
        deps.forEach((dp) => {
            const [cn, ck] = dp.split(' ');
            const child = ns[ck] = ns[ck] || {k: ck, children: {}, parents: 0};

            parent.children[ck] = 1;
            child.parents++;
            eqs[k].children[ck] = +cn;
        });
    });

    if (part == 1) {
        console.log(getORECount(ns, eqs, 1));
    } else {
        const limit = 1000000000000;

        let x = 1;
        while (getORECount(ns, eqs, x) <= limit) x = x * 2;

        x = binarySearch(x / 2, x, (i) => getORECount(ns, eqs, i) <= limit);
        console.log(x);
    }
};

function getORECount(ns, eqs, x) {
    // not consider multiple ways to produce the same chemical
    const keys = Object.keys(ns);
    const counts = {FUEL: x};

    // clone `ns` first
    const clone = {};
    for (let k in ns) {
        clone[k] = {...ns[k]};
    }
    ns = clone;

    const es = {};
    let expanded = 0;
    while (expanded < keys.length - 1) {
        let r;
        for (let i = 0; i < keys.length; i++) {
            if (!es[keys[i]] && ns[keys[i]].parents === 0) {
                r = ns[keys[i]];
                break;
            }
        }

        const eq = eqs[r.k];
        for (const nk in r.children) {
            const child = ns[nk];
            child.parents--;

            counts[child.k] = counts[child.k] || 0;
            counts[child.k] += Math.ceil(counts[r.k] / eq.n) * eq.children[child.k];
        }

        es[r.k] = 1;
        expanded++;
    }

    return counts.ORE;
}

function binarySearch(l, r, fn) { // for any [l, x], fn returns true
    while (l <= r) {
        var middle = Math.floor((l + r) / 2);
        if (fn(middle)) {
            l = middle + 1;
        } else {
            r = middle - 1;
        }
    }
    return r;
}
