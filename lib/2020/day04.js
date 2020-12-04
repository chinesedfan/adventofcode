module.exports = function(part, data) {
    let item
    const items = []
    data.split('\n').forEach(line => {
        if (line) {
            item = item || {}
            line.split(' ').forEach(token => {
                const [k, v] = token.split(':')
                item[k] = v
            })
        } else {
            if (item) {
                items.push(item)
                item = null
            }
        }
    })

    console.log(items.filter(part == 1 ? valid1 : valid2).length)
}

function valid1(item) {
    const keys = Object.keys(item)
    return keys.length === 8 || (keys.length === 7 && !item.cid)
}

function valid2(item) {
    return valid1(item)
        && validYear(item.byr, 1920, 2002)
        && validYear(item.iyr, 2010, 2020)
        && validYear(item.eyr, 2020, 2030)
        && validHgt(item.hgt)
        && /^#[0-9a-f]{6}$/.test(item.hcl)
        && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(item.ecl) >= 0
        && /^[0-9]{9}$/.test(item.pid)
}
function validYear(val, min, max) {
    return val.length === 4 && (+val >= min) && (+val <= max)
}
function validHgt(val) {
    const num = +val.slice(0, val.length - 2)
    const unit = val.slice(val.length - 2)
    if (unit === 'cm') {
        return num >= 150 && num <= 193
    } else if (unit === 'in') {
        return num >= 59 && num <= 76
    } else {
        return false
    }
}
