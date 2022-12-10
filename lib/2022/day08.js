module.exports = function(part, data) {
    const lines = data.split('\n')
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    const seen = Array(lines.length)
    let prev
    for (let i = 0; i < lines.length; i++) {
        seen[i] = Array(lines[i].length)
        prev = -1
        for (let j = 0; j < lines[i].length; j++) {
            const x = +lines[i][j]
            if (x > prev) {
                seen[i][j] = 1
                prev = x
            }
        }
        prev = -1
        for (let j = lines[i].length - 1; j >= 0; j--) {
            const x = +lines[i][j]
            if (x > prev) {
                seen[i][j] = 1
                prev = x
            }
        }
    }
    for (let j = 0; j < lines[0].length; j++) {
        prev = -1
        for (let i = 0; i < lines.length; i++) {
            const x = +lines[i][j]
            if (x > prev) {
                seen[i][j] = 1
                prev = x
            }
        }
        prev = -1
        for (let i = lines.length - 1; i >= 0; i--) {
            const x = +lines[i][j]
            if (x > prev) {
                seen[i][j] = 1
                prev = x
            }
        }
    }

    let count = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (seen[i][j]) count++
        }
    }
    console.log(count)
}
function f2(lines) {
    let max = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const a = check(i, j, 0, 1)
            const b = check(i, j, 0, -1)
            const c = check(i, j, 1, 0)
            const d = check(i, j, -1, 0)
            max = Math.max(max, a * b * c * d)
        }
    }
    console.log(max)

    function check(i, j, di, dj) {
        const base = lines[i][j]
        let k = 0
        do {
            i += di
            j += dj
            if (i < 0 || i >= lines.length) break
            if (j < 0 || j >= lines[i].length) break
            k++
            if (lines[i][j] >= base) break
        } while (1)
        return k
    }
}
