module.exports = function(part, data) {
    const lines = data.split('\n')

    let grid = {}
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const k = part == 1 ? key(i, j, 0) : key(i, j, 0, 0)
            grid[k] = lines[i][j]
        }
    }

    let min = part == 1 ? [-1, -1, -1] : [-1, -1, -1, -1] // include
    let max = part == 1 ? [lines.length, lines.length, 1] : [lines.length, lines.length, 1, 1] // include

    let round = 6
    while (round--) {
        const result = count(grid, min, max)
        console.log(result)

        grid = update(grid, min, max)
    }
    const result = count(grid, min, max)
    console.log(result)
}

function update(grid, min, max) {
    const ngrid = {}
    const vs = [...min]
    do {
        const state = grid[key(...vs)]
        const adj = getAdj(grid, ...vs)
        if (state === '#') {
            ngrid[key(...vs)] = (adj === 2 || adj === 3) ? '#' : '.'
        } else {
            ngrid[key(...vs)] = adj === 3 ? '#' : '.'
        }
    } while (next(vs, min, max, 0))

    for (let i = 0; i < vs.length; i++) {
        min[i]--
        max[i]++
    }
    return ngrid
}
function next(vs, min, max, cur) {
    vs[cur]++
    if (vs[cur] > max[cur]) {
        if (cur === min.length - 1) return false

        vs[cur] = min[cur]
        return next(vs, min, max, cur + 1)
    }
    return true
}
function getAdj(grid, ...vs) {
    const c = count(grid, vs.map(x => x - 1), vs.map(x => x + 1))
    return grid[key(...vs)] === '#' ? c - 1 : c
}
function count(grid, rmin, rmax) {
    const r = {
        c: 0
    }
    const vs = [...rmin]
    do {
        check(r, grid, ...vs)
    } while (next(vs, rmin, rmax, 0))
    return r.c
}

function check(r, grid, ...vs) {
    if (grid[key(...vs)] === '#') {
        r.c++
    }
}
function key(...vs) {
    return vs.join('#')
}
