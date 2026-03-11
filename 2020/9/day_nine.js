const fs = require('node:fs');

function main() {
    const input = fs.readFileSync('day_nine_input.txt', 'utf-8').split('\n').map(number => Number(number));
    const partOneAnswer = partOne(input);
    console.log(partOneAnswer);
    console.log(partTwo(input, partOneAnswer));
}

function partOne(numbers) {
    for (let i = 25; i < numbers.length; i++) {
        let isValid = false;
        for (j = i - 25; j < i; j++) {
            for (k = j + 1; k < i; k++) {
                if (numbers[j] + numbers[k] === numbers[i]) {
                    isValid = true;
                }
            }
        }
        if (!isValid) {
            return numbers[i];
        }
    }
}

function partTwo(numbers, target) {
    let l = 0;
    let r = 1;
    let sum = numbers[l] + numbers[r];

    while (sum !== target) {
        if (sum > target) {
            sum -= numbers[l];
            l += 1;
        } else {
            r += 1;
            sum += numbers[r];
        }

    }

    const conNumbers = numbers.slice(l, r + 1).sort((a, b) => b - a);

    return conNumbers[0] + conNumbers[conNumbers.length - 1];
}

main();