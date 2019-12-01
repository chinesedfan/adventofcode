module.exports = function(part, data) {
    const numbers = data.split('\n').map((x) => +x);
    const result = numbers.map((n) => Math.floor(n / 3) - 2)
        .reduce((s, n) => s + n, 0);
    console.log(result);
};
