/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // Use a Set to detect cycles.
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
};

function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

// Complexity Analysis:

// Time Complexity: O(log n). Although in the worst case, the sequence might seem to grow, the numbers are bounded.
// The key insight is that for any number with k digits, the next number is at most 81k (since each digit's square is at most 81).
// For example, a 3-digit number (max 999) will produce a next number at most 81 * 3 = 243.
// A 4-digit number (max 9999) will produce a next number at most 81 * 4 = 324.
// This means that numbers quickly drop below 1000, and once below 1000, they will very quickly drop even further.
// The longest sequence we can have is when we start from 999999999999999999 which will take at most O(log n) steps to reach a number less than 1000.
// Then, from any number less than 1000, the sequence is bounded by a constant, so the number of steps is O(1).
// Overall, the time complexity is dominated by O(log n).

// Space Complexity: O(log n). The space used by the 'seen' set is proportional to the length of the sequence before it cycles or reaches 1.
// In the worst-case scenario, the length of this sequence is logarithmic with respect to n, as explained in the time complexity analysis.

// Pattern Recognition using Constraints:

// The constraint 1 <= n <= 2^31 - 1 tells us that n is a 32-bit integer. This large range might initially suggest a computationally intensive problem.
// However, the constraint also indirectly helps us realize that the sequence of sums of squares *cannot* grow indefinitely.

// As explained in the time complexity analysis, the sum of squares of digits of a k-digit number is at most 81k.
// For example:
// - A 3-digit number (max 999) has a maximum sum of squares of 81 * 3 = 243.
// - A 4-digit number (max 9999) has a maximum sum of squares of 81 * 4 = 324.
// Notice how the sum of squares doesn't grow nearly as fast as the original number.

// This observation is crucial. It means that the numbers in the sequence will eventually become smaller and smaller, making it highly likely to either reach 1 or enter a cycle. This is why using a Set to detect cycles is an efficient approach. The constraint helps us realize that cycles are inevitable, making cycle detection a suitable strategy.

// Example usage:
console.log(isHappy(19)); // Output: true
console.log(isHappy(2)); // Output: false
console.log(isHappy(7)); // Output: true

/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  const seen = new Set(); // To track numbers we've seen

  // Helper function to calculate the sum of squares of digits
  function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10; // Get the last digit
      sum += digit * digit; // Add square of the digit
      num = Math.floor(num / 10); // Remove the last digit
    }
    return sum;
  }

  while (n !== 1) {
    if (seen.has(n)) return false; // Loop detected
    seen.add(n); // Track the current number
    n = sumOfSquares(n); // Replace with the sum of squares
  }

  return true; // Reached 1, it's a happy number
}

// Example Usage:
console.log(isHappy(19)); // Output: true
console.log(isHappy(2)); // Output: false
