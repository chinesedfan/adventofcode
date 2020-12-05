module.exports = function(part, data) {
    const lines = data.split('\n')

    let result
    if (part == 1) {
        const ids = lines.map(line => findSeat(line))
            .map(([r, c]) => r * 8 + c)
        result = Math.max(...ids)
    } else {
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
