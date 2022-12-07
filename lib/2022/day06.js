module.exports = function(part, data) {
    const s = data
    const range = part == 1 ? 4 : 14
    for (let i = 3; i < s.length; i++) {
        const map = {}
        let ok = 1
        for (let j = 0; j < range; j++) {
            const x = s[i - j]
            if (map[x]) {
                ok = 0
                break
            }
            map[x] = 1
        }
        if (ok) {
            console.log(i + 1)
            break
        }
    }
}
