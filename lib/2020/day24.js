module.exports = function(part, data) {
    const tiles = data.split('\n').map(line => {
        let i = 0
        let r = 0
        let c = 0
        while (i < line.length) {
            const ch = line[i]
            if (ch === 'e') {
                c++
                i++
            } else if (ch === 'w') {
                c--
                i++
            } else {
                switch (line.slice(i, i + 2)) {
                case 'nw': r--; c--; break
                case 'ne': r--; break
                case 'sw': r++; break
                case 'se': r++; c++; break
                }
                i += 2
            }
        }
        return {r, c}
    })

    let result
    if (part == 1) {
        const map = {}
        tiles.forEach(({r, c}) => {
            map[key(r, c)] = (map[key(r, c)] || 0) + 1
        })

        result = 0
        for (let k in map) {
            if (map[k] & 1) result++
        }
    } else {
    }
    console.log(result)
}

function key(r, c) {
    return r + '#' + c
}
