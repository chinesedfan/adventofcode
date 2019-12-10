module.exports = function(part, data) {
    const min = 278384;
    const max = 824795;

    let count = 0;
    for (let i = min; i < max; i++) {
        if (valid(i)) count++;
    }

    console.log(count);
};

function valid(n) {
    const ds = String(n).split('').map(x => +x);

    let hasAdjacentSame = false;
    for (let i = 1; i < ds.length; i++) {
        if (ds[i] < ds[i - 1]) return false;
        if (ds[i] == ds[i - 1]) hasAdjacentSame = true;
    }
    return hasAdjacentSame;
}
