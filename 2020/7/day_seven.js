const fs = require('node:fs');

function main() {
    const input = processInput(fs.readFileSync('day_seven_input.txt', 'utf-8').split('\n'));
    console.log(partOne(input));
    console.log(partTwo(input));
}

function processInput(input) {
    const rules = {};
    for (let rule of input) {
        const splittedRule = rule.split('contain');
        const splittedKey = splittedRule[0].split(' ');
        const key = splittedKey[0] + ' ' + splittedKey[1];
        const childrenRaw = splittedRule[1];
        let value;
        if (childrenRaw === ' no other bags.') {
            value = null;
        } else {
            const splittedValue = childrenRaw.split(',');
            value = splittedValue.map(element => {
                const valueComponents = element.split(' ');
                return {
                    amount: Number(valueComponents[1]),
                    colour: valueComponents[2] + ' ' + valueComponents[3],
                }
            });
        }
        rules[key] = value;
    }
    return rules;
}

function partOne(bags) {
    const contains = new Set();
    const notContains = new Set();

    function checkBag(bag) {
        const containedBags = bags[bag];
        if (bag === 'shiny gold') {
            return true;
        } else if (containedBags === null) {
            return false;
        } else if (contains.has(bag)) {
            return true;
        } else if (notContains.has(bag)) {
            return false;
        }

        let isContained;
        for (let bag of containedBags) {
            let { colour } = bag;
            isContained = checkBag(colour);
            if (isContained) {
                break;
            }
        }

        if (isContained) {
            contains.add(bag);
            return true
        } else {
            notContains.add(bag);
            return false;
        }
    }


    for (let bag of Object.keys(bags)) {
        checkBag(bag);
    }
    return contains.size;
}

function partTwo(bags) {
    function amountBagContains(colour) {
        const innerBags = bags[colour];
        if (innerBags === null) {
            return 0;
        }

        return innerBags
            .map((innerBag) => amountBagContains(innerBag.colour) * innerBag.amount + innerBag.amount)
            .reduce((accumulator, currentVal) => accumulator + currentVal, 0);
    }

    return amountBagContains('shiny gold', 1);
}

main();