module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    numbers[1] = 12;
    numbers[2] = 2;

    let ip = 0;
    while (ip < numbers.length) {
        switch (numbers[ip]) {
        case 1:
            numbers[numbers[ip + 3]] = numbers[numbers[ip + 1]] + numbers[numbers[ip + 2]];
            ip += 4;
            break;
        case 2:
            numbers[numbers[ip + 3]] = numbers[numbers[ip + 1]] * numbers[numbers[ip + 2]];
            ip += 4;
            break;
        case 99:
            ip = numbers.length;
            break;
        default:
            throw new Error(`invalid op: ${numbers[ip]} at ${ip}`);
        }
    }

    console.log(numbers[0]);
};
