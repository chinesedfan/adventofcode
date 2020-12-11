module.exports = function(part, data) {
    let lines = data.split('\n')

    do {
        const [changed, occupied, next] = update(lines, part)
        console.log(changed, occupied)
        if (!changed) {
            break
        }
        lines = next
    } while (1)
}

function update(grid, part) {
    let changed = 0
    let occupied = 0
    const next = []
    for (let i = 0; i < grid.length; i++) {
        next[i] = []
        for (let j = 0; j < grid[i].length; j++) {
            const c = part == 1 ? getAdj(grid, i, j) : getSeen(grid, i, j)
            if (grid[i][j] === '#' && c >= (part == 1 ? 4 : 5)) {
                next[i][j] = 'L'
                changed++
            } else if (grid[i][j] === 'L' && c === 0) {
                next[i][j] = '#'
                changed++
            } else {
                next[i][j] = grid[i][j]
            }

            if (next[i][j] === '#') occupied++
        }
    }
    return [changed, occupied, next]
}
function getAdj(grid, i, j) {
    const r = {
        c: 0
    }
    check(r, grid, i, j - 1)
    check(r, grid, i, j + 1)
    check(r, grid, i - 1, j - 1)
    check(r, grid, i - 1, j)
    check(r, grid, i - 1, j + 1)
    check(r, grid, i + 1, j - 1)
    check(r, grid, i + 1, j)
    check(r, grid, i + 1, j + 1)
    return r.c
}
function check(r, grid, i, j) {
    if (i >= 0 && i < grid.length
        && j >= 0 && j < grid[i].length
        && grid[i][j] === '#') r.c++
}

function getSeen(grid, i, j) {
    const r = {
        c: 0
    }
    check2(r, grid, i, j, 0, -1)
    check2(r, grid, i, j, 0, 1)
    check2(r, grid, i, j, -1, -1)
    check2(r, grid, i, j, -1, 0)
    check2(r, grid, i, j, -1, 1)
    check2(r, grid, i, j, 1, -1)
    check2(r, grid, i, j, 1, 0)
    check2(r, grid, i, j, 1, 1)
    return r.c
}
function check2(r, grid, i, j, di, dj) {
    i += di
    j += dj
    while (i >= 0 && i < grid.length
            && j >= 0 && j < grid[i].length) {
        if (grid[i][j] === '#') {
            r.c++
            break
        } else if (grid[i][j] === 'L') {
            break
        }
        i += di
        j += dj
    }
}
