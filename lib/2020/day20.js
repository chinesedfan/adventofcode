const G_SIZE = 10

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
        ;[grid.rh[1], grid.rh[3]] = [grid.rh[3], grid.rh[1]] // take care of the mirror

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
        const gs = [] // [r][c] -> [id, r, hs]
        const set = new Set() // id -> 1
        const limit = 12 // FIXME: update by yourself

        let id, r, ohs, hs, fn
        for (let row = 0; row < limit; row++) {
            gs[row] = []
            for (let col = 0; col < limit; col++) {
                if (id) {
                    const [isr, pid] = extractId(id)
                    hs = tiles[pid][isr ? 'rh' : 'h']
                    if (col) {
                        fn = (rhs) => isMatch(m, ohs[1], rhs[3])
                    } else {
                        fn = (rhs) => isMatch(m, ohs[2], rhs[0])
                    }
                } else {
                    id = corners[0]
                    hs = tiles[id].h
                    // FIXME: if failed, try this
                    hs = tiles[id].rh
                    id = 'r' + id
                    fn = (rhs) => Object.keys(m[reverse(rhs[0])]).length === 1
                        && Object.keys(m[reverse(rhs[3])]).length === 1
                }

                hs = [...hs]
                r = rotateWhile(hs, fn)
                gs[row][col] = [id, r, hs]

                set.add(id)
                set.add(/r/.test(id) ? id.slice(1) : 'r' + id)

                if (col === limit - 1) {
                    const first = gs[row][0]
                    ohs = first[2]
                    id = findUniqId(set, m, ohs[2], row ? [first[0], gs[row - 1][0][0]] : [first[0]])
                } else {
                    const prev = gs[row][col - 1]
                    ohs = hs
                    id = findUniqId(set, m, hs[1], col ? [id, prev[0]] : [id])
                }
                if (!id && (row < limit - 1 || col < limit - 1)) throw new Error('not found')
            }
        }
        
        const finalGrid = []
        const size = G_SIZE - 2 // remove borders
        for (let row = 0; row < limit; row++) {
            for (let col = 0; col < limit; col++) {
                const [id, r] = gs[row][col]
                const [isr, pid] = extractId(id)
                const grid = transformGrid(tiles[pid], isr, r)

                for (let i = 0; i < size; i++) {
                    finalGrid[row * size + i] = finalGrid[row * size + i] || []
                    for (let j = 0; j < size; j++) {
                        finalGrid[row * size + i][col * size + j] = grid[i + 1][j + 1]
                    }
                }
            }
        }
        result = finalGrid.map(x => x.join('').replace(/\./g, ' ')).join('\n')
    }
    console.log(result)
}

function hash(list, isr) {
    const h = list.reduce((s, ch, i) => ch === '#' ? (s | 1 << i) : s, 0)
    return isr ? reverse(h) : h
}
function reverse(h) {
    const str = h.toString(2).padStart(G_SIZE, '0').split('').reverse().join('')
    return parseInt(str, 2)
}
function add(map, id, h) {
    map[h] = map[h] || {}
    map[h][id] = 1
}

function extractId(id) {
    // means to flip from left to right
    const isr = id[0] === 'r'
    const pid = isr ? id.slice(1) : id
    return [isr, pid]
}
function rotateWhile(hs, fn) {
    let r = 0
    while (!fn(hs)) {
        r++
        if (r >= 4) throw new Error('bad fn')
        hs.unshift(hs.pop()) // mutate `hs`
    }
    return r
}
function findUniqId(s, m, h, excepts) {
    const ids = Object.keys(m[reverse(h)])
        .filter(id => {
            const [isr, pid] = extractId(id)
            return !s.has(id) && excepts.indexOf(pid) < 0 && excepts.indexOf('r' + pid) < 0
        })
    if (ids.length > 1) throw new Error('too many')
    return ids[0]
}
function isMatch(m, h1, h2) {
    return reverse(h1) === h2
}

function transformGrid(grid, isr, r) {
    const finalGrid = Array(G_SIZE).fill(0).map(x => Array(G_SIZE))
    for (let i = 0; i < G_SIZE; i++) {
        for (let j = 0; j < G_SIZE; j++) {
            const val = grid[i][j]
            const oj = j
            j = isr ? G_SIZE - 1 - j : j

            switch (r) {
            case 1:
                finalGrid[j][G_SIZE - 1 - i] = val
                break
            case 2:
                finalGrid[G_SIZE - 1 - i][G_SIZE - 1 - j] = val
                break
            case 3:
                finalGrid[G_SIZE - 1 - j][i] = val
                break
            case 0:
            default:
                finalGrid[i][j] = val
                break
            }
            j = oj // recover
        }
    }
    return finalGrid
}
