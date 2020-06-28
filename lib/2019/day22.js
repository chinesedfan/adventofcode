module.exports = function(part, data) {
    (part == 1 ? f1 : f2)(data);
};

function f1(data) {
    let deck = [];
    for (let i = 0; i < 10007; i++) {
        deck[i] = i;
    }

    data.split('\n').forEach((line) => {
        let matches;
        if (line === 'deal into new stack') {
            deck.reverse();
        } else if (matches = /cut (\-?\d+)/.exec(line)) {
            const n = +matches[1];
            const p = n >= 0 ? n : deck.length + n;
            deck = deck.slice(p).concat(deck.slice(0, p));
        } else if (matches = /deal with increment (\d+)/.exec(line)) {
            const n = +matches[1];
            const nd = [];
            let j = 0;
            for (let i = 0; i < deck.length; i++) {
                nd[j] = deck[i];
                j = (j + n) % deck.length;
            }
            deck = nd;
        }
    });

    console.log(deck.indexOf(2019));
}

function f2(data) {
    const length = 119315717514047;
    const times = 101741582076661;

    let idx = 2020;
    data.split('\n').reverse().forEach((line) => {
        let matches;
        if (line === 'deal into new stack') {
            idx = length - 1 - idx;
        } else if (matches = /cut (\-?\d+)/.exec(line)) {
            const n = +matches[1];
            // const p1 = n >= 0 ? length - n : -n;
            const p1 = n >= 0 ? n : length + n; // left
            const p2 = length - p1; // right
            idx = idx < p2 ? idx + p1 : idx - p2;
        } else if (matches = /deal with increment (\d+)/.exec(line)) {
            const n = +matches[1];
            idx = which(length, n, idx);
        }
    });
    console.log(idx);
}

function which(length, n, idx) { // ? -> idx
    if (idx === 0) return 0;

    // i(?) -> j(idx)
    // j = (i * n) % length
    // i * n - j = k * length
    // i = (j + k * length) / n
    let k = 0;
    while ((idx + k * length) % n) k++;
    return (idx + k * length) / n;
}
