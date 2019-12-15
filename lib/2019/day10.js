module.exports = function(part, data) {
    const dots = data.split('\n');

    const cs = [];
    for (let i = 0; i < dots.length; i++) {
        for (let j = 0; j < dots[i].length; j++) {
            if (dots[i][j] === '#') {
                cs.push({
                    i, j
                });
            }
        }
    }

    let max = -Infinity;
    cs.forEach((a) => {
        let count = 0;
        cs.forEach((b) => {
            if (valid(dots, a, b)) count++;
        });
        max = Math.max(max, count);
    });

    console.log(max);
};

function valid(dots, a, b) {
    if (a.j > b.j) return valid(dots, b, a);

    if (a.i === b.i) {
        for (let j = a.j + 1; j < b.j; j++) {
            if (dots[a.i][j] === '#') return false;
        }
        return true;
    } else {
        // (j - a.j) / (i - a.i) = (j - b.j) / (i - b.i)
        // (j - a.j) * (i - b.i) = (j - b.j) * (i - a.i)
        // i * j - a.j * i - b.i * j + a.j * b.i = i * j - b.j * i - a.i * j + a.i * b.j
        for (let j = a.j + 1; j < b.j; j++) {
            const i = (a.i * b.j - a.j * b.i + (b.i - a.i) * j) / (b.j - a.j);
            if (i === Math.floor(i) && dots[i][j] === '#') return false;
        }
        return true;
    }
}
