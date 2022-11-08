module.exports = function(part, data) {
    let lines = data.split('\n')
    if (part == 2) {
        lines = f2(lines)
    }
    const n = lines.length
    const m = lines[0].length
    dijkstra(n, m, lines)
}
function dijkstra(n, m, lines) {
    const ds = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ]
    // https://github.com/chinesedfan/heap.js/blob/atcoder/lib/heap.js
    const h = new Heap((a, b) => a[0] - b[0])
    h.push([0, 0, 0])
    const visited = {}
    const target = hash(n - 1, m - 1)
    while (h.size()) {
        const [d, r, c] = h.pop()
        const k = hash(r, c)
        if (k === target) {
            console.log(d)
            return
        }
        if (visited[k]) continue
        visited[k] = 1

        ds.forEach(([dr, dc]) => {
            add(d, r + dr, c + dc)
        })
    }
    console.log('not found')

    function hash(i, j) {
        return i * n + j
    }
    function add(d, r, c) {
        if (r < 0 || r >= n || c < 0 || c >= m
            || visited[hash(r, c)]) return
        h.push([d + +lines[r][c], r, c])
    }
}

function f2(lines) {
    const n = lines.length
    const m = lines[0].length
    const final = Array(5 * n).fill(0)
        .map(() => Array(5 * m))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const x = +lines[i][j]
            for (let p = 0; p < 5; p++) {
                for (let q = 0; q < 5; q++) {
                    final[n * p + i][m * q + j] = ((x - 1 + p + q) % 9) + 1
                }
            }
        }
    }
    return final
}
