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
    }
    console.log(result)
}
