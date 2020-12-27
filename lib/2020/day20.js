module.exports = function(part, data) {
    const tiles = {}
    let cur
    data.split('\n').forEach(line => {
        if (line.indexOf('Tile') >= 0) {
            const id = parseInt(line.split(' ')[1])
            cur = []
            tiles[id] = cur
        } else if (line) {
            cur.push(line.split(''))
        }
    })

    const m = {} // hash -> id -> 1
    for (let id in tiles) {
        const grid = tiles[id]
        grid.h = [] // [top, right, bottom, left], clockwise
        grid.h[0] = hash(grid[0])
        grid.h[2] = hash(grid[grid.length - 1], true)

        const c1 = []
        const cn = []
        for (let i = 0; i < grid.length; i++) {
            c1.unshift(grid[i][0])
            cn.push(grid[i][grid[i].length - 1])
        }
        grid.h[3] = hash(c1)
        grid.h[1] = hash(cn)

        grid.rh = grid.h.map(h => reverse(h))
        grid.h.forEach(h => add(m, id, h))
        grid.rh.forEach(h => add(m, 'r' + id, h))
        // console.log(id, grid.h, grid.rh)
    }

    const corners = []
    for (let id in tiles) {
        const grid = tiles[id]
        grid.hm = {} // other ids -> 1
        grid.rhm = {}
        grid.h.forEach(h => Object.keys(m[reverse(h)] || {}).forEach(oid => {
            if (oid.indexOf(id) < 0) grid.hm[oid] = 1
        }))
        grid.rh.forEach(h => Object.keys(m[reverse(h)] || {}).forEach(oid => {
            if (oid.indexOf(id) < 0) grid.rhm[oid] = 1
        }))

        // console.log(id, Object.keys(grid.hm), Object.keys(grid.rhm))
        if (Object.keys(grid.hm).length === 2) {
            corners.push(id)
        }
    }
    console.log(corners)

    let result
    if (part == 1) {
        result = corners.reduce((s, id) => s * (+id), 1)
    } else {
    }
    console.log(result)
}

function hash(list, isr) {
    const h = list.reduce((s, ch, i) => ch === '#' ? (s | 1 << i) : s, 0)
    return isr ? reverse(h) : h
}
function reverse(h) {
    const str = h.toString(2).padStart(10, '0').split('').reverse().join('')
    return parseInt(str, 2)
}
function add(map, id, h) {
    map[h] = map[h] || {}
    map[h][id] = 1
}
