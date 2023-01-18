// https://github.com/chinesedfan/heap.js/blob/atcoder/lib/heap.js
module.exports = function(part, data) {
    const lines = data.split('\n')
    const init = []
    for (let i = 0; i < 4; i++) {
        const p = 2 * (i + 1) + 1
        // down to top
        init[i] = lines[3][p] + lines[2][p]
    }
    init[4] = lines[1].slice(1, -1)

    const target = [
        'AA',
        'BB',
        'CC',
        'DD',
        '...........'
    ]
    const th = hash(target)
    console.log(bfs(init))

    function bfs(r) {
        const q = new Heap((a, b) => a[1] - b[1])
        q.push([r, 0])
        const visited = {}
        visited[hash(r)] = 1
        while (q.size()) {
            const [u, cost] = q.pop()
            if (!(q.size() % 1000)) console.log(q.size(), u.join(''), cost)

            const h = hash(u)
            if (h === th) return cost

            getNext(u, cost).forEach(([v, vc]) => {
                const vh = hash(v)
                if (visited[vh]) return
                visited[vh] = 1
                q.push([v, vc])
            })
        }
    }
    function getNext(u, v) {
        const arr = []
        for (let i = 0; i < 4; i++) {
            const [a, b] = u[i]
            if (a === '.') {
                if (b !== '.') {
                    const temp = u.slice()
                    temp[i] = b + '.'
                    arr.push([temp, v + getCost(b)])
                }
            }
            if (b === '.') {
                if (a !== '.') {
                    const temp = u.slice()
                    temp[i] = '.' + a
                    arr.push([temp, v + getCost(a)])
                }
                const top = u[4][2 * (i + 1)]
                if (top !== '.') {
                    const temp = u.slice()
                    temp[i] = a + top
                    const chs = temp[4].split('')
                    chs[2 * (i + 1)] = '.'
                    temp[4] = chs.join('')
                    arr.push([temp, v + getCost(top)])
                }
            }
        }
        for (let p = 0; p < u[4].length; p++) {
            if (u[4][p] !== '.') continue

            if (p - 1 >= 0 && u[4][p - 1] !== '.') {
                const temp = u.slice()
                const chs = temp[4].split('')
                chs[p - 1] = '.'
                chs[p] = u[4][p - 1]
                temp[4] = chs.join('')
                arr.push([temp, v + getCost(chs[p])])
            }
            if (p + 1 < u[4].length && u[4][p + 1] !== '.') {
                const temp = u.slice()
                const chs = temp[4].split('')
                chs[p + 1] = '.'
                chs[p] = u[4][p + 1]
                temp[4] = chs.join('')
                arr.push([temp, v + getCost(chs[p])])
            }

            if (p & 1) continue
            const i = p / 2 - 1
            if (i >= 0 && i < 4) {
                if (u[i][1] !== '.') {
                    const temp = u.slice()
                    const chs = temp[4].split('')
                    chs[p] = u[i][1]
                    temp[4] = chs.join('')
                    temp[i] = u[i][0] + '.'
                    arr.push([temp, v + getCost(chs[p])])
                }
            }
        }
        return arr
    }
}
const pp = Array(19)
pp[0] = 1
for (let i = 1; i < pp.length; i++) {
    pp[i] = pp[i - 1] * 5
}
function hash(args) {
    const s = args.join('')
    let h = 0
    const m = {
        '.': 0,
        A: 1,
        B: 2,
        C: 3,
        D: 4,
    }
    for (let i = 0; i < s.length; i++) {
        h += pp[i] * m[s[i]]
    }
    return h
}
function getCost(a) {
    if (a === 'A') return 1
    if (a === 'B') return 10
    if (a === 'C') return 100
    if (a === 'D') return 1000
    throw a
}
