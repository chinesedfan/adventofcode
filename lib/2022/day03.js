module.exports = function(part, data) {
    const lines = data.split('\n')
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    let r = 0
    lines.forEach(s => {
        const m1 = {}
        const m2 = {}
        for (let i = 0; i < s.length; i++) {
            const m = i < s.length / 2 ? m1 : m2
            m[s[i]] = 1
        }
        for (let ch in m1) {
            if (m2[ch]) {
                const code = ch.charCodeAt(0)
                if (code >= 'a'.charCodeAt(0)) {
                    r += code - 'a'.charCodeAt(0) + 1
                } else {
                    r += code - 'A'.charCodeAt(0) + 27
                }
                break
            }
        }
    })
    console.log(r)
}

function f2(lines) {
    let sum = 0
    let ms
    lines.forEach((s, j) => {
        const r = j % 3
        if (!r) {
            ms = [{}, {}, {}]
        }
        for (let i = 0; i < s.length; i++) {
            ms[r][s[i]] = 1
        }
        if (r < 2) return

        for (let ch in ms[0]) {
            if (ms[1][ch] && ms[2][ch]) {
                const code = ch.charCodeAt(0)
                if (code >= 'a'.charCodeAt(0)) {
                    sum += code - 'a'.charCodeAt(0) + 1
                } else {
                    sum += code - 'A'.charCodeAt(0) + 27
                }
                break
            }
        }
    })
    console.log(sum)
}
