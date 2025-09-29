var myPow = function (x, n) {
  if (n === 0) {
    return 1;
  }

  if (n < 0) return 1 / myPow(x, Math.abs(n));

  if (n % 2 === 1) return x * myPow(x, n - 1);

  return myPow(x * x, Math.floor(n / 2));
};

myPow(2, 2);
//myPow(2.1, 3);
//myPow(2.1, 10);

function myPow(x, n) {
  // Base case
  if (n === 0) return 1;

  // Handle negative exponent
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  // Recursive Exponentiation by Squaring
  function pow(x, n) {
    if (n === 0) return 1;
    let half = pow(x, Math.floor(n / 2));
    if (n % 2 === 0) {
      return half * half;
    } else {
      return half * half * x;
    }
  }

  return pow(x, n);
}

// Example usage:
console.log(myPow(2.0, 10)); // Output: 1024.00000
console.log(myPow(2.1, 3)); // Output: 9.26100
console.log(myPow(2.0, -2)); // Output: 0.25000
console.log(myPow(2.0, 3));
