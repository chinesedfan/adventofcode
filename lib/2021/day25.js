module.exports = function(part, data) {
    const lines = data.split('\n')
    const n = lines.length
    const m = lines[0].length

    let map = {}
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (lines[i][j] === '>' || lines[i][j] === 'v') {
                map[hash(i, j)] = [lines[i][j], i, j]
            }
        }
    }

    let round = 0
    while (1) {
        let move = 0
        let after = {}
        for (let h in map) {
            let [ch, i, j] = map[h]
            if (ch === '>') {
                if (++j === m) j = 0
                const nh = hash(i, j)
                if (!map[nh]) {
                    move = 1
                    after[nh] = [ch, i, j]
                    continue
                }
            }

            after[h] = map[h]
        }
        map = after

        after = {}
        for (let h in map) {
            let [ch, i, j] = map[h]
            if (ch === 'v') {
                if (++i === n) i = 0
                const nh = hash(i, j)
                if (!map[nh]) {
                    move = 1
                    after[nh] = [ch, i, j]
                    continue
                }
            }

            after[h] = map[h]
        }
        map = after

        round++
        if (!move) break
    }
    console.log(round)
}

function hash(i, j) {
    return i + ',' + j
}
