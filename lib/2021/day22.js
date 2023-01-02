const reg = /(?:on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
module.exports = function(part, data) {
    const lines = data.split('\n')
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    let count = 0
    const map = {}
    lines.forEach(line => {
        let [_, x1, x2, y1, y2, z1, z2] = reg.exec(line).map(Number)
        x1 = Math.max(-50, x1)
        y1 = Math.max(-50, y1)
        z1 = Math.max(-50, z1)
        x2 = Math.min(50, x2)
        y2 = Math.min(50, y2)
        z2 = Math.min(50, z2)
        for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
            const h = hash(x, y, z)
            if (line.slice(0, 2) === 'on') {
                if (!map[h]) {
                    map[h] = 1
                    count++
                }
            } else {
                if (map[h]) {
                    map[h] = 0
                    count--
                }
            }
        }
        }
        }
    })
    console.log(count)
}
function f2(lines) {
    const xmap = {}
    const ymap = {}
    const zmap = {}
    lines.forEach(line => {
        let [_, x1, x2, y1, y2, z1, z2] = reg.exec(line).map(Number)
        xmap[x1 - 1] = 1
        xmap[x2] = 1
        ymap[y1 - 1] = 1
        ymap[y2] = 1
        zmap[z1 - 1] = 1
        zmap[z2] = 1
    })
    const [xks, xrmap] = getKeysAndRmap(xmap)
    const [yks, yrmap] = getKeysAndRmap(ymap)
    const [zks, zrmap] = getKeysAndRmap(zmap)
    console.log(xks.length, yks.length, zks.length)

    let count = 0
    // use bitset or memory is not enough
    const map = Array(Math.floor(850 * 850 * 850 / 32)).fill(0)
    lines.forEach((line, l) => {
        let [_, x1, x2, y1, y2, z1, z2] = reg.exec(line)
            .map((x, i) => {
                if (!i) return x

                const rmap = [xrmap, yrmap, zrmap][Math.floor((i - 1) / 2)]
                return (i & 1) ? (rmap[x - 1] + 1) : rmap[x]
            })
        const on = line.slice(0, 2) === 'on'
        for (let x = x1; x <= x2; x++) {
            const dx = xks[x] - xks[x - 1]
            for (let y = y1; y <= y2; y++) {
                const dy = yks[y] - yks[y - 1]
                for (let z = z1; z <= z2; z++) {
                    const dz = zks[z] - zks[z - 1]
                    const h = hash(x, y, z)
                    const idx = Math.floor(h / 32)
                    const mask = 1 << (h % 32)
                    const now = dx * dy * dz
                    if (on) {
                        if (!(map[idx] & mask)) {
                            map[idx] |= mask
                            count += now
                        }
                    } else {
                        if (map[idx] & mask) {
                            map[idx] ^= mask
                            count -= now
                        }
                    }
                }
            }
        }
        console.log(l, count)
    })
    console.log(count)
}

function hash(x, y, z) {
    const n = 850
    return x * n * n + y * n + z
}
function getKeysAndRmap(map) {
    const ks = Object.keys(map)
        .map(Number)
        .sort((a, b) => a - b)
    const rmap = ks.reduce((o, x, i) => {
        o[x] = i
        return o
    }, {})
    return [ks, rmap]
}
