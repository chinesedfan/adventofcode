module.exports = function(part, data) {
    const ps = [] // players

    let player
    data.split('\n').forEach(line => {
        if (line.indexOf('Player') >= 0) {
            player = []
            ps.push(player)
        } else if (line) {
            player.push(+line)
        }
    })

    let result
    if (part == 1) {
        while (ps[0].length && ps[1].length) {
            const a = ps[0].shift()
            const b = ps[1].shift()
            ps[a > b ? 0 : 1].push(Math.max(a, b), Math.min(a, b))
        }
        const p = ps[0].length ? ps[0] : ps[1]
        const total = p.length
        result = p.reduce((s, x, i) => s + x * (total - i), 0)
    } else {
    }
    console.log(result)
}
