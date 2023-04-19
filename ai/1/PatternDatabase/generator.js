const fs = require('fs');
const Utils = require('./Utils');

const groups = [
    [
        0, 1, 2, '_',
        4, 5, '_', '_',
        '_', '_', '_', '_',
        '_', '_', '_', 15
    ],
    [
        '_', '_', '_', 3,
        '_', '_', 6, 7,
        '_', '_', 10, 11,
        '_', '_', '_', 15
    ],
    [
        '_', '_', '_', '_',
        '_', '_', '_', '_',
        8, 9, '_', '_',
        12, 13, 14, 15
    ],
]


for (let group of groups) {

    const nodes = {};
    const open = [group];

    nodes[group.join('|')] = 0;

    while (open.length != 0) {

        const current = open.shift();
        const currentHash = current.join('|');

        for (let neighbour of Utils.succesors(current)) {

            const neighbourHash = neighbour.join('|');

            if (nodes.hasOwnProperty(neighbourHash))
                continue;


            nodes[neighbourHash] = nodes[currentHash] + 1;
            open.push(neighbour);
        }
    }

    let data = JSON.stringify(nodes);

    fs.writeFile(group.toString() + '.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}