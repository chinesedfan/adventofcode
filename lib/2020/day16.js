module.exports = function(part, data) {
    const lines = data.split('\n')

    let idx1, idx2
    lines.forEach((line, i) => {
        if (line === 'your ticket:') {
            idx1 = i
        } else if (line === 'nearby tickets:') {
            idx2 = i
        }
    })

    const rules = lines.slice(0, idx1 - 1)
        .map(line => {
            // zone: 36-252 or 275-957
            const [_, name, min1, max1, min2, max2] = /(.+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(line)
            return { name, min1: +min1, max1: +max1, min2: +min2, max2: +max2 }
        })
    const mine = lines[idx1 + 1].split(',').map(x => +x)
    const others = lines.slice(idx2 + 1)
        .map(line => line.split(',').map(x => +x))

    let sum = 0
    const vs = others.filter(arr => {
        return arr.every(x => {
            const valid = rules.some(r => isValid(x, r))
            if (!valid) sum += x
            return valid
        })
    })
    console.log(sum)
    if (part == 1) return

    const all = vs.concat([mine])
    const pos = [] // name, [i1, i2]
    rules.forEach(r => {
        const ps = []
        for (let i = 0; i < mine.length; i++) {
            if (all.every(values => isValid(values[i], r))) {
                ps.push(i)
            }
        }
        pos.push([r.name, ps])
    })
    pos.sort((a, b) => a[1].length - b[1].length)

    const final = [] // name, p
    while (pos.length) {
        const [name, ps] = pos.shift()
        if (ps.length > 1) throw new Error('unconfirm')

        final.push([name, ps[0]])
        pos.forEach(([n, p]) => {
            const idx = p.indexOf(ps[0])
            p.splice(idx, 1)
        })
    }

    const result = final.reduce((s, [name, p]) => name.indexOf('departure') === 0 ? s * mine[p] : s, 1)
    console.log(result)
}

function isValid(x, {min1, max1, min2, max2}) {
    return (x >= min1 && x <= max1) || (x >= min2 && x <= max2)
}
