module.exports = function(part, data) {
    const lines = data.split('\n')
    const path = lines.pop()
    lines.pop()
    const n = lines.length
    let m = lines[0].length

    const rrange = Array(n)
    for (let r = 0; r < n; r++) {
        m = Math.max(m, lines[r].length)

        const s = lines[r]
        let i = 0
        while (!(s[i] === '.' || s[i] === '#')) i++
        let j = i
        while (j < m
            && (s[j] === '.' || s[j] === '#')) j++
        rrange[r] = [i, j - 1]
    }

    const crange = Array(n)
    for (let c = 0; c < m; c++) {
        let i = 0
        while (!(lines[i][c] === '.' || lines[i][c] === '#')) i++
        let j = i
        while (j < n
            && (lines[j][c] === '.' || lines[j][c] === '#')) j++
        crange[c] = [i, j - 1]
    }

    ;[null, f1, f2][part](lines, path, rrange, crange)
}

function f1(lines, path, rrange, crange) {
    const ds = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ]

    let i = 0
    let di = 0
    let row = 0
    let col = rrange[row][0]
    while (i < path.length) {
        const ch = path[i]
        if (ch === 'L') {
            if (--di < 0) di = 3
            i++
        } else if (ch === 'R') {
            if (++di >= 4) di = 0
            i++
        } else {
            let d = ch
            while (/[0-9]/.test(path[++i])) d += path[i]
            move(+d)
            console.log(row + 1, col + 1)
        }
    }
    row++
    col++
    console.log(1e3 * row + 4 * col + di)

    function move(d) {
        console.log('move', di, d)
        const [dr, dc] = ds[di]
        while (d--) {
            let nr = row + dr
            let nc = col + dc
            const [rmin, rmax] = crange[col]
            const [cmin, cmax] = rrange[row]
            if (nr < rmin) nr = rmax
            if (nr > rmax) nr = rmin
            if (nc < cmin) nc = cmax
            if (nc > cmax) nc = cmin

            if (lines[nr][nc] === '#') break
            row = nr
            col = nc
        }
    }
}

function f2(lines, path, rrange, crange) {
}
