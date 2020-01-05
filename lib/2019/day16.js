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
    const aggr = [];
    for (let i = 0; i < input.length; i++) {
        if (i) {
            aggr[i] = aggr[i - 1] + input[i];
        } else {
            aggr[i] = input[i];
        }
    }

    const get = (idx) => idx >= 0 && idx < aggr.length ? aggr[idx] : 0;

    return input.map((a, i) => {
        const step = i + 1;

        let s = 0;
        let j = -1;
        let k = 0;
        while (j < input.length) {
            s += (get(Math.min(j + step - 1, input.length - 1)) - get(j - 1)) * pattern[k];

            j += step;
            k++;
            if (k === pattern.length) k = 0;
        }

        return Math.abs(s % 10);
    });
}
