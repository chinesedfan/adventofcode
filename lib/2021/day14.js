module.exports = function(part, data) {
    const lines = data.split('\n')
    const map = {}
    for (let i = 2; i < lines.length; i++) {
        const [a, b] = lines[i].split(' -> ')
        map[a] = b
    }
    const now = lines[0]
    const count = [null, f1, f2][part](now, map)

    let min = Infinity
    let max = -Infinity
    for (let k in count) {
        if (min > count[k]) min = count[k]
        if (max < count[k]) max = count[k]
    }
    console.log(max - min)
}

function f1(now, map) {
    let round = 10
    while (round--) {
        const next = [now[0]]
        for (let i = 1; i < now.length; i++) {
            const k = now[i - 1] + now[i]
            if (map[k]) next.push(map[k])
            next.push(now[i])
        }
        now = next
    }
    const count = {}
    for (let i = 0; i < now.length; i++) {
        const ch = now[i]
        count[ch] = (count[ch] || 0) + 1
    }
    return count
}

function f2(now, map) {
    let ks = {}
    for (let i = 1; i < now.length; i++) {
        const k = now[i - 1] + now[i]
        ks[k] = (ks[k] || 0) + 1
    }
    let round = 40
    let first = now.slice(0, 2)
    while (round--) {
        const next = {}
        let nfirst = first
        for (let k in ks) {
            if (map[k]) {
                const k1 = k[0] + map[k]
                const k2 = map[k] + k[1]
                next[k1] = (next[k1] || 0) + ks[k]
                next[k2] = (next[k2] || 0) + ks[k]
                if (k === first) {
                    nfirst = k1
                }
            } else {
                next[k] = (next[k] || 0) + ks[k]
            }
        }
        //
        ks = next
        first = nfirst
    }
    const count = {}
    for (let k in ks) {
        const [a, b] = k
        if (k === first) {
            count[a] = (count[a] || 0) + ks[k]
        }
        count[b] = (count[b] || 0) + ks[k]
    }
    return count
}
