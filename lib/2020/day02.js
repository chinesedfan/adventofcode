const rLine = /(\d+)-(\d+) ([a-z]): ([a-z]+)/

module.exports = function(part, data) {
    const lines = data.split('\n')

    const valid = lines.filter(line => {
        const [_, min, max, ch, pswd] = rLine.exec(line)
        const count = pswd.split('').filter(x => x === ch).length
        if (part == 1) {
            return count <= max && count >= min
        } else {
            const p1 = pswd[min - 1] === ch
            const p2 = pswd[max - 1] === ch
            return (p1 && !p2) || (!p1 && p2)
        }
    }).length
    console.log(valid)
}
