module.exports = function(part, data) {
    const lines = data.split('\n')
    let l = 0
    const arr = lines[l++].trim().split(',').map(Number)
    const boards = []
    const marks = []
    while (l < lines.length) {
        l++
        const board = lines.slice(l, l + 5).map(str => str.trim().split(/ +/).map(Number))
        l += 5

        boards.push(board)
        marks.push(board.map(() => Array(5)))
    }

    if (part == 1) {
        solve1(arr, boards, marks)
    } else {
        solve2(arr, boards, marks)
    }
}

function solve1(arr, boards, marks) {
    let i = 0
    while (i < arr.length) {
        const done = boards.some((board, j) => {
            const win = setVal(board, marks[j], arr[i])
            if (win) {
                console.log(arr[i] * calUnmarked(board, marks[j]))
            }
            return win
        })
        if (done) break
        i++
    }
}
function solve2(arr, boards, marks) {
    const finish = []

    let i = 0
    while (i < arr.length) {
        boards.forEach((board, j) => {
            if (finish[j]) return

            const win = setVal(board, marks[j], arr[i])
            if (win) {
                console.log(arr[i] * calUnmarked(board, marks[j]))
                finish[j] = 1
            }
        })
        i++
    }
}

function setVal(board, mark, val) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === val) {
                mark[i][j] = 1
                if (checkWin(mark, i, j)) return true
            }
        }
    }
    return false
}
function checkWin(mark, r, c) {
    let count = 0
    for (let i = 0; i < mark.length; i++) {
        if (mark[i][c]) count++
    }
    if (count === mark.length) return true

    count = 0
    for (let i = 0; i < mark[0].length; i++) {
        if (mark[r][i]) count++
    }
    return count === mark[0].length
}
function calUnmarked(board, mark) {
    let sum = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (!mark[i][j]) sum += board[i][j]
        }
    }
    return sum
}
