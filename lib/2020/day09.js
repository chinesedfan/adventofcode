module.exports = function(part, data) {
    const nums = data.split('\n').map(x => +x)

    let result
    if (part == 1) {
        result = nums.filter(check1)[0]
    } else {
    }
    console.log(result)
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
