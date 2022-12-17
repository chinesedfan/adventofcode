module.exports = function(part, data) {
    const lines = data.split('\n')
    let src, dst
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split('')
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'S') {
                src = [i, j]
                lines[i][j] = 'a'
            }
            if (lines[i][j] === 'E') {
                dst = [i, j]
                lines[i][j] = 'z'
            }
        }
    }
    if (part == 1) {
        const r = bfs(lines, src,
            (a, b) => b <= a + 1, (x, y) => x === dst[0] && y === dst[1])
        console.log(r)
    } else {
        const r = bfs(lines, dst,
            (b, a) => b <= a + 1, (x, y) => lines[x][y] === 'a')
        console.log(r)
    }
}

function bfs(lines, r, fok, fend) {
    const ds = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    let q = []
    q.push(r)
    const visited = {}
    visited[hash(r[0], r[1])] = 0

    let d = 1
    while (q.length) {
        const nq = []
        for (let [x, y] of q) {
            const a = lines[x][y].charCodeAt(0)
            for (let i = 0; i < ds.length; i++) {
                const [dx, dy] = ds[i]
                const nx = x + dx
                const ny = y + dy
                if (nx < 0 || nx >= lines.length
                    || ny < 0 || ny >= lines[0].length) continue
                const b = lines[nx][ny].charCodeAt(0)
                if (!fok(a, b)) continue

                const h = hash(nx, ny)
                if (fend(nx, ny)) return d
                if (h in visited) continue
                visited[h] = d
                nq.push([nx, ny])
            }
        }
        q = nq
        d++
    }
    return -1
}
function hash(x, y) {
    return x + ',' + y
}
