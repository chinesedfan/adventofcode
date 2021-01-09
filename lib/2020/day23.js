let MAX = 9

module.exports = function(part, data) {
    const numbers = data.split('').map(x => +x)

    const nodes = Array(MAX + 1).fill(0).map((_, i) => ({ v: i }))
    numbers.forEach((n, i) => {
        nodes[n].next = nodes[numbers[i + 1 < numbers.length ? i + 1 : 0]]
    })

    let cur = nodes[numbers[0]]
    let result
    if (part == 1) {
        let moves = 100
        while (moves--) {
            update(cur, nodes)
            cur = cur.next
        }

        result = []
        let n = MAX - 1
        while (n--) {
            cur = cur.next
            result.push(cur.v)
        }
        result = result.join('')
    } else {
        const nmax = 1000000
        let prev = nodes[numbers[MAX - 1]]
        for (let i = MAX + 1; i <= nmax; i++) {
            prev.next = nodes[i] = { v: i }
            prev = prev.next
        }
        nodes[nmax].next = nodes[numbers[0]]
        MAX = nmax

        let moves = 10000000
        while (moves--) {
            if (!(moves % 10000)) console.log(moves)

            update(cur, nodes)
            cur = cur.next
        }

        result = nodes[1].next.v * nodes[1].next.next.v
        console.log(nodes[1].next.v, nodes[1].next.next.v)
    }
    console.log(result)
}

function update(cur, nodes) {
    const picked = [cur.next, cur.next.next, cur.next.next.next].map(o => o.v)

    let dst = cur.v
    do {
        dst--
        if (dst < 1) dst = MAX
    } while (picked.indexOf(dst) >= 0)

    const pickedNext = cur.next.next.next.next
    const dstNext = nodes[dst].next
    nodes[dst].next = cur.next
    cur.next.next.next.next = dstNext
    cur.next = pickedNext
}
