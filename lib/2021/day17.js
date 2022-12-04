module.exports = function(part, data) {
    let line, x1, x2, y1, y2
    const reg = /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/
    data.replace(reg, (...matches) => {
        [line, x1, x2, y1, y2] = matches
        x1 = +x1
        x2 = +x2
        y1 = +y1
        y2 = +y2
    })

    let ans = 0
    let c = 0
    for (let x = 0; x < 100; x++) {
        for (let y = -200; y < 200; y++) {
            const old = ans
            if (simulate(x, y)) c++
            // new record
            if (ans > old) console.log(x, y, ans)
        }
    }
    console.log('max height', ans)
    console.log('ok pairs', c)

    function simulate(x, y) {
        let curX = 0, curY = 0
        let maxY = 0
        let ok = 0
        while (curX + x <= x2 && curY + y >= y1) {
            curX += x
            curY += y
            // console.log(curX, curY)
            if (curY > maxY) maxY = curY
            if (curX >= x1 && curY <= y2 && curY >= y1) {
                ans = Math.max(ans, maxY)
                ok = 1
            }
            //
            if (x > 0) x--
            y--
        }
        return ok
    }
}
