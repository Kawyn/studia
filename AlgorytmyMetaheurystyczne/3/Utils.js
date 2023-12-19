const fs = require('fs');

const START_OF_NODES = 'NODE_COORD_SECTION';
const EOF = 'EOF'

const pointsFromTSP = (filepath) => {

    const file = fs.readFileSync(filepath, { encoding: 'utf-8' });
    const data = file.split(/\r?\n/);

    const points = [];

    let recording = false;

    for (const line of data) {

        if (line.startsWith(EOF))
            break;

        if (recording) {

            const [idx, x, y] = line.split(' ');
            points.push({ idx: +idx, position: [+x, +y] });
        }

        if (line.startsWith(START_OF_NODES))
            recording = true;
    }

    return points;
}

class Random {

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    static shuffle(array) {

        let currentIndex = array.length, randomIndex;

        while (currentIndex > 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }
}

module.exports = {
    pointsFromTSP,
    Random
}