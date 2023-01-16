// by https://github.com/romellem/advent-of-code/pull/181

// function tick({ input, x_inc, truncate_z, y_inc }) {
//     if (truncate_z) {
//         z = Math.trunc(z / 26);
//     }

//     // if `truncate_z` is 1, then `x_inc` is larger than 10,
//     // which means the condition should be true at the same time.
//     if ((z % 26) + x_inc === input) {
//         x = 0;
//         y = 0;
//     } else {
//         z = 26 * z + input + y_inc;
//         y = input + y_inc;
//     }
// }
module.exports = function(part, data) {
    const instrs = data.split('\n').map(line => line.split(' '))

    // find the different arguments
    const as = [
        1, 1, 1, 26, 1, 26, 26,
        26, 1, 26, 1, 1, 26, 26
    ]
    const bs = [
        10, 13, 12, -12, 11, -13, -9,
        -12, 14, -9, 15, 11, -16, -2
    ]
    const cs = [
        5, 9, 4, 4, 10, 14, 14,
        12, 14, 14, 5, 10, 8, 15
    ]

    // https://github.com/romellem/advent-of-code/blob/master/2021/24/alu.js
    const stack = []
    const lines = []
    for (let i = 0; i < as.length; i++) {
        const x_increment = bs[i]
        const y_increment = cs[i]
        const z_truncate = as[i] === 26
        const stackOp = z_truncate ? 'pop' : 'push'
        const value = z_truncate ? x_increment : y_increment
        if (stackOp === 'push') {
            stack.push({ value, i });
        } else {
            const head = stack.pop();
            // i = head.i + (head.value + value)
            lines.push({
                left: i,
                right: head.i,
                value: head.value + value,
            });
        }
    }
    console.log(lines)
    const input = getNumberFromRestraints(lines, part == 1 ? Math.max : Math.min)
    console.log(input.join(''))

    run(instrs, input)
}

function run(instrs, input) {
    let ip = 0
    let pos = 0 // of input
    let x = 0, y = 0, z = 0, w = 0
    while (ip < instrs.length) {
        const [cmd, v1, v2] = instrs[ip++]
        const a = get(v1)
        const b = get(v2)
        switch (cmd) {
        case 'inp':
            console.log([x, y, z, w])
            set(v1, input[pos++])
            break;
        case 'add':
            set(v1, a + b)
            break;
        case 'mul':
            set(v1, a * b)
            break;
        case 'div':
            if (b === 0) throw 'div 0'
            const t = a / b
            set(v1, t < 0 ? Math.ceil(t) : Math.floor(t))
            break;
        case 'mod':
            if (a < 0 || b <= 0) throw 'bad mod'
            set(v1, a % b)
            break;
        case 'eql':
            set(v1, a === b ? 1 : 0)
            break;
        default:
            throw new Error('unknow cmd: ' + cmd)
        }
    }
    console.log([x, y, z, w])
    return [x, y, z, w]

    function get(k) {
        switch (k) {
        case 'x': return x
        case 'y': return y
        case 'z': return z
        case 'w': return w
        default: return +k
        }
    }
    function set(k, v) {
        switch (k) {
        case 'x':
            x = v
            break
        case 'y':
            y = v
            break
        case 'z':
            z = v
            break
        case 'w':
            w = v
            break
        default:
            throw 'unknow variable'
        }
    }
}

// https://github.com/romellem/advent-of-code/blob/master/2021/24/part-one.js
function getNumberFromRestraints(restraints, f) {
    const digits = Array(9)
        .fill()
        .map((_, i) => i + 1);
    const isValidDigit = (digit) => digit >= 1 && digit <= 9;

    let result = Array(14).fill(0);
    for (let restraint of restraints) {
        const right_input = f(...digits.filter((d) => isValidDigit(restraint.value + d)));
        const left_input = right_input + restraint.value;
        result[restraint.left] = left_input;
        result[restraint.right] = right_input;
    }

    // return result.join('');
    return result;
}
