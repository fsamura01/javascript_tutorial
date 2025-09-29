/**
 * Determines if a number is a happy number using the two-pointer technique.
 * @param {number} n - The input number.
 * @return {boolean} - True if the number is happy, false otherwise.
 */
function isHappy(n) {
  // Helper function to calculate the sum of the squares of the digits
  function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10; // Get the last digit
      sum += digit * digit; // Add the square of the digit to the sum
      num = Math.floor(num / 10); // Remove the last digit
    }
    return sum;
  }

  let slow = n; // Slow pointer
  let fast = n; // Fast pointer

  while (true) {
    slow = sumOfSquares(slow); // Move slow pointer by one step
    fast = sumOfSquares(sumOfSquares(fast)); // Move fast pointer by two steps

    if (fast === 1) {
      return true; // If the fast pointer reaches 1, the number is happy
    }
    if (slow === fast) {
      return false; // If the slow and fast pointers meet, there's a cycle
    }
  }
}

// Example usage
console.log(isHappy(19)); // Output: true
console.log(isHappy(2)); // Output: false

/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  // Helper function to calculate sum of squares of digits
  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  // Initialize slow and fast pointers
  let slow = n;
  let fast = n;

  do {
    // Move slow pointer one step
    slow = getNext(slow);
    // Move fast pointer two steps
    fast = getNext(getNext(fast));

    // If we found 1, it's a happy number
    if (fast === 1) {
      return true;
    }
  } while (slow !== fast); // Continue until cycle is detected

  // If we exit the loop without finding 1, it's not a happy number
  return false;
}

// Test cases
console.log(isHappy(19)); // true
console.log(isHappy(2)); // false
