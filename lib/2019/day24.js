module.exports = function(part, data) {
    let dots = data.split('\n');
    dots.hash = 0;
    for (let i = 0; i < dots.length; i++) {
        for (let j = 0; j < dots[i].length; j++) {
            if (dots[i][j] === '#') {
                dots.hash |= (1 << (i * dots[i].length + j));
            }
        }
    }

    const cache = {};
    while (1) {
        if (cache[dots.hash]) break;
        cache[dots.hash] = 1;
        dots = next(dots);
    }

    console.log(dots.hash);
};

function next(dots) {
    const nd = [];
    nd.hash = 0;
    for (let i = 0; i < dots.length; i++) {
        nd[i] = [];
        for (let j = 0; j < dots[i].length; j++) {
            let n = 0;
            if (isBug(dots, i, j - 1)) n++;
            if (isBug(dots, i, j + 1)) n++;
            if (isBug(dots, i - 1, j)) n++;
            if (isBug(dots, i + 1, j)) n++;

            if (dots[i][j] === '#' && n !== 1) {
                nd[i][j] = '.';
            } else if (dots[i][j] === '.' && (n === 1 || n === 2)) {
                nd[i][j] = '#';
            } else {
                nd[i][j] = dots[i][j];
            }

            if (nd[i][j] === '#') {
                nd.hash |= (1 << (i * dots[i].length + j));
            }
        }
    }
    return nd;
}
function isBug(dots, i, j) {
    return i >= 0 && i < dots.length && j >= 0 && j < dots[0].length
        && dots[i][j] === '#';
}
