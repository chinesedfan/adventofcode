const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const g = run([...numbers]);
    let outputs = [];

    let a;
    let input;
    do {
        a = g.next(input);
        if (a.value === 'input') {
            throw new Error('I have no input');
        } else {
            outputs.push(+a.value);
        }
    } while (!a.done);

    console.log(String.fromCharCode(...outputs));
};
