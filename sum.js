function sum(numb) {
    const arrayOfNumbers = Array(numb).keys();
    return [...arrayOfNumbers]
        .filter(val => val % 3 == 0 || val % 5 == 0)
        .filter(val => val > 0);
}

const arrayOfSums = sum(10);
console.log(arrayOfSums);