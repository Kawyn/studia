const solvable = (state) => {

    let inversionCount = 0;

    for (let i = 0; i < state.length - 1; i++) {

        if (state[i] == state.length - 1)
            continue;

        for (let j = i + 1; j < state.length; j++) {

            if (state[j] == state.length - 1)
                continue;

            if (state[i] > state[j])
                inversionCount++;
        }
    }

    if (state.length % 2 == 1)
        return inversionCount % 2 == 0;

    else {

        let positionOfEmpty = state.indexOf(state.length - 1);

        if (positionOfEmpty % 2 == 1)
            return inversionCount % 2 == 0;
        else
            return inversionCount % 2 == 1;
    }
}

const succesors = (state) => {

    const idx = state.indexOf(state.length - 1);
    const lengthSqrt = Math.sqrt(state.length);

    const result = []

    if (idx >= lengthSqrt) {

        const array = [].concat(state);

        const t = array[idx];
        array[idx] = array[idx - lengthSqrt];
        array[idx - lengthSqrt] = t;

        result.push(array);
    }

    if (idx < state.length - lengthSqrt) {

        const array = [].concat(state);

        const t = array[idx];
        array[idx] = array[idx + lengthSqrt];
        array[idx + lengthSqrt] = t;

        result.push(array);
    }

    if (idx % lengthSqrt != 0) {

        const array = [].concat(state);

        const t = array[idx];
        array[idx] = array[idx - 1];
        array[idx - 1] = t;

        result.push(array);
    }

    if (idx % lengthSqrt != lengthSqrt - 1) {

        const array = [].concat(state);

        const t = array[idx];
        array[idx] = array[idx + 1];
        array[idx + 1] = t;

        result.push(array);
    }

    return result;
}


const randomPuzzle = (size, moves) => {

    let state = [];

    for (let i = 0; i < size; i++)
        state.push(i);


    for (let i = 0; i < moves; i++) {

        const nexts = succesors(state);

        state = nexts[Math.floor(Math.random() * nexts.length)];
    }

    // moving to the right
    while ((state.indexOf(size - 1) + 1) % 4 != 0) {

        let idx = state.indexOf(size - 1);

        const t = state[idx + 1];
        state[idx + 1] = state[idx];
        state[idx] = t;
    }

    // moving down
    while (state.indexOf(size - 1) != size - 1) {

        let idx = state.indexOf(size - 1);

        const t = state[idx + 4];
        state[idx + 4] = state[idx];
        state[idx] = t;
    }

    return state;
}

module.exports = {
    succesors: succesors,
    solvable: solvable,
    randomPuzzle: randomPuzzle
}