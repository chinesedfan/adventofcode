module.exports = function(part, data) {
    const lines = data.split('\n')
    let map = {}
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === '#') {
                map[hash(i, j)] = [i, j]
            }
        }
    }

    const ds = {
        W: [0, -1],
        E: [0, 1],
        N: [-1, 0],
        S: [1, 0],
        SE: [1, 1],
        SW: [1, -1],
        NE: [-1, 1],
        NW: [-1, -1],
    }
    const rules = [
        ['N', [ds.N, ds.NE, ds.NW]],
        ['S', [ds.S, ds.SE, ds.SW]],
        ['W', [ds.W, ds.NW, ds.SW]],
        ['E', [ds.E, ds.NE, ds.SE]],
    ]
    let ri = 0

    const rlimit = 10
    let round = 0
    let move = 1
    let minx, maxx, miny, maxy
    const ok = () => {
        round++
        return part == 1 ? round <= rlimit : move
    }
    while (ok()) {
        const propose = {}
        for (let h in map) {
            const [x, y] = map[h]
            const pks = []
            for (let i = 0; i < rules.length; i++) {
                const [k, rs] = rules[(i + ri) % rules.length]
                let has = 0
                for (let j = 0; j < rs.length; j++) {
                    const [dx, dy] = rs[j]
                    const nx = x + dx
                    const ny = y + dy
                    const nh = hash(nx, ny)
                    if (map[nh]) {
                        has = 1
                        break
                    }
                }
                if (!has) pks.push(k)
            }
            const [dx, dy] = pks.length && pks.length < rules.length ? ds[pks[0]] : [0, 0]
            const nx = x + dx
            const ny = y + dy
            const nh = hash(nx, ny)
            if (propose[nh]) {
                propose[nh] = 'keep'
            } else {
                propose[nh] = [h, nx, ny]
            }
        }

        minx = Infinity
        maxx = -Infinity
        miny = Infinity
        maxy = -Infinity
        const after = {}
        move = 0
        for (let nh in propose) {
            if (propose[nh] !== 'keep') {
                const [h, nx, ny] = propose[nh]
                move |= nh !== h
                after[nh] = [nx, ny]
                updateMinMax(nx, ny)
                delete map[h]
            }
        }
        for (let k in map) {
            after[k] = map[k]
            updateMinMax(map[k][0], map[k][1])
        }

        map = after
        if (++ri === rules.length) ri = 0
    }

    let count = 0
    for (let i = minx; i <= maxx; i++) {
        for (let j = miny; j <= maxy; j++) {
            if (!map[hash(i, j)]) count++
        }
    }
    console.log(count)
    console.log('round', round - 1)

    function updateMinMax(x, y) {
        if (x < minx) minx = x
        if (x > maxx) maxx = x
        if (y < miny) miny = y
        if (y > maxy) maxy = y
    }
}

function hash(i, j) {
    return i + ',' + j
}
