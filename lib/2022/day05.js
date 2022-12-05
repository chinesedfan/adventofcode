module.exports = function(part, data) {
    const lines = data.split('\n')
    const n = 9

    let begin = 0
    const moves = []
    const ss = Array(n).fill(0)
        .map(() => [])
    for (let line of lines) {
        if (begin) {
            const [_, k, i, j] = /move (\d+) from (\d+) to (\d+)/.exec(line)
            moves.push([+k, +i, +j])
        } else if (!line) {
            begin = 1
        } else {
            for (let i = 0; i < n; i++) {
                const ch = line[4 * i + 1]
                if (/[A-Z]/.test(ch)) ss[i].unshift(ch)
            }
        }
    }

    for (let [k, i, j] of moves) {
        i--; j--
        if (part == 1) {
            ss[j] = ss[j].concat(ss[i].slice(-k).reverse())
        } else {
            ss[j] = ss[j].concat(ss[i].slice(-k))
        }
        ss[i] = ss[i].slice(0, ss[i].length - k)
    }
    const str = ss.map(x => x[x.length - 1]).join('')
    console.log(str)
}
