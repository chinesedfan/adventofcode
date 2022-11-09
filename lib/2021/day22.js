module.exports = function(part, data) {
    const reg = /(?:on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
    const lines = data.split('\n')
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
function hash(x, y, z) {
    return x * 100 * 100 + y * 100 + z
}
