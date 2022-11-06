module.exports = function(part, data) {
    const lines = data.split('\n')
    const map = {}
    for (let i = 2; i < lines.length; i++) {
        const [a, b] = lines[i].split(' -> ')
        map[a] = b
    }
    let now = lines[0]
    let round = 10
    while (round--) {
        const next = [now[0]]
        for (let i = 1; i < now.length; i++) {
            const k = now[i - 1] + now[i]
            if (map[k]) next.push(map[k])
            next.push(now[i])
        }
        now = next
    }
    const count = {}
    for (let i = 0; i < now.length; i++) {
        const ch = now[i]
        count[ch] = (count[ch] || 0) + 1
    }
    let min = Infinity
    let max = -Infinity
    for (let k in count) {
        if (min > count[k]) min = count[k]
        if (max < count[k]) max = count[k]
    }
    console.log(max - min)
}
