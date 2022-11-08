module.exports = function(part, data) {
    const s = data.split('').map(ch => {
        let s = parseInt(ch, 16).toString(2)
        return Array(4 - s.length).fill(0).join('') + s
    }).join('')
    let p = 0
    let totalVersion = 0
    while (p < s.length) {
        console.log(JSON.stringify(parsePackage(s)))
        console.log('total version =', totalVersion)
    }

    function parsePackage() {
        const v = parseInt(s.slice(p, p + 3), 2)
        p += 3
        const t = parseInt(s.slice(p, p + 3), 2)
        p += 3
        //
        let x = t === 4 ? parseNumber() : parseOperator().map(x => x[2])
        switch (t) {
        case 0: // sum
            x = x.reduce((s, x) => s + x, 0)
            break
        case 1: // product
            x = x.reduce((s, x) => s * x, 1)
            break
        case 2: // min
            x = Math.min(...x)
            break
        case 3: // max
            x = Math.max(...x)
            break
        case 4: // number
            break
        case 5: // greater
            x = x[0] > x[1] ? 1 : 0
            break
        case 6: // less
            x = x[0] < x[1] ? 1 : 0
            break
        case 7: // equal
            x = x[0] === x[1] ? 1 : 0
            break
        }
        //
        totalVersion += v
        return [v, t, x]
    }

    function parseOperator() {
        const b = s[p++]
        const ns = []
        if (b === '0') {
            const len = 15
            const l = parseInt(s.slice(p, p + len), 2)
            p += len
            const limit = p + l
            while (p < limit) {
                const n = parsePackage()
                ns.push(n)
            }
        } else {
            const len = 11
            let count = parseInt(s.slice(p, p + len), 2)
            p += len
            while (count--) {
                const n = parsePackage()
                ns.push(n)
            }
        }
        return ns
    }
    function parseNumber() {
        const n = []
        while (1) {
            const more = s[p++] === '1'
            n.push(s.slice(p, p + 4))
            p += 4
            if (!more) break
        }
        return parseInt(n.join(''), 2)
    }
}
