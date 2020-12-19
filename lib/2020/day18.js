module.exports = function(part, data) {
    const exps = data.split('\n')

    const result = exps.reduce((s, str) => s + evalStr(str, part), 0)
    console.log(result)
}

function evalStr(str, part) {
    const tree = parseTree(str)
    // console.log(tree)
    const val = part == 1 ? evalSeq(tree) : evalPlusFirst(tree)
    console.log(val)
    return val
}
function evalSeq(tree) {
    if (tree.length > 1) {
        return tree.reduce((s, item, i, arr) => {
            let val = item
            if (Array.isArray(item)) {
                val = evalSeq(item)
            }

            if (i) {
                if (arr[i - 1] === '+') {
                    s += val
                } else if (arr[i - 1] === '*') {
                    s *= val
                }
            }
            return s
        })
    } else {
        return tree[0]
    }
}
function evalPlusFirst(tree) {
    if (tree.length > 1) {
        tree = tree.map(item => {
            if (Array.isArray(item)) {
                return evalPlusFirst(item)
            } else {
                return item
            }
        })

        let i
        i = 0
        while (i < tree.length) {
            if (tree[i] === '+') {
                const sum = tree[i - 1] + tree[i + 1]
                tree.splice(i - 1, 3, sum)
            } else {
                i++
            }
        }
        i = 0
        while (i < tree.length) {
            if (tree[i] === '*') {
                const sum = tree[i - 1] * tree[i + 1]
                tree.splice(i - 1, 3, sum)
            } else {
                i++
            }
        }
    }
    return tree[0]
}

function parseTree(str) {
    const stack = []
    let state = []

    let ns = []
    function tryToPushNum() {
        if (ns.length) {
            const val = +ns.join('')
            state.push(val)
            ns = []
        }
    }

    for (let i = 0; i < str.length; i++) {
        const ch = str[i]
        if (ch === '(') {
            const nstate = []
            state.push(nstate)

            stack.push(state)
            state = nstate
        } else if (ch === ')') {
            tryToPushNum()
            state = stack.pop()
        } else if (ch === '+' || ch === '*') {
            tryToPushNum()
            state.push(ch)
        } else if (/\d/.test(ch)) {
            ns.push(ch)
        }
    }
    tryToPushNum()
    return state
}
