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
    const length = 119315717514047; // note it is a prime
    const times = 101741582076661;

    // try to consider the result after several steps as `x -> ax + b`,
    // which means `[0, 1, 2, ...] -> [b, b + a, b + 2a, ...]`
    // and suppose the length is l, while the times is t

    // deal into new stack
    // x -> l - x
    // ax + b -> a(l - x) + b = -ax + b + al
    // then a' = -a, and b' = b + al

    // cut n cards
    // x -> x + n
    // ax + b -> a(x + n) + b = ax + b + an
    // then a' = a, and b' = b + an

    // deal with increment n
    // x -> nx mod l
    // the first will never move, then b' = b

    // if i -> ni mod l equals 1, then i = n^(-1) (note: omit `mod l` from here)
    // according to Fermat's little theorem, n^(l - 1) = 1, so inv(n) = n^(-1) = n^(l - 2)
    // which means the second new is inv-th of the old, as well as a * inv + b
    // so, a' = a * inv

    let aMul = 1; // a' = a * aMul
    let bOff = 0; // b' = b + bOff
    data.split('\n').forEach((line) => {
        let matches;
        if (line === 'deal into new stack') {
            aMul *= -1;
            bOff += aMul;
        } else if (matches = /cut (\-?\d+)/.exec(line)) {
            const n = +matches[1];
            bOff += mul(aMul, n, length);
        } else if (matches = /deal with increment (\d+)/.exec(line)) {
            const n = +matches[1];
            aMul = mul(aMul, inv(n, length), length);
        }
        aMul %= length;
        bOff %= length;
    });

    const a = mod(aMul, times, length);
    const b = mul(mul(bOff, 1 - a, length), inv(1 - aMul, length), length);
    const ret = (mul(2020, a, length) + b + length) % length;
    console.log(ret);
}

function ones(n) {
    if (n < 0) return ones(-n);

    const ret = [];
    while (n) {
        ret.unshift(n & 1);
        n /= 2;
    }
    return ret;
}
function mul(a, b, n) {
    // a * b mod n
    const os = ones(b);

    let r = 0;
    while (os.length) {
        if (os.shift() & 1) {
            r = (r + r + a) % n;
        } else {
            r = (r + r) % n;
        }
    }
    return r;
}

function mod(a, b, n) {
    // a ^ b mod n
    const os = ones(b);

    let r = 1;
    while (os.length) {
        if (os.shift() & 1) {
            r = mul(mul(r, r, n), a, n);
        } else {
            r = mul(r, r, n);
        }
    }
    return r;
}
function inv(n, length) {
    return mod(n, length - 2, length);
}
