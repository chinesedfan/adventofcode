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
    }
    console.log(result)
}

function getReg(rules, id) {
    if (Array.isArray(rules[id])) {
        return rules[id]
            .map(g => g.map(k => {
                const sub = getReg(rules, k)
                return sub.indexOf('|') >= 0 ? `(?:${sub})` : sub
            }).join(''))
            .join('|')
    } else {
        return rules[id]
    }
}
