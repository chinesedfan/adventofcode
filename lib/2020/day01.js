module.exports = function(part, data) {
    const numbers = data.split('\n').map((x) => +x);
    numbers.sort((a, b) => a - b)

    if (part == 1) {
        const [a, b] = sum2(numbers, 2020)
        console.log(a * b)
    } else {
        numbers.some((x, i) => {
            const rest = numbers.slice(0, i).concat(numbers.slice(i + 1))
            const [a, b] = sum2(rest, 2020 - x)
            if (typeof a !== 'undefined') {
                console.log(a * b * x)
                return true
            }
        })
    }
}

function sum2(numbers, expected) {
    var i = 0;
    var j = numbers.length - 1;
    while (i < j) {
        if (numbers[i] + numbers[j] > expected) {
            j--
        } else if (numbers[i] + numbers[j] < expected) {
            i++
        } else {
            return [numbers[i], numbers[j]]
        }
    }
    return []
};
