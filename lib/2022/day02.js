module.exports = function(part, data) {
    const lines = data.split('\n').map(line => line.split(' '))
    let r = 0
    lines.forEach(([a, b]) => {
        r += [null, compare1, compare2][part](a, b)
    })
    console.log(r)
}
function compare1(a, b) {
    const m1 = {
        A: 'R',
        B: 'P',
        C: 'S'
    }
    const m2 = {
        X: 'R',
        Y: 'P',
        Z: 'S'
    }
    const k = m1[a] + m2[b]
    let s = 'RPS'.indexOf(m2[b]) + 1
    if (['RP', 'PS', 'SR'].indexOf(k) >= 0) {
        // win
        return s + 6
    } else if (['PR', 'SP', 'RS'].indexOf(k) >= 0) {
        // lose
        return s
    } else {
        return s + 3
    }
}
function compare2(a, b) {
    const m1 = {
        A: 'R',
        B: 'P',
        C: 'S'
    }
    a = m1[a]

    let p, s
    if (b === 'Z') {
        // win
        p = a === 'R' ? 'P' : (a === 'P' ? 'S' : 'R')
        s = 6
    } else if (b === 'X') {
        // lose
        p = a === 'R' ? 'S' : (a === 'P' ? 'R' : 'P')
        s = 0
    } else {
        p = a
        s = 3
    }
    return s + 'RPS'.indexOf(p) + 1
}
