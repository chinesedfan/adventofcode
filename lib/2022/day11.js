module.exports = function(part, data) {
    const lines = data.split('\n')
    const ms = []
    for (let i = 0; i < lines.length;) {
        const monkey = { id: i++ / 7 }
        monkey.ns = lines[i++].split(':')[1].split(',').map(BigInt)
        monkey.op = lines[i++].split(': ')[1].replace('new =', 'return')
        if (/\d/.test(monkey.op.slice(-1))) {
            // trick for BigInt
            monkey.op += 'n'
        }
        monkey.op = new Function('old', monkey.op)
        monkey.d = BigInt(lines[i++].split('by')[1])
        monkey.toTrue = +lines[i++].split('monkey')[1]
        monkey.toFalse = +lines[i++].split('monkey')[1]
        monkey.inspect = 0
        i++
        ms.push(monkey)
    }

    if (part == 1) {
        f1(ms, 20, 3n)
    } else {
        f2(ms, 10000)
    }
}

function f1(ms, limit, div) {
    let r = 0
    while (r < limit) {
        r++
        ms.forEach(monkey => {
            const { ns, op, d, toTrue, toFalse } = monkey
            monkey.inspect += ns.length
            ns.forEach(x => {
                x = op(x) / div
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

function f2(ms, limit) {
    const ps = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 10000000n]
    ms.forEach(monkey => {
        monkey.ns = monkey.ns.map(x => ps.map(p => x % p))
    })

    let r = 0
    while (r < limit) {
        r++
        ms.forEach(monkey => {
            const { ns, op, d, toTrue, toFalse } = monkey
            monkey.inspect += ns.length
            ns.forEach(rs => {
                rs = rs.map((x, i) => op(x) % ps[i])
                const j = ps.indexOf(d)
                const flag = !rs[j]
                const to = flag ? toTrue : toFalse
                ms[to].ns.push(rs)
            })
            monkey.ns = []
        })
    }
    const count = ms.map(monkey => monkey.inspect)
        .sort((a, b) => b - a)
    console.log(count[0] * count[1])
}
