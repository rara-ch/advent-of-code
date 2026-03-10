const fs = require('node:fs');

function main() {
    const nums = fs.readFileSync('day_one_input.txt', 'utf-8').split('\n').map(num => Number(num));
    partOne(nums);
    partTwo(nums);
}

function partOne(nums) {
    for (let i = 0; i < nums.length; i++) {
        const num1 = nums[i];
        for (let j = 0; j < nums.length; j++) {
            if (i === j) {
                continue;
            }

            const num2 = nums[j];

            if (num1 + num2 === 2020) {
                return num1 * num2;
            }
        }
    }
}

function partTwo(nums) {
    for (let k = 0; k < nums.length; k++) {
        num3 = nums[k];
        for (let i = 0; i < nums.length; i++) {
            if (k === i) {
                continue;
            }
            const num1 = nums[i];
            for (let j = 0; j < nums.length; j++) {
                if (i === j) {
                    continue;
                }

                const num2 = nums[j];

                if (num1 + num2 === 2020 - num3) {
                    return num1 * num2 * num3;
                }
            }
        }
    }
}

main();

