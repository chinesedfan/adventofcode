module.exports = function(part, data) {
    const nums = data.split('\n').map(x => +x)

    const target = nums.filter(check1)[0]
    console.log(target)
    if (part == 1) return

    let start = 0
    let end = 1
    let sum = nums[start] + nums[end]
    while (1) {
        if (sum < target) {
            end++
            sum += nums[end]
        } else if (sum > target) {
            sum -= nums[start]
            start++
        } else {
            break
        }
    }
    
    const sub = nums.slice(start, end + 1)
    console.log(Math.min(...sub) + Math.max(...sub))
}

function check1(val, index, list) {
    if (index < 25) return false

    for (var i = 1; i <= 25; i++) {
        for (var j = 1; j <= 25; j++) {
            if (i !== j
                && index - i >= 0
                && index - j >= 0
                && list[index - i] + list[index - j] === val) return false
        }
    }
    return true
}
