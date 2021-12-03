module.exports = function(part, data) {
    const numbers = data.split('\n').map(Number);
    if (part == 1) {
        let ans = 0
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] > numbers[i - 1]) ans++
        }
        console.log(ans)
    } else {
        let ans = 0
        let prev
        for (let i = 2; i < numbers.length; i++) {
            const sum = numbers[i - 2] + numbers[i - 1] + numbers[i]
            if (prev && sum > prev) ans++
            prev = sum
        }
        console.log(ans)
    }
}
