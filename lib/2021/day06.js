module.exports = function(part, data) {
    const state = data.split(',').map(Number)

    if (part == 1) {
        solve1(state)
    } else {
        solve2(state)
    }
}

function solve1(state) {
    let k = 80
    while (k--) {
        state.forEach((x, i) => {
            if (state[i]) {
                state[i]--
            } else {
                state.push(8)
                state[i] = 6
            }
        })
    }
    console.log(state.length)
}

function solve2(state) {
    const k = 256
    const dp = []
    for (let x = 8; x >= 0; x--) {
        dp[x] = [1]
        // after x + 1, x + 1 + 7, ..., will add 1
        for (let i = 1; i <= k; i++) {
            let j = x + 1
            let now = 1
            while (j <= i) {
                now += dp[8][i - j]
                j += 7
            }
            dp[x][i] = now
        }
    }

    let sum = 0
    state.forEach(x => {
        sum += dp[x][k]
    })
    console.log(sum)
}
