module.exports = function(part, data) {
    const numbers = data.split('').map((x) => +x);

    const w = 25;
    const h = 6;

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
    });

    console.log(result);
};
