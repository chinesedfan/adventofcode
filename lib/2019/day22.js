module.exports = function(part, data) {
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
};
