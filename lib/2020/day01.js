module.exports = function(part, data) {
    const numbers = data.split('\n').map((x) => +x);
    numbers.sort((a, b) => a - b)

    var i = 0;
    var j = numbers.length - 1;
    while (i < j) {
        if (numbers[i] + numbers[j] > 2020) {
            j--
        } else if (numbers[i] + numbers[j] < 2020) {
            i++
        } else {
            console.log(numbers[i] * numbers[j])
            break;
        }
    }
};
