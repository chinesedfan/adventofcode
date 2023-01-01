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
    const limit = 4e6
    for (let target = 0; target <= limit; target++) {
        const segs = []
        lines.forEach(([sx, sy, bx, by]) => {
            const d = Math.abs(sx - bx) + Math.abs(sy - by)
            const dy = Math.abs(sy - target)
            const dx = d - dy
            if (dx <= 0) return

            segs.push([sx - dx, sx + dx])
        })
        segs.sort((a, b) => {
            return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
        })

        let x = segs[0][0]
        for (let [l, r] of segs) {
            if (l > x) {
                x++
                console.log(x, target)
                console.log(x * 4000000 + target)
                return
            } else {
                x = Math.max(x, r)
            }
        }
    }
}
