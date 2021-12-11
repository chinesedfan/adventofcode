module.exports = function(part, data) {
    const input = data.split('\n').map(str => {
        const [a, b] = str.split(' | ')
        return [a.split(' '), b.split(' ')]
    })

    if (part == 1) {
        solve1(input)
    } else {
        solve2(input)
    }
}

function solve1(input) {
    let sum = 0
    const specialLength = [2, 4, 3, 7]
    input.forEach(([a, b]) => {
        sum += b.filter(x => specialLength.indexOf(x.length) >= 0).length
    })
    console.log(sum)
}

function solve2(input) {
    // length -> digit
    // 2 -> 1
    // 3 -> 7
    // 4 -> 4
    // 5 -> 2, 3, 5
    // 6 -> 0, 6, 9
    // 7 -> 8
    let sum = 0
    input.forEach(([a, b]) => {
        const bits = a.map(calMask)
        // the input must contain each special
        // const ans = a.map(x => {
        //     switch (x.length) {
        //     case 2: return 1
        //     case 3: return 7
        //     case 4: return 4
        //     case 7: return 8
        //     default: return '?'
        //     }
        // })
        // console.log(ans.join(''))
        const special = {}
        a.forEach((x, i) => {
            switch (x.length) {
            case 2: special[1] = i; break
            case 3: special[7] = i; break
            case 4: special[4] = i; break
            case 7: special[8] = i; break
            default: break
            }
        })
        // 1, length = 5 -> 3
        special[3] = find(a, bits, 5, i => (bits[i] & bits[special[1]]) === bits[special[1]])
        // 1, length = 6 -> 6
        special[6] = find(a, bits, 6, i => (bits[i] & bits[special[1]]) !== bits[special[1]])
        // 4, length = 6 -> 0, 6
        special[9] = find(a, bits, 6, i => (bits[i] & bits[special[4]]) === bits[special[4]])
        special[0] = find(a, bits, 6, i => {
            return (bits[i] & bits[special[1]]) === bits[special[1]]
                && (bits[i] & bits[special[4]]) !== bits[special[4]]
        })
        // 6, length = 5 -> 5
        special[5] = find(a, bits, 5, i => (bits[i] & bits[special[6]]) === bits[i])
        // 9, length = 5 -> 2
        special[2] = find(a, bits, 5, i => (bits[i] & bits[special[9]]) !== bits[i])

        const values = []
        b.forEach(x => {
            const mask = calMask(x)
            for (let i = 0; i < 10; i++) {
                if (bits[special[i]] === mask) {
                    values.push(i)
                }
            }
        })
        sum += +values.join('')
    })
    console.log(sum)
}
function calMask(str) {
    let n = 0
    for (let i = 0; i < str.length; i++) {
        const k = str.charCodeAt(i) - 'a'.charCodeAt(0)
        n |= (1 << k)
    }
    return n
}
function find(arr, bits, l, fn) {
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i]
        if (x.length === l && fn(i)) return i
    }
    throw 'not found'
}
