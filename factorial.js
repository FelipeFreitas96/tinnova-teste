function factorial(n, number = 1) {
    if (n < 1) {
        return number;
    }    
    return factorial(n - 1, number * n);
} 

const toFactorial = factorial(0);
console.log(toFactorial);