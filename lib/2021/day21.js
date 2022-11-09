module.exports = function(part, data) {
    // Player 1 starting position: 8
    // Player 2 starting position: 4
    let [p1, p2] = data.split('\n').map(x => +x.split(': ')[1])
    let roll = 0
    let v = 1
    let s1 = 0, s2 = 0
    while (s1 < 1000 && s2 < 1000) {
        if (roll & 1) {
            // player 2
            p2 += update3(v)
            p2 = ((p2 - 1) % 10) + 1
            s2 += p2
        } else {
            // player 1
            p1 += update3(v)
            p1 = ((p1 - 1) % 10) + 1
            s1 += p1
        }
        roll++
    }
    console.log(Math.min(s1, s2) * roll * 3)

    function update3() {
        let s = 0
        s += v
        if (++v > 100) v = 1
        s += v
        if (++v > 100) v = 1
        s += v
        if (++v > 100) v = 1
        return s
    }
}
