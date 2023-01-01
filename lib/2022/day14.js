module.exports = function(part, data) {
    const lines = data.split('\n')

    const n = 600
    const m = 600
    const grid = Array(n).fill(0)
        .map(() => Array(m).fill('.'))
    let maxr = 0, minc, maxc
    lines.forEach(line => {
        const points = line.split(' -> ')
            .map(x => x.split(',').map(Number))
        maxr = Math.max(maxr, points[0][1])
        for (let i = 1; i < points.length; i++) {
            let [c1, r1] = points[i - 1]
            let [c2, r2] = points[i]
            if (r1 === r2) {
                if (c1 > c2) [c1, c2] = [c2, c1]
                for (let j = c1; j <= c2; j++) {
                    grid[r1][j] = '#'
                }
            } else {
                if (r1 > r2) [r1, r2] = [r2, r1]
                for (let j = r1; j <= r2; j++) {
                    grid[j][c1] = '#'
                }
            }
            maxr = Math.max(maxr, r2)
        }
    })

    if (part == 1) {
        maxr = n - 1
        minc = 0
        maxc = m - 1
    } else {
        maxr += 2
        // enough large
        minc = -1000
        maxc = 1000
        for (let i = minc; i <= maxc; i++) grid[maxr][i] = '#'
    }

    const start = [0, 500]
    grid[start[0]][start[1]] = '+'

    let drop = 0
    while (1) {
        let [row, col] = start
        let stop = 0
        while (grid[start[0]][start[1]] === '+') {
            while (ok(row + 1, col, '.')) row++
            if (row === maxr) break

            if (ok(row + 1, col - 1)) {
                row++
                col--
            } else if (ok(row + 1, col + 1)) {
                row++
                col++
            } else {
                stop = 1
                grid[row][col] = 'o'
                break
            }
            if (row === maxr) break
        }
        if (!stop) break
        drop++
    }
    // console.log(grid.map(x => x.join('')).join('\n'))
    console.log(drop)

    function ok(i, j, ch) {
        return i >= 0 && i < n
            && j >= minc && j <= maxc
            && (grid[i][j] === '.' || !grid[i][j])
    }
}
