module.exports = function(part, data) {
    const state = data.split(',').map(Number)

    if (part == 1) {
        solve1(state)
    } else {
        solve2(state)
    }
}

function solve1(state) {
    state.sort((a, b) => a - b)
    const target = state[Math.floor(state.length / 2)]
    let sum = 0
    state.forEach(x => {
        sum += Math.abs(x - target)
    })
    console.log(sum)
}

function solve2(state) {
    const max = Math.max(...state)
    const min = Math.min(...state)

    let ans = Infinity
    for (let a = min; a <= max; a++) {
        let sum = 0
        state.forEach(b => {
            const k = Math.abs(a - b)
            sum += k * (k + 1) / 2
        })
        ans = Math.min(ans, sum)
    }
    console.log(ans)
}
