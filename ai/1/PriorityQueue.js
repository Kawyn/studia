class PriorityQueue {

    #stack;
    #comparer; // (a, b) =>  return a > b 

    get length() {
        return this.#stack.length;
    }

    constructor(comparer) {

        this.#stack = [];
        this.#comparer = comparer;
    }

    push(element) {

        let low = 0;
        let mid = 0;
        let high = this.#stack.length;

        // binary search 
        while (low < high) {

            mid = (low + high) >>> 1;

            // element > środek => przesuwamy środek
            if (this.#comparer(element, this.#stack[mid]))
                low = mid + 1;
            else
                high = mid;
        }

        this.#stack.splice(low, 0, element);
    }

    pop() {
        return this.#stack.shift();
    }
}


module.exports = PriorityQueue;