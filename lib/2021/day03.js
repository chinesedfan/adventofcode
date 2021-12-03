module.exports = function(part, data) {
    const bs = data.split('\n')
    if (part == 1) {
        let gamma = 0
        let epsilon = 0
        const bits = Array(bs[0].length).fill(0)
        bs.forEach((b, i) => {
            for (let j = 0; j < b.length; j++) {
                if (b[j] === '1') bits[j]++
                if (i === bs.length - 1) {
                    const mask = 1 << (b.length - 1 - j)
                    if (bits[j] > bs.length / 2) {
                        gamma |= mask
                    } else {
                        epsilon |= mask
                    }
                }
            }
        })
        console.log(gamma * epsilon)
    } else {
        let gamma = bs
        let epsilon = bs
        for (let j = 0; j < bs[0].length; j++) {
            if (gamma.length > 1) {
                gamma = filter(gamma, j, '1')
            }
            if (epsilon.length > 1) {
                epsilon = filter(epsilon, j, '0')
            }
        }
        console.log(parseInt(gamma[0], 2) * parseInt(epsilon[0], 2))
    }
}

function filter(bs, idx, prefer) {
    const b0 = []
    const b1 = []
    bs.forEach(b => {
        if (b[idx] === '1') {
            b1.push(b)
        } else {
            b0.push(b)
        }
    })
    if (prefer === '1') {
        return b1.length >= b0.length ? b1 : b0
    } else {
        return b0.length <= b1.length ? b0 : b1
    }
}
