module.exports = function(part, data) {
    const lines = data.split('\n')
        .map(line => line.split(',').map(Number))
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    const map = {}
    let count = 0
    for (let [x, y, z] of lines) {
        check(x - 1, y, z)
        check(x + 1, y, z)
        check(x, y - 1, z)
        check(x, y + 1, z)
        check(x, y, z - 1)
        check(x, y, z + 1)
        map[hash(x, y, z)] = 1
    }
    console.log(count)

    function check(x, y, z) {
        const h = hash(x, y, z)
        if (map[h]) {
            count--
        } else {
            count++
        }
    }
}

function f2(lines) {
}

function hash(x, y, z) {
    const n = 30
    return x * n * n + y * n + z
}
