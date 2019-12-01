module.exports = function(part, data) {
    const numbers = data.split('\n').map((x) => +x);
    const result = numbers.map((n) => {
        if (part == 1) return hash(n);

        let s = 0;
        while (n > 0) {
            n = hash(n);
            if (n > 0) s += n;
        }
        return s;
    })
        .reduce((s, n) => s + n, 0);
    console.log(result);
};

function hash(n) {
    return Math.floor(n / 3) - 2;
}
