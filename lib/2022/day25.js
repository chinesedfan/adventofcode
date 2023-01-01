module.exports = function(part, data) {
    const lines = data.split('\n')
    const r = lines.reduce((sum, line) => {
        const decimal = line.split('').reduce((s, x) => {
            x = '=-012'.indexOf(x) - 2
            return s * 5 + x
        }, 0)
        console.log(decimal)
        return sum + decimal
    }, 0)
    console.log('decimal sum:', r)

    const s = r.toString(5)
    console.log('to base 5:', s)
    const ans = []
    let carry = 0
    for (let i = s.length - 1; i >= 0; i--) {
        const x = +s[i] + carry
        if (x <= 2) {
            ans.unshift(x)
            carry = 0
        } else {
            ans.unshift(x === 5 ? 0 : (x === 3 ? '=' : '-'))
            carry = 1
        }
    }
    if (carry) ans.unshift(carry)
    console.log('SNAFU:', ans.join(''))
}
