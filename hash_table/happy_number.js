/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // Helper function to calculate the sum of squares of digits
  function sumOfSquares(num) {
    return num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit) ** 2, 0);
  }

  // Use a Set to detect cycles
  let seen = new Set();

  while (n !== 1) {
    // If we've seen this number before, we're in a cycle
    if (seen.has(n)) {
      return false;
    }

    // Add the current number to the set
    seen.add(n);

    // Calculate the next number
    n = sumOfSquares(n);
  }

  // If we exit the loop, n must be 1
  return true;
};

// Test cases
console.log(isHappy(19)); // true
console.log(isHappy(2)); // false

function sumOfSquares(num) {
  // Convert number to string
  let numString = num.toString();

  // Split string into array of digits
  let digits = numString.split("");

  // Use reduce to sum the squares of digits
  let sum = digits.reduce((accumulator, digit) => {
    // Convert digit back to number and square it
    let squaredDigit = Math.pow(parseInt(digit), 2);

    // Add to accumulator
    return accumulator + squaredDigit;
  }, 0);

  return sum;
}

// Test the function
console.log(sumOfSquares(123)); // Output: 14
console.log(sumOfSquares(4)); // Output: 16
console.log(sumOfSquares(19)); // Output: 82

/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  // Helper function to calculate sum of squares of digits
  function sumOfSquares(num) {
    return num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Math.pow(parseInt(digit), 2), 0);
  }

  // Main loop
  /* 
    In Computing: In programming and software development, 
    a sentinel value is a special value that is used to 
    indicate a special condition (like the end of a data structure, 
    or to signal that a certain state has been reached). F
    or example:

    In an array or list, a sentinel value might be used 
    to signal the end of the data, such as -1 
    in an array of positive integers.
    Sentinels can help simplify certain algorithms 
    by eliminating the need for additional checks during iteration.
  */
  while (n !== 1 && n !== 4) {
    n = sumOfSquares(n);
  }

  // If we exit the loop, n is either 1 (happy) or 4 (will cycle)
  return n === 1;
}
