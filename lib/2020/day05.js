module.exports = function(part, data) {
    const lines = data.split('\n')
    const seats = lines.map(line => findSeat(line))

    let result
    if (part == 1) {
        const ids = seats
            .map(([r, c]) => r * 8 + c)
        result = Math.max(...ids)
    } else {
        const has = Array(128).fill(0).map(_ => Array(8).fill('.'))
        seats.forEach(([r, c]) => has[r][c] = 1)

        // paste and find the missing one
        // remember the row/col starts from 0
        console.log(has.join('\n'))
    }
    console.log(result)
}

function findSeat(str) {
    let left = 0
    let right = 128
    let row, col
    for (var i = 0; i < str.length; i++) {
        const lower = str[i] === 'F' || str[i] === 'L'
        if (lower) {
            right = (left + right) / 2
        } else {
            left = (left + right) / 2
        }

        if (i === 6) {
            row = lower ? left : right - 1
            left = 0
            right = 8
        } else if (i === str.length - 1) {
            col = lower ? left : right - 1
        }
    }
    return [row, col]
}
