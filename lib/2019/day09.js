module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const g = run([...numbers]);
    let a = g.next();
    console.log(a.value);

    while (!a.done) {
        a = g.next();
        console.log(a.value);
    }
};

function* run(numbers) {
    const mem = {};

    function getPosition(mode, pos) { // => number | string
        switch (mode) {
        case 1: // immediate
            return pos;
        case 2: // relative
            // return plus(pos, base).join('');
            return pos + base;
        case 0: // position
        default:
            return read(1, pos, true);
        }
    }
    function read(mode, pos, isNumber) { // => number | number[]
        const position = getPosition(mode, pos);
        let value = (position < numbers.length ? numbers : mem)[position];
        if (typeof value === 'undefined') value = 0;

        if (typeof value === 'number') {
            return isNumber ? value : String(value).split('').map(Number);
        } else if (isNumber) {
            // throw new Error('can not convert big number to number');
            return value.join('');
        } else {
            return value;
        }
    }
    function write(mode, pos, value) {
        const position = getPosition(mode, pos);
        (position < numbers.length ? numbers : mem)[position] = value;
    }

    let ip = 0;
    let base = 0;
    while (ip < numbers.length) {
        const op = numbers[ip] % 100;
        const m1 = Math.floor(numbers[ip] / 100) % 10;
        const m2 = Math.floor(numbers[ip] / 1000) % 10;
        const m3 = Math.floor(numbers[ip] / 10000) % 10;
        switch (op) {
        case 1: // add
            write(m3, ip + 3, plus(read(m1, ip + 1), read(m2, ip + 2)));
            ip += 4;
            break;
        case 2: // mul
            write(m3, ip + 3, multiply(read(m1, ip + 1), read(m2, ip + 2)));
            ip += 4;
            break;
        case 3: // input
            write(m1, ip + 1, yield 'input');
            ip += 2;
            break;
        case 4: // output
            yield read(m1, ip + 1, true);
            ip += 2;
            break;
        case 5: // jump-if-true
            if (read(m1, ip + 1, true)) {
                ip = read(m2, ip + 2, true);
            } else {
                ip += 3;
            }
            break;
        case 6: // jump-if-false
            if (!read(m1, ip + 1, true)) {
                ip = read(m2, ip + 2, true);
            } else {
                ip += 3;
            }
            break;
        case 7: // less-than
            write(m3, ip + 3, compare(read(m1, ip + 1), read(m2, ip + 2) < 0 ? 1 : 0));
            ip += 4;
            break;
        case 8: // equals
            write(m3, ip + 3, compare(read(m1, ip + 1), read(m2, ip + 2) === 0 ? 1 : 0));
            ip += 4;
            break;
        case 9: // change relative base
            base += read(m1, ip + 1, true);
            ip += 2;
            break;
        case 99:
            ip = numbers.length;
            break;
        default:
            throw new Error(`invalid op: ${numbers[ip]} at ${ip}`);
        }
    }
}

function plus(a, b) {
    const ret = [];
    let i = a.length - 1;
    let j = b.length - 1;
    let c = 0;
    while (i >= 0 || j >= 0) {
        const sum = (i >= 0 ? a[i] : 0) + (j >= 0 ? b[j] : 0) + c;
        ret.unshift(sum % 10);
        c = sum >= 10 ? 1 : 0;

        i--;
        j--;
    }
    if (c) ret.unshift(c);

    return ret;
}
function multiply(a, b) {
    let ret = [0];
    for (let i = a.length - 1; i >= 0; i--) {
        let current = Array(a.length - 1 - i).fill(0);
        let c = 0;
        for (let j = b.length - 1; j >= 0; j--) {
            const product = a[i] * b[j] + c;
            current.unshift(product % 10);
            c = Math.floor(product / 10);
        }
        if (c) current.unshift(c);
        ret = plus(ret, current);
    }
    return ret;
}
function compare(a, b) {
    if (a.length === b.length) {
        for (let i = a.length - 1; i >= 0; i++) {
            if (a[i] != b[i]) return a[i] - b[i];
        }
        return 0;
    } else {
        return a.length - a.length;
    }
}
