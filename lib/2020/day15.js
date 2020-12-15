module.exports = function(part, data) {
    const numbers = [8,11,0,19,1,2]

    const history = {}
    let prev

    let i = 0
    // about several minutes for part 2
    const limit = part == 1 ? 2020 : 30000000
    while (i < limit) {
        let v
        if (i < numbers.length) {
            v = numbers[i]
        } else if (history[prev].length < 2) {
            v = 0
        } else {
            const total = history[prev].length
            v = history[prev][total - 1] - history[prev][total - 2]
        }

        history[v] = history[v] || []
        history[v].push(i)
        if (history[v].length > 2) {
            history[v].shift()
        }
        prev = v
        i++

        if (!(i % 10000)) {
            console.log(v)
        }
    }
    console.log(prev)
}
