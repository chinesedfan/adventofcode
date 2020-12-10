module.exports = function(part, data) {
    const nums = data.split('\n').map(x => +x)
    nums.sort((a, b) => a - b)

    let result
    if (part == 1) {
        let c1 = 0
        let c3 = 0
        nums.forEach((x, i) => {
            if (i) {
                if (x - nums[i - 1] === 1) c1++
                if (x - nums[i - 1] === 3) c3++
            } else {
                if (x === 1) c1++
                if (x === 3) c1++
            }
        })
        c3++
        result = c1 * c3
        console.log(c1, c3, nums.length)
    } else {
        const dp = []
        nums.forEach((x, i) => {
            dp[i] = 0

            let j = i - 1
            while (j >= 0 && x - nums[j] <= 3) {
                dp[i] += dp[j]
                j--
            }

            if (x <= 3) {
                dp[i]++
            }
        })
        result = dp[nums.length - 1]
    }
    console.log(result)
}
