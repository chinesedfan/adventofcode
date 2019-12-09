module.exports = function(part, data) {
    const moves = data.split('\n').map((x) => x.split(','));
    const line1 = parseMove(moves[0]);
    const line2 = parseMove(moves[1]);

    let min = Infinity;
    line1.forEach((p1) => {
        line2.forEach((p2) => {
            let p;
            if (p1.ish && p2.ish) {
                const ox = p1.y === p2.y && getOverlapped(p1.x, p1.ex, p2.x, p2.ex);
                if (ox) {
                    p = {
                        x: getMinX(ox),
                        y: p1.y
                    };
                }
            } else if (p1.ish) {
                if (isMiddle(p1.y, p2.y, p2.ey) && isMiddle(p2.x, p1.x, p1.ex)) {
                    p = {
                        x: p2.x,
                        y: p1.y
                    };
                }
            } else if (p2.ish) {
                if (isMiddle(p1.x, p2.x, p2.ex) && isMiddle(p2.y, p1.y, p1.ey)) {
                    p = {
                        x: p1.x,
                        y: p2.y
                    };
                }
            } else {
                const oy = p1.x === p2.x && getOverlapped(p1.y, p1.ey, p2.y, p2.ey);
                if (oy) {
                    p = {
                        x: p1.x,
                        y: getMinX(oy)
                    };
                }
            }

            if (p && (p.x || p.y)) min = Math.min(min, Math.abs(p.x) + Math.abs(p.y));
        });
    });

    console.log(min);
};

function parseMove(ms) {
    let x = 0;
    let y = 0;

    const line = [];
    ms.forEach((s) => {
        const n = +(s.slice(1));
        const part = {x, y};

        switch (s[0]) {
        case 'L': x -= n; break;
        case 'R': x += n; break;
        case 'U': y += n; break;
        case 'D': y -= n; break;
        }

        part.ex = x;
        part.ey = y;
        part.ish = s[0] === 'L' || s[0] === 'R';
        line.push(part);
    });

    return line;
}
function getOverlapped(s1, e1, s2, e2) {
    if (s1 > e1) [s1, e1] = [e1, s1];
    if (s2 > e2) [s2, e2] = [e2, s2];
    if (s1 > s2) return getOverlapped(s2, e2, s1, e1);
    return e1 >= s2 ? [s2, e1] : null;
}
function getMinX([sx, ex]) {
    if (ex < 0) {
        return -ex;
    } else if (sx > 0) {
        return sx;
    } else {
        return 0;
    }
}
function isMiddle(x, sx, ex) {
    if (sx > ex) return isMiddle(x, ex, sx);
    return x >= sx && x <= ex;
}
