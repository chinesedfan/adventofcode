module.exports = function(part, data) {
    const reg = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
    const lines = data.split('\n')
        .map(line => {
            const [_, sx, sy, bx, by] = reg.exec(line)
            return [+sx, +sy, +bx, +by]
        })
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    const map = {}
    const target = 2000000
    lines.forEach(([sx, sy, bx, by]) => {
        const d = Math.abs(sx - bx) + Math.abs(sy - by)
        const dy = Math.abs(sy - target)
        const dx = d - dy
        if (dx <= 0) return

        for (let i = -dx; i <= dx; i++) {
            map[sx + i] = 1
        }
    })
    lines.forEach(([sx, sy, bx, by]) => {
        if (by === target) delete map[bx]
    })
    console.log(Object.keys(map).length)
}

function f2(lines) {
}
