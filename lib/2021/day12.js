module.exports = function(part, data) {
    const edges = data.split('\n').map(str => str.split('-'))
    const adj = {}
    edges.forEach(([a, b]) => {
        adj[a] = adj[a] || []
        adj[b] = adj[b] || []
        adj[a].push(b)
        adj[b].push(a)
    })

    const q = [['start']]
    let ways = 0
    while (q.length) {
        // take a bit long for part 2
        console.log(q.length)
        const path = q.shift()
        const last = path[path.length - 1]
        if (last === 'end') {
            // console.log(path.join(','))
            ways++
            continue
        }

        adj[last].forEach(v => {
            if (v === 'start') return
            if (/[a-z]/.test(v[0])) {
                const count = path.filter(x => x === v).length
                if (part == 1) {
                    if (count >= 1) return
                } else {
                    let has = false
                    const map = path.reduce((o, x) => {
                        if (/[a-z]/.test(x) && o[x]) has = true
                        o[x] = 1
                        return o
                    }, {})
                    if (has) {
                        if (count >= 1) return
                    } else {
                        if (count >= 2) return
                    }
                }
            }
            q.push(path.concat([v]))
        })
    }
    console.log(ways)
}
