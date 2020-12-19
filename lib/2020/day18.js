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

            if (state.length > 1) throw new Error('should be merged')

            if (stack.length) {
                state = stack.pop()

                if (state.length) {
                    const sign = state.pop()
                    const other = state.pop()
                    if (sign === '+') {
                        val += other
                    } else if (sign === '*') {
                        val *= other
                    }
                }
                state.push(val)
            }
        } else if (ch === '+' || ch === '*') {
            state.push(ch)
        } else if (/\d/.test(ch)) {
            // only 1 digit
            let val = +ch
            if (state.length) {
                const sign = state.pop()
                const other = state.pop()
                if (sign === '+') {
                    val += other
                } else if (sign === '*') {
                    val *= other
                }
            }
            state.push(val)
        }
        // console.log(ch, stack, state)
    }
    console.log(state[0])
    return state[0]
}
