//  node --max_old_space_size=4000 - bo RAM umiera

const Utils = require('./Utils');

const { AStar } = require('./AStar');

const GROUPS = {
    A: {
        members: [0, 1, 2, 4, 5, 15],
        database: null,
    },
    B: {
        members: [3, 6, 7, 10, 11, 15],
        database: null,

    },
    C: {
        members: [8, 9, 12, 13, 14, 15],
        database: null,
    }
}

const fs = require('fs');

console.log('Wczytywanie Grupy I...');
GROUPS.A.database = JSON.parse(fs.readFileSync('./PatternDatabase/groupA.json'));
console.log('Wczytywanie Grupy II...');
GROUPS.B.database = JSON.parse(fs.readFileSync('./PatternDatabase/groupB.json'));
console.log('Wczytywanie Grupy III...');
GROUPS.C.database = JSON.parse(fs.readFileSync('./PatternDatabase/groupC.json'));

console.log('Wszystkie grupy pomyślnie zostały wczytane');

const heuristic = (from) => {

    const hashA = from.state.map(x => GROUPS.A.members.includes(x) ? x : '_').join('|');
    const hashB = from.state.map(x => GROUPS.B.members.includes(x) ? x : '_').join('|');
    const hashC = from.state.map(x => GROUPS.C.members.includes(x) ? x : '_').join('|');

    const result = GROUPS.A.database[hashA] + GROUPS.B.database[hashB] + GROUPS.C.database[hashC];

    return result;
}



const data = []

for (let i = 0; i < 100; i++) {

    console.log('Start: ' + i);

    let puzzle = Utils.randomPuzzle(16, 1000);
    const astar = new AStar(4, heuristic);

    const startTime = performance.now()
    const result = astar.solve(new AStar.Node(puzzle), new AStar.Node([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
    const resultTime = performance.now() - startTime;

    data.push({
        steps: result.length,
        visitedNodes: astar.visitCount,
        createdNodes: AStar.Node.instances,
        time: resultTime
    })

    AStar.Node.instances = 0;
}

fs.writeFileSync('./patterns_data.json', JSON.stringify(data));