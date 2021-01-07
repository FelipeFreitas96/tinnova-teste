function swap(arr, a, b) {
    let aux = arr[a];
    arr[a] = arr[b];
    arr[b] = aux;
}

function bubbleSort(arr, length) {
    if (length < 1) {
        return arr;
    } if (!length) {
        length = arr.length - 1;
    }

    for(let i = 0; i < length; i++) {
        if (arr[i] > arr[i + 1]) {
            swap(arr, i, i + 1);
        }
    }

    return bubbleSort(arr, length - 1);
}

const toSortArray = [5, 3, 2, 4, 7, 1, 0, 6];
console.log("Antes: ", toSortArray);

const sortedValue = bubbleSort(toSortArray);
console.log("Depois: ", sortedValue);