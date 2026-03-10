const fs = require('node:fs');

function main() {
    const batch = fs.readFileSync('day_four_input.txt', 'utf-8').split('\n\n');
    console.log(partOne(batch));
    console.log(partTwo(batch));
}

function partOne(batch) {
    let validCount = 0;
    for (let person of batch) {
        fields = person.split(/\n| /);
        if (fields.length < 7) {
            continue;
        } else {
            const requiredFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
            for (let field of fields) {
                field = field.slice(0, 3);
                if (requiredFields.has(field)) {
                    requiredFields.delete(field);
                }
            }
            if (requiredFields.size === 0) {
                validCount += 1;
            }
        }
    }
    return validCount;
}

function partTwo(batch) {
    function yearValidation(value, start, end) {
        if (value.match(/^\d{4}$/)) {
            const valueNumber = Number(value);
            if (start <= valueNumber && valueNumber <= end) {
                return true;
            }
        }
        return false;
    }

    function heightValidation(value) {
        let isValid;
        if (value.match(/^\d+(in|cm)$/)) {
            const numberComponent = Number(value.slice(0, value.length - 2));
            const metricComponent = value.slice(value.length - 2);
            if (metricComponent === 'cm' && 150 <= numberComponent && numberComponent <= 193) {
                isValid = true;
            } else if (metricComponent === 'in' && 59 <= numberComponent && numberComponent <= 76) {
                isValid = true;
            } else {
                isValid = false;
            }
        } else {
            isValid = false;
        }
        return isValid
    }

    function hairValidation(value) {
        let isValid;
        if (value[0] === '#' && value.slice(1).match(/^(\d|[a-f]){6}$/)) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

    function eyeColorValidation(value) {
        let isValid;
        values = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
        if (values.has(value)) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

    function passportIdValidation(value) {
        let isValid;
        if (value.match(/^\d{9}$/)) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

    let validCount = 0;
    for (let person of batch) {
        fields = person.split(/\n| /);
        if (fields.length < 7) {
            continue;
        } else {
            const requiredFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
            for (let field of fields) {
                const key = field.slice(0, 3);
                if (requiredFields.has(key)) {
                    const value = field.slice(4);
                    let isValid;
                    switch (key) {
                        case 'byr':
                            isValid = yearValidation(value, 1920, 2002);
                            break;
                        case 'iyr':
                            isValid = yearValidation(value, 2010, 2020);
                            break;
                        case 'eyr':
                            isValid = yearValidation(value, 2020, 2030);
                            break;
                        case 'hgt':
                            isValid = heightValidation(value);
                            break;
                        case 'hcl':
                            isValid = hairValidation(value);
                            break;
                        case 'ecl':
                            isValid = eyeColorValidation(value);
                            break;
                        case 'pid':
                            isValid = passportIdValidation(value);
                            break;
                    }
                    if (isValid) {
                        requiredFields.delete(key);
                    }
                }
            }
            if (requiredFields.size === 0) {
                validCount += 1;
            }
        }
    }
    return validCount;
}

main()