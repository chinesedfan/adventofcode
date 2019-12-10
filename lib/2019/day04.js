module.exports = function(part, data) {
    const min = 278384;
    const max = 824795;

    let count = 0;
    for (let i = min; i < max; i++) {
        if (valid(i, part)) count++;
    }

    console.log(count);
};

function valid(n, part) {
    const ds = String(n).split('').map(x => +x);

    const cs = [];
    let prev = 1;
    for (let i = 1; i < ds.length; i++) {
        if (ds[i] < ds[i - 1]) return false;
        if (ds[i] == ds[i - 1]) {
            prev++;
        } else {
            cs.push(prev);
            prev = 1;
        }
    }
    cs.push(prev);

    return cs.some(x => (part == 1 ? x >= 2 : x == 2));
}
