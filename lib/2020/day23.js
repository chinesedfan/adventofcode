module.exports = function(part, data) {
    const numbers = data.split('').map(x => +x)

    let result
    if (part == 1) {
        let moves = 100
        while (moves--) {
            update(numbers)
            console.log(numbers)
        }
    } else {
    }
    console.log(result)
}

function update(numbers) {
    const idx = 0
    const picked = [1, 2, 3].map(off => numbers[(idx + off) % numbers.length])
    const max = 9

    let dst = numbers[idx]
    do {
        dst--
        if (dst < 1) dst = max
    } while (picked.indexOf(dst) >= 0)

    if (idx + 3 < numbers.length) {
        numbers.splice(idx + 1, 3)
    } else {
        const start = idx + 3 - numbers.length
        const end = start + numbers.length - 3
        numbers = numbers.slice(start, end)
    }

    const pos = numbers.indexOf(dst)
    numbers.splice(pos + 1, 0, ...picked)

    // move
    numbers.push(numbers.shift())
}
