module.exports = function(part, data) {
    const lines = data.split('\n')

    const map = {
        ')': ['(', 3],
        ']': ['[', 57],
        '}': ['{', 1197],
        '>': ['<', 25137],
    }
    let sum = 0
    const scores = []
    lines.forEach(s => {
        const stack = []
        for (let i = 0; i < s.length; i++) {
            switch (s[i]) {
            case '(':
            case '[':
            case '{':
            case '<':
                stack.push(s[i])
                break
            case ')':
            case ']':
            case '}':
            case '>':
                if (!stack.length || stack.pop() !== map[s[i]][0]) {
                    sum += map[s[i]][1]
                    return
                }
                break
            }
        }
        if (part == 2) {
            let total = 0
            while (stack.length) {
                total = total * 5 + '([{<'.indexOf(stack.pop()) + 1
            }
            scores.push(total)
        }
    })
    if (part == 1) {
        console.log(sum)
    } else {
        scores.sort((a, b) => a - b)
        console.log(scores[Math.floor(scores.length / 2)])
    }
}
