const allArrangement = require('../permutation');

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    (part == 1 ? f1 : f2)(numbers);
};

function f1(numbers) {
    const result = allArrangement([0, 1, 2, 3, 4]).reduce((max, arr) => {
        let output = 0;
        arr.forEach((setting) => {
            const g = run([...numbers]);

            let a = g.next();
            a = g.next(setting);

            while (a.value === 'input') {
                a = g.next(output);
            }

            output = a.value;
        });
        return Math.max(max, output);
    }, -Infinity);

    console.log(result);
}
function f2(numbers) {
    const result = allArrangement([5, 6, 7, 8, 9]).reduce((max, arr) => {
        const gs = [];
        arr.forEach((setting) => {
            const g = run([...numbers]);
            g.next(setting);
            gs.push(g);
        });

        let output = 0;
        while (1) {
            let done = false;

            arr.forEach((setting, index) => {
                const g = gs[index];

                const a = g.next(output);
                if (a.done) {}

                output = a.value;
            });

            if (done) break;
        }
        return Math.max(max, output);
    }, -Infinity);

    console.log(result);
}

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
