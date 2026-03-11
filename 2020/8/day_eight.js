const fs = require('node:fs');

function main() {
    const input = fs.readFileSync('day_eight_input.txt', 'utf-8').split('\n').map((instruction) => {
        const components = instruction.split(' ');
        return {
            input: components[0],
            magnitude: { direction: components[1][0], amount: Number(components[1].slice(1)) },
        }
    })
    console.log(partOne(input));
    console.log(partTwo(input));
}

function partOne(instructions) {
    let acc = 0;
    let i = 0;
    const completedInputs = new Set();
    while (true) {
        if (completedInputs.has(i)) {
            break;
        } else {
            completedInputs.add(i);
        }

        const instruction = instructions[i];

        switch (instruction.input) {
            case 'nop':
                i += 1;
                break;
            case 'acc':
                acc = instruction.magnitude.direction == '+' ? acc + instruction.magnitude.amount : acc - instruction.magnitude.amount;
                i += 1;
                break;
            case 'jmp':
                i = instruction.magnitude.direction == '+' ? i + instruction.magnitude.amount : i - instruction.magnitude.amount;
                break;
        }
    }

    return acc;
}

function partTwo(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i].input) {
            case 'acc':
                continue;
            case 'nop':
                instructions[i].input = 'jmp';
                break;
            case 'jmp':
                instructions[i].input = 'nop';
                break;
        }

        let acc = 0;
        let j = 0;
        const completedInputs = new Set();

        while (j < instructions.length && !completedInputs.has(j)) {
            completedInputs.add(j);

            const instruction = instructions[j];

            switch (instruction.input) {
                case 'nop':
                    j += 1;
                    break;
                case 'acc':
                    acc = instruction.magnitude.direction == '+' ? acc + instruction.magnitude.amount : acc - instruction.magnitude.amount;
                    j += 1;
                    break;
                case 'jmp':
                    j = instruction.magnitude.direction == '+' ? j + instruction.magnitude.amount : j - instruction.magnitude.amount;
                    break;
                default:
                    throw Exception()
            }

        }

        if (j >= instructions.length) {
            return acc;
        }

        switch (instructions[i].input) {
            case 'acc':
                continue;
            case 'nop':
                instructions[i].input = 'jmp';
                break;
            case 'jmp':
                instructions[i].input = 'nop';
                break;
        }
    }
}

main();