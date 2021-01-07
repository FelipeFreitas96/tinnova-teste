function sum(x) {
    return [...Array(x).keys()]
        .filter(val => val % 3 == 0 || val % 5 == 0)
        .reduce((a, b) => a + b);
}

const sumOfMultiples = sum(10);
console.log(`A soma dos mútiplos de 3 e 5 é: ${sumOfMultiples}`);