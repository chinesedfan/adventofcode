module.exports = function(part, data) {
    const lines = data.split('\n')
    const ms = []
    for (let i = 0; i < lines.length;) {
        const monkey = { id: i++ / 7 }
        monkey.ns = lines[i++].split(':')[1].split(',').map(Number)
        monkey.op = lines[i++].split(': ')[1].replace('new =', 'return')
        monkey.op = new Function('old', monkey.op)
        monkey.d = +lines[i++].split('by')[1]
        monkey.toTrue = +lines[i++].split('monkey')[1]
        monkey.toFalse = +lines[i++].split('monkey')[1]
        monkey.inspect = 0
        i++
        ms.push(monkey)
    }

    if (part == 1) {
        helper(ms, 20, 3)
    } else {
        helper(ms, 10000, 1)
    }
}

function helper(ms, limit, div) {
    let r = 0
    while (r < limit) {
        r++
        ms.forEach(monkey => {
            const { ns, op, d, toTrue, toFalse } = monkey
            monkey.inspect += ns.length
            ns.forEach(x => {
                x = Math.floor(op(x) / div)
                const flag = !(x % d)
                const to = flag ? toTrue : toFalse
                ms[to].ns.push(x)
            })
            monkey.ns = []
        })
    }
    console.log(ms)
    const count = ms.map(monkey => monkey.inspect)
        .sort((a, b) => b - a)
    console.log(count[0] * count[1])
}
