// The guess API is defined for you.
// function guess(num: number): number {}

function guessNumber(n) {
  let left = 1;
  let right = n;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let result = guess(mid);

    if (result === 0) {
      return mid; // The correct number is found
    } else if (result === -1) {
      right = mid - 1; // The number is lower, search in the left half
    } else {
      left = mid + 1; // The number is higher, search in the right half
    }
  }

  // This point is never reached due to the guarantee of the problem constraints
  return -1;
}

// Example usage:
// Assuming the picked number is 6 and n = 10
// console.log(guessNumber(10)); // Output: 6
