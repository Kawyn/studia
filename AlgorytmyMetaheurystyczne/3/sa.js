
const { pointsFromTSP } = require('./Utils');

const Random = require('./universal/Random');

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

    const EPOCH = points.length * 10;
    const TRIALS_PER_EPOCH = points.length * 10;

    const START_TEMPERATURE = points.length;
    const TARGET_TEMPERATURE = 0.01;

    const DELTA_TEMPERATURE = Math.pow(TARGET_TEMPERATURE / START_TEMPERATURE, 1 / EPOCH);

    let currentTemperature = START_TEMPERATURE;

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

        const experimentTime = performance.now();

        Random.shuffle(cycle);
        currentTemperature = START_TEMPERATURE;

        for (let epoch = 0; epoch < EPOCH; ++epoch) {

            let changes = false;

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

                if (delta < 0) {

                    invert(cycle, i, j);
                    changes = true;
                }
                else if (Math.random() < Math.exp(-delta / currentTemperature)) {

                    invert(cycle, i, j);
                    changes = true;
                }
            }

            if (!changes)
                break;

            currentTemperature *= DELTA_TEMPERATURE;
        }

        let currentDistance = 0;

        for (let i = 0; i < cycle.length; i++)
            currentDistance += distance(cycle[i], cycle[(i + 1) % cycle.length]);

        if (currentDistance < bestDistance)
            bestDistance = currentDistance;

        avgDistance += currentDistance / numberOfExperiments;

        // console.log('EXPERIMENT nr', experiment, '- done in', (performance.now() - experimentTime) / 1000 + 's. DISTANCE:', currentDistance);
    }

    console.log(path, '- done in', (performance.now() - solveTime) / 1000 + 's. BEST:', bestDistance, 'AVG:', Math.floor(avgDistance));
}

for (let file of fs.readdirSync('./data'))
    solve('./data/' + file, 10);
