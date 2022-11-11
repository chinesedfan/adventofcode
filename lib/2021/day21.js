module.exports = function(part, data) {
    // Player 1 starting position: 8
    // Player 2 starting position: 4
    const [p1, p2] = data.split('\n').map(x => +x.split(': ')[1])
    ;[null, f1, f2][part](p1, p2)
}

function f1(p1, p2) {
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

function f2(p1, p2) {
    let m = {}
    m[hash(p1, 0, p2, 0)] = [p1, 0, p2, 0, 1n]
    let roll = 0
    let has
    const wins = [-1, 0n, 0n]
    while (1) {
        const next = {}
        has = 0
        for (let k in m) {
            let [p1, s1, p2, s2, v] = m[k]
            for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
            for (let k = 1; k <= 3; k++) {
                if (roll & 1) {
                    let q = p2 + i + j + k
                    q = (q - 1) % 10 + 1
                    update(next, p1, s1, q, s2 + q, v)
                } else {
                    let q = p1 + i + j + k
                    q = (q - 1) % 10 + 1
                    update(next, q, s1 + q, p2, s2, v)
                }
            }
            }
            }
        }
        m = next
        if (!has) break
        roll++
    console.log('roll', roll)
    }
    console.log(wins[1], wins[2])

    function hash(...args) {
        return args.join(',')
    }
    function update(next, p1, s1, p2, s2, v) {
        if (s1 >= 21) {
            wins[1] += v
        } else if (s2 >= 21) {
            wins[2] += v
        } else {
            const k = hash(p1, s1, p2, s2)
            next[k] = [p1, s1, p2, s2, (next[k] ? next[k][4] : 0n) + v]
            has = 1
        }
    }
}
