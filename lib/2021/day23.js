// Please copy library from
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
        visited[hash(r)] = 0
        while (q.size()) {
            const [u, cost] = q.pop()
            if (!(q.size() % 10000)) console.log(q.size(), u, cost)

            const h = hash(u)
            if (h === th) return cost

            getNext(u, cost).forEach(([v, vc]) => {
                const vh = hash(v)
                if (visited[vh] <= vc) return
                visited[vh] = vc
                q.push([v, vc])
            })
        }
    }
    function getNext(u, v) {
        const arr = []
        const hallway = u[4]
        // check room
        for (let i = 0; i < 4; i++) {
            const [a, b] = u[i]
            if (a === '.') {
                if (b !== '.' && isRightRoom(i, b)) {
                    // move down
                    const temp = u.slice()
                    temp[i] = b + '.'
                    arr.push([temp, v + getCost(b)])
                }
            }
            if (b === '.') {
                if (a !== '.' && !isRightRoom(i, a)) {
                    // move up
                    const temp = u.slice()
                    temp[i] = '.' + a
                    arr.push([temp, v + getCost(a)])
                }
                const p = 2 * (i + 1)
                if (p - 1 >= 0) fromHallwayToRoom(i, p - 1)
                if (p + 1 < hallway.length) fromHallwayToRoom(i, p + 1)
            }
        }
        function fromHallwayToRoom(i, from) {
            const top = hallway[from]
            if (top !== '.' && isRightRoom(i, top) && canEnter(u[i], top)) {
                // move in room
                const temp = u.slice()
                temp[i] = u[i][0] + top
                const chs = temp[4].split('')
                chs[from] = '.'
                temp[4] = chs.join('')
                arr.push([temp, v + getCost(top) * 2])
            }
        }
        function moveInHallway(from, to) {
            if (hallway[from] === '.' || hallway[to] !== '.') return

            const distance = Math.abs(from - to)
            const temp = u.slice()
            const chs = temp[4].split('')
            chs[from] = '.'
            chs[to] = hallway[from]
            temp[4] = chs.join('')
            arr.push([temp, v + getCost(chs[to]) * distance])
        }
        // check hallway
        for (let p = 0; p < hallway.length; p++) {
            if (hallway[p] !== '.') continue

            const i = p / 2 - 1
            if (!(p & 1) && i >= 0 && i < 4) {
                // p is open space
                const last = u[i][1]
                if (last !== '.' && !(isRightRoom(i, last) && canEnter(u[i], last))) {
                    // 2 steps!
                    // move in hallway, and leave the open space
                    if (hallway[p - 1] === '.') {
                        const temp = u.slice()
                        const chs = temp[4].split('')
                        chs[p - 1] = last
                        temp[4] = chs.join('')
                        temp[i] = u[i][0] + '.'
                        arr.push([temp, v + getCost(last) * 2])
                    }
                    if (hallway[p + 1] === '.') {
                        const temp = u.slice()
                        const chs = temp[4].split('')
                        chs[p + 1] = last
                        temp[4] = chs.join('')
                        temp[i] = u[i][0] + '.'
                        arr.push([temp, v + getCost(last) * 2])
                    }
                }
                if (p - 1 >= 0 && p + 1 < hallway.length) {
                    moveInHallway(p - 1, p + 1)
                    moveInHallway(p + 1, p - 1)
                }
            } else {
                if (p - 1 >= 0) moveInHallway(p - 1, p)
                if (p + 1 < hallway.length) moveInHallway(p + 1, p)
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
const mm = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    '.': 4,
}
function hash(args) {
    const s = args.join('')
    let h = 0
    for (let i = 0; i < s.length; i++) {
        h += pp[i] << mm[s[i]]
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
function isRightRoom(i, top) {
    return i === mm[top]
}
function canEnter(arr, top) {
    // no other kind
    for (let j = 0; j < 2; j++) {
        const ch = arr[j]
        if (ch !== '.' && ch !== top) return false
    }
    return true
}
