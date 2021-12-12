module.exports = function(part, data) {
    const grid = data.split('\n').map(str => str.split('').map(Number))

    if (part == 1) {
        solve1(grid)
    } else {
        solve2(grid)
    }
}

function solve1(grid) {
    let sum = 0
    grid.forEach((row, i) => {
        for (let j = 0; j < row.length; j++) {
            if (isLowPoint(grid, i, j)) sum += grid[i][j] + 1
        }
    })
    console.log(sum)
}

function solve2(grid) {
    const sizes = []
    grid.forEach((row, i) => {
        for (let j = 0; j < row.length; j++) {
            if (isLowPoint(grid, i, j)) sizes.push(bfs(grid, i, j))
        }
    })
    sizes.sort((a, b) => b - a)
    // console.log(sizes)
    console.log(sizes[0] * sizes[1] * sizes[2])
}

function isLowPoint(grid, i, j) {
    return getNbs(grid, i, j).every(([x, y]) => grid[x][y] > grid[i][j])
}
function getNbs(grid, i, j) {
    return [[i, j + 1], [i, j - 1], [i + 1, j], [i - 1, j]].filter(([x, y]) => isOK(grid, x, y))
}
function isOK(grid, i, j) {
    return i >= 0 && i < grid.length
        && j >= 0 && j < grid[i].length
}
function bfs(grid, i, j) {
    const q = [[i, j]]
    const visited = {}
    let size = 0
    while (q.length) {
        const [x, y] = q.shift()
        const k = key(x, y)
        if (visited[k] || grid[x][y] === 9) continue

        let flag = true
        getNbs(grid, x, y).forEach(([nx, ny]) => {
            // same heights won't flow
            if (grid[nx][ny] < grid[x][y] && !visited[key(nx, ny)]) flag = false
        })
        if (!flag) continue

        visited[k] = 1
        size++
        getNbs(grid, x, y).forEach(([nx, ny]) => {
            q.push([nx, ny])
        })
    }
    return size
}
function key(i, j) {
    return i + ',' + j
}
