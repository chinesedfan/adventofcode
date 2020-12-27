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
    const map = {}
    tiles.forEach(({r, c}) => {
        map[key(r, c)] = (map[key(r, c)] || 0) + 1
    })

    let result
    if (part == 1) {
        result = 0
        for (let k in map) {
            if (map[k] & 1) result++
        }
    } else {
        let days = 100
        while (days--) update(map)

        result = 0
        for (let k in map) {
            if (map[k] & 1) result++
        }
    }
    console.log(result)
}

function update(map) {
    const cloned = {...map}
    Object.keys(map).forEach(k => {
        const [i, j] = k.split('#').map(x => +x)
        once(k)
        once(key(i, j - 1))
        once(key(i, j + 1))
        once(key(i - 1, j))
        once(key(i + 1, j))
        once(key(i - 1, j - 1))
        once(key(i + 1, j + 1))
    })

    function once(k) {
        const adj = getAdj(cloned, k)
        if ((map[k] & 1) && (adj === 0 || adj > 2)) {
            // black -> white
            map[k] = 0
        } else if (!(map[k] & 1) && adj === 2) {
            // white -> black
            map[k] = 1
        }
    }
}
function getAdj(grid, k) {
    const [i, j] = k.split('#').map(x => +x)
    const r = {
        c: 0
    }
    check(r, grid, i, j - 1)
    check(r, grid, i, j + 1)
    check(r, grid, i - 1, j - 1)
    check(r, grid, i - 1, j)
    check(r, grid, i + 1, j)
    check(r, grid, i + 1, j + 1)
    return r.c
}
function check(r, grid, i, j) {
    const k = key(i, j)
    if (grid[k] & 1) r.c++
}
function key(r, c) {
    return r + '#' + c
}
