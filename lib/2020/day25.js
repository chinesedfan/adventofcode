const sub = 7
const div = 20201227

module.exports = function(part, data) {
    // const cpub = 5764801
    // const dpub = 17807724
    const cpub = 9717666
    const dpub = 20089533

    const csize = getSize(cpub)
    const dsize = getSize(dpub)
    console.log('size', csize, dsize)

    const ckey = cal(cpub, dsize)
    const dkey = cal(dpub, csize)
    console.log(ckey, dkey)
}

function getSize(pub) {
    let val = 1
    let size = 0
    while (val !== pub) {
        val = (val * sub) % div
        size++
    }

    return size
}
function cal(pub, size) {
    let val = 1
    while (size--) {
        val = (val * pub) % div
    }
    return val
}
