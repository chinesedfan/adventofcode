module.exports = function(part, data) {
    const instrs = []
    data.split('\n').forEach(line => {
        const [cmd, val] = line.split(' ')
        instrs.push([cmd, +val])
    })

    let result
    if (part == 1) {
        result = run(instrs)[1]
    } else {
        instrs.some(([cmd, val], index) => {
            let end
            let acc
            if (cmd === 'jmp') {
                const clone = [...instrs]
                clone[index] = ['nop', val];
                [end, acc] = run(clone)
            } else if (cmd === 'nop') {
                const clone = [...instrs]
                clone[index] = ['jmp', val];
                [end, acc] = run(clone)
            }
            if (end) {
                result = acc
                return true
            }
        })
    }
    console.log(result)
}

function run(instrs) {
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
            return [false, acc]
        } else {
            visited[key] = 1
        }
    }
    return [true, acc]
}
