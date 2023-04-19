const PriorityQueue = require('./PriorityQueue');

class BAStar {

    static Node = class {

        g = Number.MAX_SAFE_INTEGER;
        f = Number.MAX_SAFE_INTEGER;

        state = [];

        previous = null;
        next = null;

        constructor(state) { this.state = state; }
    }

    visitCount = 0;
    nodes = {};

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

    solve(startingNode, targetNode) {

        const openA = new PriorityQueue((x, y) => x.f > y.f);
        openA.push(startingNode);

        const openB = new PriorityQueue((x, y) => x.f > y.f);
        openB.push(targetNode);

        startingNode.g = 0;
        startingNode.f = this.heuristic(startingNode, targetNode);

        targetNode.g = 0;
        targetNode.f = this.heuristic(targetNode, startingNode);

        while (openA.length || openB.length) {

            let current = openA.pop();

            this.visitCount++;

            if (current.next != null || current.state.every((value, idx) => value === targetNode.state[idx]))
                return this.reconstructPath(current);

            for (let neighbour of this.getNeighboursForNode(current)) {

                let tentative = current.g + 1;

                if (tentative < neighbour.g) {

                    neighbour.g = tentative;
                    neighbour.f = tentative + this.heuristic(neighbour, targetNode);

                    if (neighbour.previous === null)
                        openA.push(neighbour);

                    neighbour.previous = current;
                    current.next = neighbour;
                }
            }

            current = openB.pop();

            this.visitCount++;

            if (current.previous != null || current.state.every((value, idx) => value === startingNode.state[idx]))
                return this.reconstructPath(current);

            for (let neighbour of this.getNeighboursForNode(current)) {

                let tentative = current.g + 1;

                if (tentative < neighbour.g) {

                    neighbour.g = tentative;
                    neighbour.f = tentative + this.heuristic(neighbour, startingNode);

                    if (neighbour.next === null)
                        openB.push(neighbour);

                    neighbour.next = current;
                    current.previous = neighbour;

                }
            }
        }

        return null;
    }

    reconstructPath(node) {

        const result = [];

        let current = node;

        while (current) {

            result.push(current);
            current = current.next;
        }

        current = node.previous;

        while (current) {

            result.unshift(current);
            current = current.previous;
        }

        return result;
    }

    getNeighboursForNode(node) {

        let idx = node.state.indexOf(this.#lastIdx);

        let result = []

        if (idx >= this.size) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx - this.size];
            array[idx - this.size] = t;

            const key = array.join('.');

            if (!this.nodes[key])
                this.nodes[key] = new BAStar.Node(array);

            result.push(this.nodes[key]);
        }

        if (idx < this.#sizeSqrtMinusRow) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx + this.size];
            array[idx + this.size] = t;

            const key = array.join('.');

            if (!this.nodes[key])
                this.nodes[key] = new BAStar.Node(array);

            result.push(this.nodes[key]);
        }

        if (idx % this.size != 0) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx - 1];
            array[idx - 1] = t;

            const key = array.join('.');

            if (!this.nodes[key])
                this.nodes[key] = new BAStar.Node(array);

            result.push(this.nodes[key]);
        }

        if (idx % this.size != this.#sizeMinusOne) {

            const array = [].concat(node.state);

            const t = array[idx];
            array[idx] = array[idx + 1];
            array[idx + 1] = t;

            const key = array.join('.');

            if (!this.nodes[key])
                this.nodes[key] = new BAStar.Node(array);

            result.push(this.nodes[key]);
        }

        return result;
    }
}

module.exports = {
    BAStar: BAStar
}