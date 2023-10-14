// Kewin Ignasiak

const fs = require('fs');

// node [script] [pattern] [filename]
const pattern = process.argv[2];
const filename = process.argv[3];

const data = fs.readFileSync(`${__dirname}/${filename}`).toString();

/**
 * @param {string} text 
 * @param {string} pattern 
 */
const search = (text, pattern) => {

    const result = [];
    const table = createTable(pattern);

    let currentOffset = 0;
    let currentPatternIdx = 0;

    while (currentOffset + currentPatternIdx < text.length) {

        if (pattern[currentPatternIdx] === text[currentOffset + currentPatternIdx]) {

            if (currentPatternIdx + 1 == pattern.length) {

                result.push(currentOffset);

                currentOffset += currentPatternIdx - table[currentPatternIdx];

                if (currentPatternIdx > 0)
                    currentPatternIdx = table[currentPatternIdx];
            }
            else
                currentPatternIdx++;
        }

        else {

            currentOffset += currentPatternIdx - table[currentPatternIdx];

            if (currentPatternIdx > 0)
                currentPatternIdx = table[currentPatternIdx];
        }
    }

    return result;
}

/**
 * @param {string} pattern 
 */
const createTable = (pattern) => {

    const result = [-1, 0];

    let patternIdx = 0;
    let currentIdx = 2;

    while (currentIdx < pattern.length) {

        if (pattern[currentIdx - 1] == pattern[patternIdx]) {

            result[currentIdx] = patternIdx + 1;

            currentIdx++;
            patternIdx++;
        }
        else {

            if (patternIdx > 0)
                patternIdx = result[patternIdx];

            else {

                result[currentIdx] = 0;
                currentIdx++;
            }
        }
    }

    return result;
}



const out = search(data, pattern);

if (out.length === 0)
    console.log(`Nie znaleziono wystąpień wzorca`);
else
    console.log(`Znaleziono wystąpienia na pozycjach: ${out.join(', ')}`);