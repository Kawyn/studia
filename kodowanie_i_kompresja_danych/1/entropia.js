const TOTAL_OCCURENCES_KEY = 'TOTAL';

const fs = require('fs');

const path = process.argv[2];
const data = fs.readFileSync(`${__dirname}/${path}`);

const occurences = { '0': {} };
occurences['0'][TOTAL_OCCURENCES_KEY] = 1; // first char

for (let i = 0; i < data.length; i++) {

    const byte = data[i];

    if (!occurences[byte])
        occurences[byte] = {};

    occurences[byte][TOTAL_OCCURENCES_KEY] = (occurences[byte][TOTAL_OCCURENCES_KEY] || 0) + 1;

    const previousByte = data[i - 1] || 0;

    if (!occurences[previousByte])
        occurences[previousByte] = {};

    occurences[previousByte][byte] = (occurences[previousByte][byte] || 0) + 1;
}

let entropy = 0;

for (const x in occurences) {

    let subentropy = 0;

    for (const y in occurences[x]) {

        if (y === TOTAL_OCCURENCES_KEY)
            continue;

        const probability = occurences[x][y] / occurences[x][TOTAL_OCCURENCES_KEY];
        subentropy += probability * -Math.log2(probability);
    }

    entropy += subentropy * occurences[x][TOTAL_OCCURENCES_KEY] / data.length;
}

console.log(entropy);