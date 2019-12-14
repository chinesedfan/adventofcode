module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    if (part == 1) {
        console.log(run(numbers, 1));
    } else {
        // TODO:
    }
};

function run(numbers, input) {
    let ip = 0;
    while (ip < numbers.length) {
        const op = numbers[ip] % 100;
        const m1 = (numbers[ip] % 1000) >= 100 ? 1 : 0;
        const m2 = numbers[ip] >= 1000 ? 1 : 0;
        switch (op) {
        case 1:
            numbers[numbers[ip + 3]] = read(numbers, ip + 1, m1) + read(numbers, ip + 2, m2);
            ip += 4;
            break;
        case 2:
            numbers[numbers[ip + 3]] = read(numbers, ip + 1, m1) * read(numbers, ip + 2, m2);
            ip += 4;
            break;
        case 3:
            numbers[numbers[ip + 1]] = input;
            ip += 2;
            break;
        case 4:
            console.log(read(numbers, ip + 1, m1));
            ip += 2;
            break;
        case 99:
            ip = numbers.length;
            break;
        default:
            throw new Error(`invalid op: ${numbers[ip]} at ${ip}`);
        }
    }

    return numbers[0];
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
