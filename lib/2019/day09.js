module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    console.log();
};

function* run(numbers) {
    let ip = 0;
    while (ip < numbers.length) {
        const op = numbers[ip] % 100;
        const m1 = (numbers[ip] % 1000) >= 100 ? 1 : 0;
        const m2 = numbers[ip] >= 1000 ? 1 : 0;
        switch (op) {
        case 1: // add
            numbers[numbers[ip + 3]] = read(numbers, ip + 1, m1) + read(numbers, ip + 2, m2);
            ip += 4;
            break;
        case 2: // mul
            numbers[numbers[ip + 3]] = read(numbers, ip + 1, m1) * read(numbers, ip + 2, m2);
            ip += 4;
            break;
        case 3: // input
            numbers[numbers[ip + 1]] = yield 'input';
            ip += 2;
            break;
        case 4: // output
            yield read(numbers, ip + 1, m1);
            ip += 2;
            break;
        case 5: // jump-if-true
            if (read(numbers, ip + 1, m1)) {
                ip = read(numbers, ip + 2, m2);
            } else {
                ip += 3;
            }
            break;
        case 6: // jump-if-false
            if (!read(numbers, ip + 1, m1)) {
                ip = read(numbers, ip + 2, m2);
            } else {
                ip += 3;
            }
            break;
        case 7: // less-than
            numbers[numbers[ip + 3]] = read(numbers, ip + 1, m1) < read(numbers, ip + 2, m2) ? 1 : 0;
            ip += 4;
            break;
        case 8: // equals
            numbers[numbers[ip + 3]] = read(numbers, ip + 1, m1) === read(numbers, ip + 2, m2) ? 1 : 0;
            ip += 4;
            break;
        case 99:
            ip = numbers.length;
            break;
        default:
            throw new Error(`invalid op: ${numbers[ip]} at ${ip}`);
        }
    }
}

function read(numbers, ip, mode) {
    switch (mode) {
    case 1: // immediate
        return numbers[ip];
    case 0: // position
    default:
        return numbers[numbers[ip]];
    }
}
