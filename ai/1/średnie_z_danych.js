const dane = require('./patterns_data.json');

const srednie = {
    "steps": 0,
    "visitedNodes": 0,
    "createdNodes": 0,
    "time": 0
}

let max = {
    "steps": 10000,
    "visitedNodes": 0,
    "createdNodes": 0,
    "time": 0
}


for (let i in dane) {

    srednie.steps += dane[i].steps;
    srednie.visitedNodes += dane[i].visitedNodes;
    srednie.createdNodes += dane[i].createdNodes;
    srednie.time += dane[i].time;

    if (dane[i].steps < max.steps)
        max = dane[i];
}

srednie.steps /= dane.length;
srednie.visitedNodes /= dane.length;
srednie.createdNodes /= dane.length;
srednie.time /= dane.length;

console.log(srednie)
console.log(max)
