function factorial(n, number = 1) {
    if (n < 1) {
        return number;
    }    
    return factorial(n - 1, number * n);
} 

const toFactorial = 5;
const factoredNumber = factorial(toFactorial);
console.log(`O fatorial de ${toFactorial} é ${factoredNumber}!`);