module.exports = function(part, data) {
    const lines = data.split('\n')
        .map(line => line.split(' ').map((x, i) => i ? Number(x) : x))
    ;[null, f1, f2][part](lines)
}

function f1(lines) {
    const ds = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    const map = {}
    let ph = [0, 0]
    let pt = [0, 0]
    map[hash(pt[0], pt[1])] = 1
    lines.forEach(([d, n]) => {
        const i = 'RLUD'.indexOf(d)
        n = +n

        while (n--) {
            ph[0] += ds[i][0]
            ph[1] += ds[i][1]
            if (dis() > 1) {
                pt[0] = ph[0] - ds[i][0]
                pt[1] = ph[1] - ds[i][1]
                map[hash(pt[0], pt[1])] = 1
            }
        }
    })
    console.log(Object.keys(map).length)

    function dis() {
        return Math.max(
            Math.abs(ph[0] - pt[0]),
            Math.abs(ph[1] - pt[1])
        )
    }
}

function f2(lines) {
}

function hash(a, b) {
    return a + ',' + b
}
