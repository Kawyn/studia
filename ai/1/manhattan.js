const Utils = require('./Utils');

const { BAStar } = require('./BAStar');

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

const heuristic = (from, to) => {

    let result = 0;
    const manhattanDistance = (a, b) => {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    const idxToPosition = idx => {
        return {
            x: idx % 4, y: Math.floor(idx / 4)
        };
    }

    for (let i = 0; i < from.state.length; i++)
        result += manhattanDistance(idxToPosition(from.state.indexOf(i)), idxToPosition(to.state.indexOf(i)));

    return result;
}

const startTime = performance.now()
const astar = new BAStar(4, heuristic);

const result = astar.solve(new BAStar.Node(puzzle), new BAStar.Node([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));

const states = result.map(x => x.state.join(', '));

for (let idx in states)
    console.log(`${+idx + 1}. ${states[idx]}`);

console.log(`Odwiedzono ${astar.visitCount} statnów.`);
console.log(`Stworzono ${Object.keys(astar.nodes).length} węzłów.`);

console.log(performance.now() - startTime);