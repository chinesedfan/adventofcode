module.exports = function(part, data) {
    const lines = data.split('\n').map(s => eval(s))
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    let r = 0
    for (let i = 0; i < lines.length; i += 3) {
        const temp = compare(lines[i], lines[i + 1])
        if (temp < 0) {
            r += i / 3 + 1
        }
    }
    console.log(r)
}

function f2(lines) {
    const sorted = lines.filter(Boolean)
    sorted.push([[2]], [[6]])
    sorted.sort(compare)
    let a, b
    for (let i = 0; i < sorted.length; i++) {
        if (!compare(sorted[i], [[2]])) a = i + 1
        if (!compare(sorted[i], [[6]])) b = i + 1
    }
    console.log(a * b)
}

function compare(l1, l2) {
    for (let i = 0; i < l1.length; i++) {
        if (i >= l2.length) return 1

        let a = l1[i]
        let b = l2[i]
        if (typeof a === 'number' && typeof b === 'number') {
            if (a === b) continue
            return a - b
        }
        if (typeof a === 'number') a = [a]
        if (typeof b === 'number') b = [b]
        const r = compare(a, b)
        if (r) return r
    }
    if (l1.length < l2.length) return -1
    return 0
}
