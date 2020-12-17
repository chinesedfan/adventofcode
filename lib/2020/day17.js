module.exports = function(part, data) {
    const lines = data.split('\n')

    let grid = {}
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            grid[key(i, j, 0)] = lines[i][j]
        }
    }

    let min = [-1, -1, -1] // include
    let max = [lines.length, lines.length, 1] // include

    let result
    if (part == 1) {
        let round = 6
        while (round--) {
            grid = update(grid, min, max)
        }
        result = count(grid, min, max)
    } else {
    }
    console.log(result)
}

function update(grid, min, max) {
    const ngrid = {}
    for (let i = min[0]; i <= max[0]; i++) {
        for (let j = min[1]; j <= max[1]; j++) {
            for (let k = min[2]; k <= max[2]; k++) {
                const state = grid[key(i, j, k)]
                const adj = getAdj(grid, i, j, k)
                if (state === '#') {
                    ngrid[key(i, j, k)] = (adj === 2 || adj === 3) ? '#' : '.'
                } else {
                    ngrid[key(i, j, k)] = adj === 3 ? '#' : '.'
                }
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        min[i]--
        max[i]++
    }
    return ngrid
}
function getAdj(grid, i, j, k) {
    const c = count(grid, [i - 1, j - 1, k - 1], [i + 1, j + 1, k + 1])
    return grid[key(i, j, k)] === '#' ? c - 1 : c
}
function count(grid, rmin, rmax) {
    const r = {
        c: 0
    }
    for (let i = rmin[0]; i <= rmax[0]; i++) {
        for (let j = rmin[1]; j <= rmax[1]; j++) {
            for (let k = rmin[2]; k <= rmax[2]; k++) {
                check(r, grid, i, j, k)
            }
        }
    }
    return r.c
}

function check(r, grid, i, j, k) {
    if (grid[key(i, j, k)] === '#') {
        r.c++
    }
}
function key(i, j, k) {
    return [i, j, k].join('#')
}
