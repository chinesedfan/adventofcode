module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    if (part == 1) {
        console.log(run(numbers, 12, 2));
    } else {
        for (var i = 0; i <= 99; i++) {
            for (var j = 0; j <= 99; j++) {
                try {
                    var result = run([...numbers], i, j);
                    if (result === 19690720) {
                        console.log(100 * i + j);
                        process.exit(0);
                    }
                } catch (e) {
                    // do nothing
                }
            }
        }
    }
};

function run(numbers, noun, verb) {
    numbers[1] = noun;
    numbers[2] = verb;

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

    return numbers[0];
}
