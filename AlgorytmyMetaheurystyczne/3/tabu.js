
const { pointsFromTSP, Random } = require('./Utils');

const fs = require('fs');

const invert = (arr, i, j) => {

    while (i < j) {

        let t = arr[i];

        arr[i] = arr[j];
        arr[j] = t;

        j--;
        i++;
    }
}

function solve(path, numberOfExperiments) {

    const solveTime = performance.now();

    const DISTANCES_CACHE = {};

    const points = pointsFromTSP(path);
    const cycle = points.map(x => +x.idx - 1);

    const EPOCH = points.length * 5;
    const TRIALS_PER_EPOCH = points.length * 10;

    const EPOCH_WITHOUT_CHANGES = 0.01 * points.length;

    let bestDistance = Number.MAX_SAFE_INTEGER;
    let avgDistance = 0;

    const distance = (i, j) => {

        const a = points[i];
        const b = points[j];

        if (a.idx < b.idx) {
            if (DISTANCES_CACHE[`${a.idx}_${b.idx}`] !== undefined)
                return DISTANCES_CACHE[`${a.idx}_${b.idx}`];
        }
        else {
            if (DISTANCES_CACHE[`${b.idx}_${a.idx}`] !== undefined)
                return DISTANCES_CACHE[`${b.idx}_${a.idx}`];
        }

        const distance = Math.round(Math.sqrt(Math.pow(a.position[0] - b.position[0], 2) + Math.pow(a.position[1] - b.position[1], 2)));

        if (a.idx < b.idx)
            DISTANCES_CACHE[`${a.idx}_${b.idx}`] = distance;
        else
            DISTANCES_CACHE[`${b.idx}_${a.idx}`] = distance;

        return distance;
    }

    for (let experiment = 0; experiment < numberOfExperiments; ++experiment) {

        const TABU_CACHE = {};

        const experimentTime = performance.now();

        let currentDistance = Number.MAX_SAFE_INTEGER;
        let epochWithoutChanges = EPOCH_WITHOUT_CHANGES;

        Random.shuffle(cycle);

        for (let epoch = 0; epoch < EPOCH; ++epoch) {

            let bestI = 0, bestJ = 0, bestDelta = 0;

            for (let tiral = 0; tiral < TRIALS_PER_EPOCH; ++tiral) {

                let i = Math.floor(Math.random() * (points.length - 1));
                let j = Math.floor(Math.random() * (points.length - 1));

                if (i === j) {

                    tiral--;
                    continue;
                }

                if (j < i) {

                    let t = j;
                    j = i;
                    i = t;
                }

                const pi = i === 0 ? points.length - 1 : i - 1;
                const pj = j === points.length - 1 ? 0 : j + 1;

                let delta = 0;

                delta -= distance(cycle[pi], cycle[i]);
                delta -= distance(cycle[j], cycle[pj]);

                delta += distance(cycle[i], cycle[pj]);
                delta += distance(cycle[pi], cycle[j]);

                if (delta < bestDelta) {

                    invert(cycle, i, j);
                    let isTabu = TABU_CACHE[cycle];
                    invert(cycle, i, j);

                    if (isTabu)
                        continue;

                    bestDelta = delta;

                    bestI = i;
                    bestJ = j;
                }
            }

            if (bestDelta === 0) {

                epochWithoutChanges--;

                if (epochWithoutChanges === 0)
                    break;
                else
                    continue;
            }
            else
                epochWithoutChanges = EPOCH_WITHOUT_CHANGES;

            invert(cycle, bestI, bestJ);

            let currentCycleDistance = 0;

            for (let i = 0; i < cycle.length; i++)
                currentCycleDistance += distance(cycle[i], cycle[(i + 1) % cycle.length]);

            if (currentCycleDistance < currentDistance)
                currentDistance = currentCycleDistance;

            TABU_CACHE[cycle] = true;
        }

        if (currentDistance < bestDistance)
            bestDistance = currentDistance;

        avgDistance += currentDistance / numberOfExperiments;

        //  console.log('EXPERIMENT nr', experiment, '- done in', (performance.now() - experimentTime) / 1000 + 's. DISTANCE:', currentDistance);
    }

    console.log(path, '- done in', (performance.now() - solveTime) / 1000 + 's. BEST:', bestDistance, 'AVG:', Math.floor(avgDistance));
}

for (let file of fs.readdirSync('./data'))
    solve('./data/' + file, 10);
