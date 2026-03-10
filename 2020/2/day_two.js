const fs = require('node:fs');

function main() {
    const info = fs.readFileSync('day_two_input.txt', 'utf-8').split('\n').map(line => {
        lineSegments = line.split(' ');
        numberSegments = lineSegments[0].split('-');
        return {
            firstNumber: Number(numberSegments[0]),
            secondNumber: Number(numberSegments[1]),
            letter: lineSegments[1][0],
            password: lineSegments[2],
        }
    });

    console.log(partOne(info));
    console.log(partTwo(info));
}

function partOne(info) {
    let numValid = 0;
    for (let line of info) {
        let letterCount = 0;
        for (let letter of line.password) {
            if (letter === line.letter) {
                letterCount += 1;
            }
        }

        if (line.firstNumber <= letterCount && letterCount <= line.secondNumber) {
            numValid += 1;
        }
    }

    return numValid;
}

function partTwo(info) {
    let numValid = 0;
    for (let line of info) {
        let { password, firstNumber, secondNumber, letter } = line;
        const position1 = password[firstNumber - 1];
        const position2 = password[secondNumber - 1];

        if ((position1 !== letter && position2 === letter) || (position1 === letter && position2 !== letter)) {
            numValid += 1;
        }
    }
    return numValid;
}

main();