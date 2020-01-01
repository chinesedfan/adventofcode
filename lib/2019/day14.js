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

    // not consider multiple ways to produce the same chemical
    const keys = Object.keys(ns);
    const counts = {FUEL: 1};

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

    console.log(counts.ORE);
};
