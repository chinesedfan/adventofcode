module.exports = function(part, data) {
    const lines = data.split('\n')
    let l = 0
    while (lines[l]) l++

    const folds = lines.slice(l + 1)
        .map(str => {
            const [a, b] = str.split('=')
            return [a[a.length - 1], +b]
        })

    let map = lines.slice(0, l)
        .reduce((o, str) => {
            o[str] = 1
            return o
        }, {})
    for (let i = 0; i < folds.length; i++) {
        map = doFold(map, folds[i])
        console.log(Object.keys(map).length)
    }

    let mx = 0
    let my = 0
    for (let str in map) {
        const [x, y] = str.split(',').map(Number)
        mx = Math.max(mx, x)
        my = Math.max(my, y)
    }
    const output = []
    for (let i = 0; i <= mx; i++) {
        output[i] = []
        for (let j = 0; j <= my; j++) {
            output[i][j] = map[key(i, j)] ? '#' : '.'
        }
        output[i].reverse() // reverse for easy to read
        output[i] = output[i].join('')
    }
    console.log(output.join('\n'))
}
function doFold(map, [xory, val]) {
    const after = {}
    for (let str in map) {
        const [x, y] = str.split(',').map(Number)
        if (xory === 'x') {
            if (x === val) continue
            const nx = x > val ? 2 * val - x : x
            after[key(nx, y)] = 1
        } else {
            if (y === val) continue
            const ny = y > val ? 2 * val - y : y
            after[key(x, ny)] = 1
        }
    }
    return after
}

function key(x, y) {
    return x + ',' + y
}
