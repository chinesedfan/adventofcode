module.exports = function(part, data) {
    const lines = data.split('\n').map(str => {
        const [a, b] = str.split(' -> ')
        return [...a.split(','), ...b.split(',')]
    })

    let count = 0
    const visited = {}
    lines.forEach(line => {
        let [x1, y1, x2, y2] = line.map(Number)
        if (x1 === x2) {
            if (y1 > y2) [y1, y2] = [y2, y1]
            for (let i = y1; i <= y2; i++) {
                const k = key(x1, i)
                visited[k] = (visited[k] || 0) + 1
                if (visited[k] === 2) count++
            }
        }
        if (y1 === y2) {
            if (x1 > x2) [x1, x2] = [x2, x1]
            for (let i = x1; i <= x2; i++) {
                const k = key(i, y1)
                visited[k] = (visited[k] || 0) + 1
                if (visited[k] === 2) count++
            }
        }
        if (part == 2 && Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
            const dx = x1 > x2 ? -1 : 1
            const dy = y1 > y2 ? -1 : 1
            let y = y1
            for (let i = x1; x1 > x2 ? i >= x2 : i <= x2; i += dx) {
                const k = key(i, y)
                y += dy
                visited[k] = (visited[k] || 0) + 1
                if (visited[k] === 2) count++
            }
        }
    })
    console.log(count)
}
function key(a, b) {
    return [a, b].join(',')
}
