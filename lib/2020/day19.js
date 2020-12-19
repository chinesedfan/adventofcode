module.exports = function(part, data) {
    const lines = data.split('\n')
    const rules = {}
    const msgs = []

    lines.forEach(line => {
        if (line.indexOf(':') >= 0) {
            let [id, items] = line.split(': ')
            id = +id
            if (items.indexOf('"') < 0) {
                items = items.split(' | ')
                    .map(g => g.split(' ').map(x => +x))
            } else {
                items = items.replace(/"/g, '')
            }
            rules[id] = items
        } else if (line.length) {
            msgs.push(line)
        }
    })
    // console.log(rules, msgs)

    let result
    if (part == 1) {
        const r = new RegExp('^' + getReg(rules, 0) + '$')
        result = msgs.filter(m => r.test(m)).length
    } else {
        const r31 = getReg(rules, 31)
        const r42 = getReg(rules, 42)

        // 8: 42 | 42 8
        // 11: 42 31 | 42 11 31
        const cache = {}
        cache[8] = `(?:${r42})+`
        cache[11] = `((?:${r42})+)((?:${r31})+)`

        // note `0: 8 11`, and `8` shares `42` with `11`
        // so pretend to assign all `42` to `11`
        const r = new RegExp('^' + getReg(rules, 11, cache) + '$')
        result = msgs.filter(m => {
            const match = r.exec(m)
            // make sure counts are the same
            // note the length of each id is the same, and `0` only contains one `11` at most
            return match && match[1].length > match[2].length
        }).length
    }
    console.log(result)
}

function getReg(rules, id, cache) {
    if (cache && cache[id]) return cache[id]

    if (Array.isArray(rules[id])) {
        return rules[id]
            .map(g => g.map(k => {
                const sub = getReg(rules, k, cache)
                return sub.indexOf('|') >= 0 ? `(?:${sub})` : sub
            }).join(''))
            .join('|')
    } else {
        return rules[id]
    }
}
