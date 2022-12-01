module.exports = function(part, data) {
    const numbers = data.split('\n').map(Number)
    let max = 0
    let prev = 0
    const ns = []
    numbers.forEach(x => {
        if (!x) {
            ns.push(prev)
            prev = 0
        } else {
            prev += x
            max = Math.max(max, prev)
        }
    })
    ns.push(prev)
    ns.sort((a, b) => b - a)
    console.log(max)

    const [a, b, c] = ns.slice(0, 3)
    console.log(a + b + c)
}
