module.exports = function(part, data) {
    const rules = []
    data.split('\n').forEach(line => {
        const [left, right] = line.split(' (contains ')
        rules.push([left.split(' '), right.slice(0, right.length - 1).split(', ')])
    })

    const insetPairs = []
    rules.forEach(([i1, a1], i) => {
        rules.forEach(([i2, a2], j) => {
            if (i === j) return

            const allergens = insect(a1, a2)
            const ingredients = insect(i1, i2)
            if (allergens.length) {
                insetPairs.push([allergens, ingredients])
                // console.log(allergens, ingredients)
            }
        })
    })

    // FIXME: suppose no extra ingredients contained
    const containBy = {} // allergen -> [ingredients]
    insetPairs.forEach(([allergens, ingredients]) => {
        if (allergens.length === 1) {
            const a = allergens[0]
            containBy[a] = containBy[a] || []
            containBy[a].push(ingredients)
        }
    })

    const blackList = Object.keys(containBy).reduce((list, a) => {
        const ingredients = containBy[a].reduce((s, is) => insect(s, is), containBy[a][0])
        // console.log(a, ingredients)
        return list.concat(ingredients)
    }, [])
    const blackSet = new Set(blackList)

    let result
    if (part == 1) {
        result = rules.reduce((s, [i]) => s + i.filter(x => !blackSet.has(x)).length, 0)
    } else {
    }
    console.log(result)
}

function insect(a, b) {
    const s = new Set(a)
    return b.filter(x => s.has(x))
}
