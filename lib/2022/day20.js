module.exports = function(part, data) {
    const nodes = data.split('\n').map(x => ({ value: +x }))
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].prev = nodes[i ? i - 1 : nodes.length - 1]
        nodes[i].next = nodes[i + 1 < nodes.length ? i + 1 : 0]
    }
    ;[null, f1, f2][part](nodes)
}

function f1(nodes) {
    for (let x of nodes) {
        if (!x.value) continue
        const d = x.value > 0 ? -1 : 1
        const f = x.value > 0 ? 'next' : 'prev'

        let k = x.value
        let cur = x
        while (k !== 0) {
            cur = cur[f]
            k += d
        }

        x.prev.next = x.next
        x.next.prev = x.prev
        if (f === 'next') {
            // make x after cur
            x.next = cur.next
            x.prev = cur
            cur.next.prev = x
            cur.next = x
        } else {
            x.prev = cur.prev
            x.next = cur
            cur.prev.next = x
            cur.prev = x
        }
    }
    const arr = toArray(nodes)
    const idx = arr.indexOf(0)
    const a = arr[(idx + 1000) % arr.length]
    const b = arr[(idx + 2000) % arr.length]
    const c = arr[(idx + 3000) % arr.length]
    console.log(a, b, c)
    console.log(a + b + c)
}

function f2(nodes) {
}

function toArray(nodes) {
    let temp = nodes.length
    let now = nodes[0]
    const ans = []
    while (temp--) {
        ans.push(now.value)
        now = now.next
    }
    return ans
}
