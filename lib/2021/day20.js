module.exports = function(part, data) {
    const lines = data.split('\n')
    let map = {}
    const n = lines.length - 2
    const m = lines[2].length
    for (let i = 2; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const h = hash(i - 2, j)
            map[h] = [i - 2, j, lines[i][j] === '#' ? 1 : 0]
        }
    }
    let n1 = 0, n2 = n - 1
    let m1 = 0, m2 = m - 1
    const limit = part == 1 ? 2 : 50
    let round = 0
    while (round < limit) {
        const def = lines[0][(round & 1) ? 0 : 511] === '#' ? 1 : 0
        map = enhance(lines[0], map, n1--, n2++, m1--, m2++, def)
        round++
    }
    //
    let count = 0
    for (let k in map) {
        if (map[k][2]) {
            count++
        }
    }
    console.log(count)
}
function enhance(base, current, n1, n2, m1, m2, def) {
    const map = {}
    for (let i = n1 - 1; i <= n2 + 1; i++) {
        for (let j = m1 - 1; j <= m2 + 1; j++) {
            const temp = []
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const ni = i + dx
                    const nj = j + dy
                    const o = current[hash(ni, nj)]
                    temp.push(o ? o[2] : def)
                }
            }
            const p = parseInt(temp.join(''), 2)
            map[hash(i, j)] = [i, j, base[p] === '#' ? 1 : 0]
        }
    }
    return map
}
function hash(i, j) {
    return i + ',' + j
}
