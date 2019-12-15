module.exports = function(part, data) {
    const numbers = data.split('').map((x) => +x);

    const w = 25;
    const h = 6;
    const image = Array(h).fill(0).map(() => Array(w).fill(2));

    let zeros = 0;
    let ones = 0;
    let twos = 0;

    let min = Infinity;
    let result;
    numbers.forEach((x, i) => {
        switch (x) {
        case 0: zeros++; break;
        case 1: ones++; break;
        case 2: twos++; break;
        default: break;
        }

        if (!((i + 1) % (w * h))) {
            if (zeros < min) {
                min = zeros;
                result = ones * twos;
            }

            zeros = ones = twos = 0;
        }

        const row = Math.floor(i % (w * h) / w);
        const col = i % (w * h) % w;
        if (image[row][col] === 2) {
            image[row][col] = x;
        }
    });

    console.log(result);
    // recognize by your eyes
    console.log(print(image));
};

function print(image) {
    return image.map((row) => row.map((x) => x === 0 ? '#' : '.').join('')).join('\n');
}
