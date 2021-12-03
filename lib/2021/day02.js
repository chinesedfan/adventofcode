module.exports = function(part, data) {
    const cmds = data.split('\n').map(str => str.split(' '));
    if (part == 1) {
        let x = 0
        let y = 0
        cmds.forEach(([type, val]) => {
            val = +val
            if (type === 'forward') {
                x += val
            } else if (type === 'up') {
                y += val
            } else {
                y -= val
            }
        })
        console.log(x * Math.abs(y))
    } else {
        let x = 0
        let y = 0
        let aim = 0
        cmds.forEach(([type, val]) => {
            val = +val
            if (type === 'forward') {
                x += val
                y += aim * val
            } else if (type === 'up') {
                aim -= val
            } else {
                aim += val
            }
        })
        console.log(x * Math.abs(y))
    }
}
