module.exports = function(part, data) {
    let lines = data.split('\n')
    if (part == 2) {
        lines = f2(lines)
    }
    const n = lines.length
    const m = lines[0].length
    const dp = Array(n)
    for (let i = 0; i < n; i++) {
        dp[i] = Array(m)
        for (let j = 0; j < m; j++) {
            if (!i && !j) {
                dp[i][j] = 0
                continue
            }
            const x = +lines[i][j]
            dp[i][j] = Math.min(
                i ? dp[i - 1][j] : Infinity,
                j ? dp[i][j - 1] : Infinity,
            ) + x
        }
    }
    console.log(dp[n - 1][m - 1])
}

function f2(lines) {
    const n = lines.length
    const m = lines[0].length
    const final = Array(5 * n).fill(0)
        .map(() => Array(5 * m))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const x = +lines[i][j]
            for (let p = 0; p < 5; p++) {
                for (let q = 0; q < 5; q++) {
                    final[n * p + i][m * q + j] = ((x - 1 + p + q) % 9) + 1
                }
            }
        }
    }
    return final
}
