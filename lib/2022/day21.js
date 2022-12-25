module.exports = function(part, data) {
    const ms = {}
    data.split('\n').forEach(line => {
        const [k, v] = line.split(': ')
        ms[k] = v.split(' ')
    })

    ;[null, f1, f2][part](ms)
}

function f1(ms) {
    const r = dfs(ms, 'root')
    console.log(r)
}
function f2(ms) {
    // play to find it is monotonic
    // for my input, the larger `i` makes `a` smaller, and `b` is fixed

    // for (let i = 1; i <= 20; i++) {
    //     ms.humn = [i + 3 * 1e12]
    //     const a = dfs(ms, ms.root[0])
    //     const b = dfs(ms, ms.root[2])
    //     console.log(a, b)
    //     if (a === b) {
    //         console.log(i)
    //         break
    //     } else if (!(i % 1e4)) {
    //         console.log('i=' + i)
    //     }
    // }
    const b = dfs(ms, ms.root[2])
    const r = binarySearch(1, 4e12, i => {
        ms.humn = [i]
        const a = dfs(ms, ms.root[0])
        return a >= b
    })
    console.log(r)
}

function dfs(ms, r) {
    const tokens = ms[r]
    if (tokens.length === 1) {
        return +tokens[0]
    } else {
        const [a, op, b] = tokens
        if (op === '+') {
            return dfs(ms, a) + dfs(ms, b)
        } else if (op === '-') {
            return dfs(ms, a) - dfs(ms, b)
        } else if (op === '*') {
            return dfs(ms, a) * dfs(ms, b)
        } else if (op === '/') {
            return dfs(ms, a) / dfs(ms, b)
        }
    }
}

function binarySearch(l, r, fn) {
    while (l <= r) {
        const m = Math.floor((l + r) / 2)
        if (fn(m)) {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return r
}
