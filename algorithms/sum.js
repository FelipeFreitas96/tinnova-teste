function sum(x) {
    return [...Array(x).keys()]
        .filter(val => val % 3 == 0 || val % 5 == 0)
        .filter(val => val > 0);
}

const sumOfMultiples = sum(10);
console.log(sumOfMultiples);