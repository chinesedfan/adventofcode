module.exports = function(part, data) {
    const lines = data.split('\n')

    const mem = {}
    let mask

    let result
    if (part == 1) {
        lines.forEach(line => {
            if (line.indexOf('mask') === 0) {
                mask = line.split(' = ')[1]
            } else if (line.indexOf('mem') === 0) {
                const [addr, value] = line.slice(4).split('] = ')

                const bits = (+value).toString(2)
                const nbits = []
                for (let i = 0; i < mask.length; i++) {
                    const v = mask[mask.length - 1 - i] !== 'X'
                        ? mask[mask.length - 1 - i]
                        : (i < bits.length ? bits[bits.length - 1 - i] : 0)
                    nbits.unshift(v)
                }
                mem[addr] = nbits.join('')
            }
        })

        let sum = 0
        for (let addr in mem) {
            sum += parseInt(mem[addr], 2)
        }
        result = sum
    } else {
    }
    console.log(result)
}
