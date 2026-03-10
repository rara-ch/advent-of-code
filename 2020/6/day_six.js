const fs = require('node:fs');

function main() {
    const input = fs.readFileSync('day_six_input.txt', 'utf-8').split('\n\n');
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split('\n');
    }
    console.log(partOne(input));
    console.log(partTwo(input));
}

function partOne(groups) {
    let sum = 0;
    for (let group of groups) {
        const answeredQs = new Set();
        for (let person of group) {
            for (let question of person) {
                answeredQs.add(question);
            }
        }
        sum += answeredQs.size;
    }
    return sum;
}

function partTwo(groups) {
    let sum = 0;
    for (let group of groups) {
        const answeredQs = new Set(group[0]);
        for (let person of group) {
            const personAnsweredQs = new Set(person);
            for (let q of answeredQs) {
                if (!personAnsweredQs.has(q)) {
                    answeredQs.delete(q);
                }
            }
        }
        sum += answeredQs.size;
    }
    return sum;
}

main();