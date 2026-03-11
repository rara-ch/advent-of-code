const fs = require('node:fs');

function main() {
    const input = fs.readFileSync('day_ten_input.txt', 'utf-8').split('\n').map(number => Number(number));
    console.log(partOne(input));
    console.log(partTwo(input));
}

function partOne(numbers) {
    numbers = new Set(numbers);
    let onesCount = 0;
    let threesCount = 0;
    let currentNum = 0;
    for (let i = 0; i < numbers.size; i++) {
        if (numbers.has(currentNum + 1)) {
            currentNum += 1;
            onesCount += 1;
        } else if (numbers.has(currentNum + 2)) {
            currentNum += 2;
        } else if (numbers.has(currentNum + 3)) {
            currentNum += 3;
            threesCount += 1;
        }
    }

    threesCount += 1;

    return onesCount * threesCount;
}

function partTwo(numbers) {
    // TODO
    numbers = new Set(numbers);
    let count = 0;
    function findPermutations(currentNumber) {
        let isLast = true;
        if (numbers.has(currentNumber + 1)) {
            let isLast = false;
            findPermutations(currentNumber + 1);
        }

        if (numbers.has(currentNumber + 2)) {
            let isLast = false;
            findPermutations(currentNumber + 2);
        }

        if (numbers.has(currentNumber + 3)) {
            let isLast = false;
            findPermutations(currentNumber + 3);
        }

        if (isLast) {
            count += 1;
        }
    }
    findPermutations(0);
    return count;
}

main();