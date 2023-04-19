//  node --max_old_space_size=4000 - bo RAM umiera

const Utils = require('./Utils');

const { AStar } = require('./AStar');

if (process.argv.length != 2 && process.argv.length != 3 && process.argv.length != 18) {

    console.log('Niepoprawna liczba argumentów. Program można wywołać z następujących trybach:');
    console.log('0 argumentów - losowa permutacja,');
    console.log('1 argument - losowa permutacja możliwa do rozwiązania w [argument 1] +- 6 ruchów,');
    console.log('16 argumentów - podana permutacja.');

    return;
}

let puzzle;

if (process.argv.length == 2)
    puzzle = Utils.randomPuzzle(16, 1000);
else if (process.argv.length == 3)
    puzzle = Utils.randomPuzzle(16, process.argv[2]);
else
    puzzle = process.argv.slice(2).map(x => parseInt(x));

let solvable = Utils.solvable(puzzle);

if (!solvable) {

    console.log('Podana permutacja jest nierozwiązywalna.');
    return;
}

//  *to na górze* - bez sensu czekać na wczytanie grup, gdy permutacja nie działa

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


const startTime = performance.now()
const astar = new AStar(4, heuristic);

const result = astar.solve(new AStar.Node(puzzle), new AStar.Node([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));

const states = result.map(x => x.state.join(', '));

for (let idx in states)
    console.log(`${+idx + 1}. ${states[idx]}`);

console.log(performance.now() - startTime);