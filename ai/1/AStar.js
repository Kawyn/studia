const PriorityQueue = require('./PriorityQueue');

class AStar {

    static Node = class {

        g = Number.MAX_SAFE_INTEGER;
        f = Number.MAX_SAFE_INTEGER;

        state = [];

        previous = null;

        constructor(state) { this.state = state; AStar.Node.instances++; }

        static instances = 0;
    }

    visitCount = 0;
    #lastIdx;
    #sizeMinusOne;
    #sizeSqrtMinusRow;

    constructor(size, heuristic) {

        this.size = size;
        this.heuristic = heuristic;

        this.#lastIdx = size * size - 1;
        this.#sizeMinusOne = size - 1;

        this.#sizeSqrtMinusRow = size * (size - 1);
    }

    solve(startingNode) {

        const open = new PriorityQueue((x, y) => x.f > y.f);
        open.push(startingNode);

        startingNode.g = 0;
        startingNode.f = this.heuristic(startingNode);

        while (open.length != 0) {

            let current = open.pop();

            this.visitCount++;

            if (current.state.every((value, idx) => value === idx)) {

                let result = [];

                while (current) {

                    result.unshift(current);
                    current = current.previous;
                }

                return result;
            }

            for (let neighbour of this.getNeighboursForNode(current)) {

                let tentative = current.g + 1;

                if (tentative < neighbour.g) {

                    neighbour.g = tentative;
                    neighbour.f = tentative + this.heuristic(neighbour);

                    if (neighbour.previous === null)
                        open.push(neighbour);

                    neighbour.previous = current;
                }
            }
        }

        return null;
    }

    getNeighboursForNode(node) {

        let idx = node.state.indexOf(this.#lastIdx);

        let result = []

        if (idx >= this.size) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx - this.size];
            array[idx - this.size] = t;

            result.push(new AStar.Node(array));
        }

        if (idx < this.#sizeSqrtMinusRow) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx + this.size];
            array[idx + this.size] = t;

            result.push(new AStar.Node(array));
        }

        if (idx % this.size != 0) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx - 1];
            array[idx - 1] = t;

            result.push(new AStar.Node(array));
        }

        if (idx % this.size != this.#sizeMinusOne) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx + 1];
            array[idx + 1] = t;

            result.push(new AStar.Node(array));
        }

        return result;
    }
}

module.exports = {
    AStar: AStar
}