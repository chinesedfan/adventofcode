module.exports = function(part, data) {
    const instrs = []
    data.split('\n').forEach(line => {
        const [cmd, val] = line.split(' ')
        instrs.push([cmd, +val])
    })

    let ip = 0
    let acc = 0
    const visited = {}
    while (ip < instrs.length) {
        const [cmd, val] = instrs[ip]
        switch (cmd) {
        case 'jmp':
            ip += val
            break;
        case 'acc':
            acc += val
            ip++;
            break;
        case 'nop':
            ip++;
            break;
        default:
            throw new Error('unknow cmd: ' + cmd)
        }

        const key = ip
        if (visited[key]) {
            console.log(acc)
            break
        } else {
            visited[key] = 1
        }
    }
}
