module.exports = function(part, data) {
    const lines = data.split('\n')

    let letters = Array(26).fill(0)
    let sum = 0
    let group = 0
    lines.forEach(line => {
        if (line) {
            group++
            for (var i = 0; i < line.length; i++) {
                var idx = line.charCodeAt(i) - 'a'.charCodeAt(0)
                letters[idx]++
            }
        } else {
            sum += letters.filter(part == 1 ? Boolean : x => x == group).length
            console.log(sum)
            letters = Array(26).fill(0)
            group = 0
        }
    })
    // the last group
    sum += letters.filter(part == 1 ? Boolean : x => x == group).length

    console.log(sum)
}

