module.exports = function(part, data) {
    const lines = data.split('\n')
        .map(line => line.split(',').map(x => x.split('-').map(Number)))
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    let r = 0
    lines.forEach(([[a, b], [c, d]]) => {
        if (a <= c && b >= d
            || c <= a && d >= b) r++
    })
    console.log(r)
}

function f2(lines) {
    let r = 0
    lines.forEach(([[a, b], [c, d]]) => {
        if (!(b < c || d < a)) r++
    })
    console.log(r)
}
