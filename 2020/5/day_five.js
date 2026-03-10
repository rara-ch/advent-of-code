const fs = require('node:fs');

function main() {
    const input = fs.readFileSync('day_five_input.txt', 'utf-8').split('\n');
    console.log(partOne(input));
    console.log(partTwo(input));
}

function partOne(boardingPasses) {
    let maxId = 0;
    for (let bp of boardingPasses) {
        let rowLower = 0;
        let rowUpper = 127;
        let colUpper = 7;
        let colLower = 0;
        for (let i = 0; i < bp.length; i++) {
            if (i <= 6) {
                if (bp[i] == 'F') {
                    rowUpper = Math.floor((rowUpper + rowLower) / 2);
                } else {
                    rowLower = Math.ceil((rowUpper + rowLower) / 2);
                }
            } else {
                if (bp[i] == 'L') {
                    colUpper = Math.floor((colUpper + colLower) / 2);
                } else {
                    colLower = Math.ceil((colUpper + colLower) / 2);
                }
            }
        }
        maxId = Math.max(maxId, rowLower * 8 + colLower);
    }
    return maxId;
}

function partTwo(boardingPasses) {
    const ids = [];
    for (let bp of boardingPasses) {
        let rowLower = 0;
        let rowUpper = 127;
        let colUpper = 7;
        let colLower = 0;
        for (let i = 0; i < bp.length; i++) {
            if (i <= 6) {
                if (bp[i] == 'F') {
                    rowUpper = Math.floor((rowUpper + rowLower) / 2);
                } else {
                    rowLower = Math.ceil((rowUpper + rowLower) / 2);
                }
            } else {
                if (bp[i] == 'L') {
                    colUpper = Math.floor((colUpper + colLower) / 2);
                } else {
                    colLower = Math.ceil((colUpper + colLower) / 2);
                }
            }
        }
        ids.push(rowLower * 8 + colLower);
    }

    ids.sort((a, b) => a - b);

    for (let i = 0; i < ids.length; i++) {
        const currentSeat = ids[i];
        const nextSeat = ids[i + 1];
        if (nextSeat - currentSeat !== 1) {
            return currentSeat + 1;
        }
    }
}

main();