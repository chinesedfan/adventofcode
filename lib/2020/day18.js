module.exports = function(part, data) {
    const exps = data.split('\n')

    let result
    if (part == 1) {
        result = exps.reduce((s, str) => s + evalStr('(' + str + ')'), 0)
    } else {
    }
    console.log(result)
}

function evalStr(str) {
    const stack = []
    let state = []
    let ns = []
    for (let i = 0; i < str.length; i++) {
        const ch = str[i]
        if (ch === '(') {
            stack.push(state)
            state = []
        } else if (ch === ')') {
            let val
            if (ns.length) {
                val = +ns.join('')
                ns = []
            } else {
                val = state[0]
            }

            while (state.length > 1) {
                const sign = state.pop()
                const other = state.pop()
                if (sign === '+') {
                    val += other
                } else if (sign === '*') {
                    val *= other
                }

                if (stack.length) {
                    state = stack.pop()
                }
            }

            state.push(val)
        } else if (ch === '+' || ch === '*') {
            let val
            if (ns.length) {
                val = +ns.join('')
                ns = []
            } else {
                val = state[0]
            }

            const sign = state.pop()
            const other = state.pop()
            if (sign === '+') {
                val += other
            } else if (sign === '*') {
                val *= other
            }
            state.push(val)

            state.push(ch)
        } else if (/\d/.test(ch)) {
            ns.push(ch)
        }
        // console.log(ch, stack, state)
    }
    return state[0]
}
