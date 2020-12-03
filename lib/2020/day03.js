module.exports = function(part, data) {
    const dots = data.split('\n')

    let result
    if (part == 1) {
        result = count(dots, 1, 3)
    } else {
        result = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
            .map(([dc, dr]) => count(dots, dr, dc))
            .reduce((p, x) => p * x)
    }
    console.log(result)
}

function count(dots, dr, dc) {
    let r = 0
    let c = 0

    let result = 0
    while (r < dots.length) {
        if (dots[r][c] === '#') result++

        r += dr
        c = (c + dc) % dots[0].length
    }
    return result
}