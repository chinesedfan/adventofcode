module.exports = function(part, data) {
    const lines = data.split('\n')
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    let x = 1
    let sum = 0
    let cycle = 0
    lines.forEach(str => {
        if (str === 'noop') {
            tick()
        } else {
            tick()
            tick()
            const a = str.split(' ')[1]
            x += +a
        }
    })
    console.log(sum)

    function tick() {
        cycle++
        if ([20, 60, 100, 140, 180, 220].indexOf(cycle) >= 0) {
            sum += cycle * x
        }
    }
}

function f2(lines) {
    let x = 1
    let cycle = 0
    const ans = Array(6).fill(0)
        .map(() => Array(40).fill('.'))
    lines.forEach(str => {
        if (str === 'noop') {
            tick()
        } else {
            tick()
            tick()
            const a = str.split(' ')[1]
            x += +a
        }
    })
    console.log(ans.map(s => s.join('')).join('\n'))

    function tick() {
        const row = Math.floor(cycle / 40)
        const col = cycle % 40
        if (row < 6 && x - 1 <= col && col <= x + 1) {
            ans[row][col] = '#'
        }
        cycle++
    }
}
