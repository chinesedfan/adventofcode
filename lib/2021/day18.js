let gHasSplit
module.exports = function(part, data) {
    const lines = data.split('\n')
    let s = lines[0]
    for (let i = 1; i < lines.length; i++) {
        s = add(s, lines[i])
        while (1) {
            // explode all
            while (1) {
                const [max, pos] = findMaxLevel(s)
                if (max <= 4) break
                s = tryToExplode(s, pos)
            }
            // split once
            gHasSplit = 0
            s = tryToSplit(s)
            if (!gHasSplit) break
        }
    }
    console.log(s)
}

function add(s1, s2) {
    return `[${s1},${s2}]`
}
function findMaxLevel(s) {
    let level = 0
    let max = 0
    let pos
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '[') {
            level++
            if (level > max) {
                max = level
                pos = i
            }
        } else if (s[i] === ']') {
            level--
        }
    }
    return [max, pos]
}
function tryToExplode(s, i) {
    // [[6,[5,[4,[3,2]]]],1]
    // [[6,[5,[4, + [3,2] + ]]],1]
    // [[6,[5,[7, + 0 + ]]],3]
    const j = nextChar(s, i, /\]/)
    let [left, right] = s.slice(i + 1, j).split(',').map(Number)

    // l1-[\d+]-r1
    const r1 = prevChar(s, i, /[0-9]/) + 1
    const l1 = prevChar(s, r1 - 1, /[^0-9]/)
    if (l1 >= 0) {
        left += +s.slice(l1 + 1, r1)
    } else {
        left = NaN
    }
    // l2-[\d+]-r2
    const l2 = nextChar(s, j, /[0-9]/) - 1
    const r2 = nextChar(s, l2 + 1, /[^0-9]/)
    if (r2 < s.length) {
        right += +s.slice(l2 + 1, r2)
    } else {
        right = NaN
    }
    //
    const next = [0]
    if (isNaN(left)) {
        next.unshift(s.slice(0, i))
    } else {
        next.unshift(s.slice(r1, i))
        next.unshift(left)
        next.unshift(s.slice(0, l1 + 1))
    }
    if (isNaN(right)) {
        next.push(s.slice(j + 1))
    } else {
        next.push(s.slice(j + 1, l2 + 1))
        next.push(right)
        next.push(s.slice(r2))
    }
    return next.join('')
}
function tryToSplit(s) {
    return s.replace(/\d+/g, (match) => {
        const x = +match
        if (x >= 10 && !gHasSplit) {
            gHasSplit = 1
            return add(Math.floor(x / 2), Math.ceil(x / 2))
        }
        return x
    })
}
function prevChar(s, i, reg) {
    while (i >= 0 && !reg.test(s[i])) i--
    return i
}
function nextChar(s, i, reg) {
    while (i < s.length && !reg.test(s[i])) i++
    return i
}
