const is_natuaral_plus = n => (n > 0) && (n % 1 === 0);

// zwraca następny element lub `null` gdy następny element nie istnieje
const next_tuple = (L, n, k) => {

    const result = [...L];
    const update_element_at = i => {

        result[i]++;
        const max_value = n - k + i + 1;

        if (result[i] > max_value) {

            if (i === 0) {

                result[i] = null;
            }
            else {

                update_element_at(i - 1);
                result[i] = result[i - 1] === null ? null : result[i - 1] + 1;
            }
        }
    }

    update_element_at(k - 1);

    if (result[k - 1] === null)
        return null;

    return result;
}

const gen_tuple = (n, k) => {

    n = parseInt(n);
    k = parseInt(k);

    if (!is_natuaral_plus(n) || !is_natuaral_plus(k) || n < k)
        throw new Error('Niepoprawne dane');

    let L = new Array(k).fill(0).map((_, i) => i + 1);

    do {
        console.log(`(${L.join(', ')})`);
        L = next_tuple(L, n, k);
    } while (L !== null);
}
