const Utils = require('./Utils');

const { BAStar } = require('./BAStar');

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
const data = []


for (let i = 0; i < 100; i++) {

    console.log('Start: ' + i);

    let puzzle = Utils.randomPuzzle(16, 1000);
    const astar = new BAStar(4, heuristic);

    const startTime = performance.now()
    const result = astar.solve(new BAStar.Node(puzzle), new BAStar.Node([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
    const resultTime = performance.now() - startTime;

    data.push({
        steps: result.length,
        visitedNodes: astar.visitCount,
        createdNodes: Object.keys(astar.nodes).length,
        time: resultTime
    })
}

const fs = require('fs');
fs.writeFileSync('./manhattan_data2.json', JSON.stringify(data));