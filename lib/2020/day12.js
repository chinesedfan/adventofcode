module.exports = function(part, data) {
    const lines = data.split('\n')
    const DIRS = 'ESWN'

    let h = 0
    let v = 0
    if (part == 1) {
        let dir = 'E'
        let idx
        lines.forEach(line => {
            let cmd = line[0]
            if (cmd === 'F') {
                cmd = dir
            }

            const val = +line.slice(1)
            switch (cmd) {
            case 'E':
                h += val
                break
            case 'W':
                h -= val
                break
            case 'S':
                v -= val
                break
            case 'N':
                v += val
                break
            case 'L':
                idx = DIRS.indexOf(dir)
                if (val === 90) {
                    dir = DIRS[(idx - 1 + 4) % 4]
                } else if (val === 180) {
                    dir = DIRS[(idx + 2) % 4]
                } else if (val === 270) {
                    dir = DIRS[(idx + 1) % 4]
                } else {
                    throw new Error('unknown degree')
                }
                break
            case 'R':
                idx = DIRS.indexOf(dir)
                if (val === 90) {
                    dir = DIRS[(idx + 1) % 4]
                } else if (val === 180) {
                    dir = DIRS[(idx + 2) % 4]
                } else if (val === 270) {
                    dir = DIRS[(idx - 1 + 4) % 4]
                } else {
                    throw new Error('unknown degree')
                }
                break
            default:
                throw new Error('unknown cmd')
            }
            console.log(h, v, dir)
        })
    } else {
        let wh = 10
        let wv = 1
        lines.forEach(line => {
            const cmd = line[0]
            const val = +line.slice(1)
            switch (cmd) {
            case 'E':
                wh += val
                break
            case 'W':
                wh -= val
                break
            case 'S':
                wv -= val
                break
            case 'N':
                wv += val
                break
            case 'L':
                if (val === 90) {
                    [wh, wv] = [-wv, wh]
                } else if (val === 180) {
                    [wh, wv] = [-wh, -wv]
                } else if (val === 270) {
                    [wh, wv] = [wv, -wh]
                } else {
                    throw new Error('unknown degree')
                }
                break
            case 'R':
                if (val === 90) {
                    [wh, wv] = [wv, -wh]
                } else if (val === 180) {
                    [wh, wv] = [-wh, -wv]
                } else if (val === 270) {
                    [wh, wv] = [-wv, wh]
                } else {
                    throw new Error('unknown degree')
                }
                break
            case 'F':
                h += val * wh
                v += val * wv
                break
            default:
                throw new Error('unknown cmd')
            }
            console.log(h, v)
        })
    }
    console.log(Math.abs(h) + Math.abs(v))
}
