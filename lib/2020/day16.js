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
            const [_, name, min1, max1, min2, max2] = /(\w+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(line)
            return { name, min1: +min1, max1: +max1, min2: +min2, max2: +max2 }
        })
    const mine = lines[idx1 + 1].split(',').map(x => +x)
    const others = lines.slice(idx2 + 1)
        .map(line => line.split(',').map(x => +x))

    let result
    if (part == 1) {
        result = 0
        others.forEach(arr => {
            arr.forEach(x => {
                const valid = rules.some(({min1, max1, min2, max2}) =>
                    (x >= min1 && x <= max1) || (x >= min2 && x <= max2))
                if (!valid) result += x
            })
        })
    } else {
    }
    console.log(result)
}
