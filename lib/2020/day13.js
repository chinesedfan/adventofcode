module.exports = function(part, data) {
    const start = 1006697
    const msg = '13,x,x,41,x,x,x,x,x,x,x,x,x,641,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,661,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23'
    // const msg = 'x,3,5,x,x,7'
    // const msg = '67,7,59,61'
    // const msg = '1789,37,47,1889'

    let result
    if (part == 1) {
        const buses = msg.split(',')
            .filter(x => x !== 'x')
            .map(x => +x)
        const waits = buses.map(x => ({
            id: x,
            w: Math.ceil(start / x) * x - start
        }))

        let min
        waits.forEach(({id, w}) => {
            if (!min || w < min.w) {
                min = {id, w}
            }
        })
        result = min.id * min.w
    } else {
        const reqs = msg.split(',')
            .map((x, off) => ({id: +x, off}))
            .filter(x => x.id)
            .map(({id, off}) => ({id, off: off % id}))
        const product = reqs.reduce((p, {id}) => p * id, 1)
        const others = reqs.map(({id}) => product / id)
        const inv = reqs.map(({id}, i) => {
            let x = 1
            while ((x * others[i] % id) !== 1) x++
            return x
        })
        const sum = reqs.reduce((s, {id, off}, i) => {
            // s = (s + (id - off) * others[i] * inv[i]) % product
            let times = (id - off) * inv[i]
            while (times--) {
                s = (s + others[i]) % product
            }
            return s
        }, 0)
        result = sum
        console.log(reqs, product, others, inv)
    }
    console.log(result)
}
