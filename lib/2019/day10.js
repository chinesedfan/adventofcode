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
    if (a.i === b.i && a.j === b.j) return false;

    const imin = Math.min(a.i, b.i);
    const imax = Math.max(a.i, b.i);
    const jmin = Math.min(a.j, b.j);
    const jmax = Math.max(a.j, b.j);

    if (a.i === b.i) {
        for (let j = jmin + 1; j < jmax; j++) {
            if (isBlock(dots, a.i, j)) return false;
        }
    } else if (a.j === b.j) {
        for (let i = imin + 1; i < imax; i++) {
            if (isBlock(dots, i, a.j)) return false;
        }
    } else {
        // (j - a.j) / (i - a.i) = (j - b.j) / (i - b.i)
        // (j - a.j) * (i - b.i) = (j - b.j) * (i - a.i)
        // i * j - a.j * i - b.i * j + a.j * b.i = i * j - b.j * i - a.i * j + a.i * b.j
        for (let i = imin + 1; i < imax; i++) {
            const j = (a.i * b.j - a.j * b.i + (a.j - b.j) * i) / (a.i - b.i);
            const delta = j - Math.floor(j);
            if (delta) {
                // don't consider 2 asteroids form a blocking line
            } else {
                if (isBlock(dots, i, j)) return false;
            }
        }
        for (let j = jmin + 1; j < jmax; j++) {
            const i = (a.i * b.j - a.j * b.i + (b.i - a.i) * j) / (b.j - a.j);
            const delta = i - Math.floor(i);
            if (delta) {
                // don't consider 2 asteroids form a blocking line
            } else {
                if (isBlock(dots, i, j)) return false;
            }
        }
    }
    return true;
}
function isBlock(dots, i, j) {
    return i >= 0 && i < dots.length && j >= 0 && j < dots[0].length
        && dots[i][j] === '#';
}
