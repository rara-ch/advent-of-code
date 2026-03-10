const fs = require('node:fs');

function main() {
    const biome = fs.readFileSync('day_three_input.txt', 'utf-8').split('\n');
    console.log(partOne(biome));
    console.log(partTwo(biome));
}

function partOne(biome) {
    const colLength = biome[0].length;
    let treeCount = 0;
    let col = 0;
    for (let row = 0; row < biome.length; row++) {
        if (biome[row][col] === '#') {
            treeCount += 1;
        }
        col = (col + 3) % colLength;
    }

    return treeCount;
}

function partTwo(biome) {
    const colLength = biome[0].length;
    function countTrees(stepsDown, stepsRight) {
        let count = 0;
        let row = 0;
        let col = 0;
        while (row < biome.length) {
            if (biome[row][col] === '#') {
                count += 1;
            }

            row += stepsDown;
            col = (col + stepsRight) % colLength;
        }

        return count;
    }

    let output = 1;
    for (let slope of [
        {
            right: 1,
            down: 1,
        },
        {
            right: 3,
            down: 1,
        },
        {
            right: 5,
            down: 1,
        },
        {
            right: 7,
            down: 1,
        },
        {
            right: 1,
            down: 2,
        }
    ]) {
        output *= countTrees(slope.down, slope.right);
    }

    return output;
}

main()
