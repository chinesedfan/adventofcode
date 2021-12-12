module.exports = function(part, data) {
    const grid = data.split('\n').map(str => str.split('').map(Number))

    let steps = 0
    let count = 0
    while (1) {
        const old = count
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                count += update(grid, i, j)
            }
        }
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === -Infinity) grid[i][j] = 0
            }
        }
        steps++
        if (part == 1) {
            if (steps === 100) {
                console.log(count)
                break
            }
        } else if (count - old === grid.length * grid[0].length) {
            console.log(steps)
            break
        }
        // console.log(grid.map(r => r.join('')).join('\n'))
    }
}

function update(grid, i, j) {
    grid[i][j]++
    if (grid[i][j] <= 9) return 0

    grid[i][j] = -Infinity
    let ans = 1
    getNbs(grid, i, j).forEach(([ni, nj]) => {
        ans += update(grid, ni, nj)
    })
    return ans
}
function getNbs(grid, i, j) {
    return [
        [i, j + 1], [i, j - 1], [i + 1, j], [i - 1, j],
        [i + 1, j + 1], [i - 1, j + 1], [i + 1, j - 1], [i - 1, j - 1]
    ].filter(([x, y]) => isOK(grid, x, y))
}
function isOK(grid, i, j) {
    return i >= 0 && i < grid.length
        && j >= 0 && j < grid[i].length
}
