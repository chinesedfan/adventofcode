module.exports = function(part, data) {
    const lines = data.split('\n')
    const gs = []
    let g
    lines.forEach(line => {
        if (line.indexOf('---') >= 0) {
            g = []
            gs.push(g)
        } else if (line) {
            const points = line.split(',').map(Number)
            g.push(points)
        }
    })

    // takes several minutes
    const ms = generateMappers()
    const cache = Array(gs.length)
    cache[0] = getMap(gs[0])
    let map = {
        ...cache[0]
    }
    const q = [0]
    const cs = []
    while (q.length) {
        const i = q.shift()
        const p1 = gs[i]
        const p1map = cache[i]

        for (let j = 0; j < gs.length; j++) {
            if (cache[j]) continue

            for (let m = 0; m < ms.length; m++) {
                let ok = 0
                const points = tranform(gs[j], ms[m])
                // make any 2 points the same
                for (let a = 0; a < p1.length; a++) {
                    const [x1, y1, z1] = p1[a]
                    for (let b = 0; b < points.length; b++) {
                        const [x2, y2, z2] = points[b]
                        const center = [x2 - x1, y2 - y1, z2 - z1]
                        const p2 = move(points, center)
                        const p2map = getMap(p2)
                        if (compare(p1map, p2map) >= 12) {
                            cs.push(center)
                            console.log(i, j, center)
                            ok = 1
                            map = {
                                ...map,
                                ...p2map,
                            }
                            cache[j] = p2map
                            gs[j] = p2
                            q.push(j)
                            break
                        }
                    }
                    if (ok) break
                }
                if (ok) break
            }
        }
    }
    console.log(Object.keys(map).length)
    if (part == 2) {
        let max = 0
        for (let i = 0; i < cs.length; i++) {
            const [x1, y1, z1] = cs[i]
            for (let j = i + 1; j < cs.length; j++) {
                const [x2, y2, z2] = cs[j]
                const d = Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2)
                if (d > max) max = d
            }
        }
        console.log(max)
    }
}

function generateMappers() {
    const baseMapper = [
        (x, y, z) => [x, y, z],
        (x, y, z) => [-y, x, z],
        (x, y, z) => [-x, -y, z],
        (x, y, z) => [y, -x, z],
    ]
    const ms = []
    baseMapper.forEach(fn => {
        ms.push((x, y, z) => fn(x, y, z))
        ms.push((x, y, z) => fn(y, x, -z))
        ms.push((x, y, z) => fn(z, x, y))
        ms.push((x, y, z) => fn(x, z, -y))
        ms.push((x, y, z) => fn(y, z, x))
        ms.push((x, y, z) => fn(z, y, -x))
    })
    return ms
}
function tranform(points, mapper) {
    return points.map(([x, y, z]) => mapper(x, y, z))
}
function move(points, o) { // o is the center
    return points.map(
        ([x, y, z]) => [x - o[0], y - o[1], z - o[2]]
    )
}
function hash([x, y, z]) {
    return [x, y, z].join(',')
}
function getMap(points) {
    return points.reduce((o, x) => {
        o[hash(x)] = 1
        return o
    }, {})
}
function compare(a, b) {
    let r = 0
    for (let k in a) {
        if (b[k]) r++
    }
    return r
}
