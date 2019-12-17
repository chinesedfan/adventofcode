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
    let best;
    cs.forEach((a, i) => {
        let count = 0;
        cs.forEach((b) => {
            if (valid(dots, a, b)) count++;
        });

        if (count > max) {
            max = count;
            best = i;
        }
    });

    console.log(max);

    // part 2
    const x = cs[best];
    const others = [...cs];
    others.splice(best, 1);
    others.sort((a, b) => {
        const k1 = a.i === x.i ? (a.j > x.j ? Infinity : -Infinity) : (a.j - x.j) / (a.i - x.i);
        const k2 = b.i === x.i ? (b.j > x.j ? Infinity : -Infinity) : (b.j - x.j) / (b.i - x.i);
        if (k1 === k2) {
            return 0;
        } else if (k1 === 0) {
            return -1;
        } else if (k2 === 0) {
            return 1;
        } else {
            if (k1 > 0 && k2 > 0) {
                // Inf -> 0
                return k2 - k1;
            } else if (k1 > 0) {
                return 1;
            } else if (k2 > 0) {
                return -1;
            } else {
                // 0 -> -Inf
                return k2 - k1;
            }
        }
    });

    let prev;
    const grouped = [];
    others.forEach((b) => {
        if (prev && isSameLine(x, prev, b)) {
            grouped[grouped.length - 1].push(b);
        } else {
            grouped.push([b]);
            prev = b;
        }
    });

    grouped.forEach((group) => group.sort((a, b) => {
        const aa = getArea(x, a);
        const ab = getArea(x, b);
        if (aa === ab) {
            return distance(x, a) - distance(x, b);
        } else {
            return aa - ab;
        }
    }));

    let n = 50;
    let g = 0;
    let target;
    while (n--) {
        target = grouped[g].shift();
        if (grouped[g].length) {
            g++;
        } else {
            grouped.splice(g, 1);
        }
        if (g === grouped.length) g = 0;
    }
    return target.j * 100 + target.i;
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

function isSameLine(x, a, b) {
    if (a.j === x.j && b.j === x.j) {
        return true;
    } else if (a.j === x.j || b.j === x.j) {
        return false;
    } else {
        const p1 = (x.j - b.j) * (x.i - a.i);
        const p2 = (x.j - a.j) * (x.i - b.i);
        return p1 === p2;
    }
}
// consider i as x, j as y
// 2 1 4 3 -> 0 1 2 3
function getArea(a, b) {
    if (b.j >= a.j) {
        return b.i < a.i ? 0 : 1;
    } else {
        return b.i < a.i ? 3 : 2;
    }
}
function distance(a, b) {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
}
