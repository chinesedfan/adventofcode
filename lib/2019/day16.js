module.exports = function(part, data) {
    let numbers = data.split('').map((x) => +x);
    const pattern = [0, 1, 0, -1];

    let step = 100;
    while (step--) {
        numbers = fft(numbers, pattern);
    }
    console.log(numbers.slice(0, 8).join(''));
};

function fft(input, pattern) {
    return input.map((a, i) => {
        const s = input.reduce((sum, b, j) => {
            return sum + b * pattern[(Math.floor((j + 1) / (i + 1))) % pattern.length];
        }, 0);

        return Math.abs(s % 10);
    });
}
