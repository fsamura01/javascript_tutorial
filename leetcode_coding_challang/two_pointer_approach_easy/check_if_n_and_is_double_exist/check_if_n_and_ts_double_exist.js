/**
 * @param {number[]} arr
 * @return {boolean}
 */
const checkIfExist = function (arr) {
  // Create a Set to store numbers we've seen
  const seen = new Set();

  // Handle edge case: multiple zeros
  let zeroCount = 0;

  // Iterate through each number in the array
  for (const num of arr) {
    // Count zeros separately (special case)
    if (num === 0) {
      zeroCount++;
      // If we've seen more than one zero, return true
      if (zeroCount > 1) return true;
      continue;
    }

    // Check if either the double or half exists in our set
    if (seen.has(num * 2) || seen.has(num / 2)) {
      return true;
    }

    // Add the current number to our set
    seen.add(num);
  }

  // If we haven't found any pairs, return false
  return false;
};

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist_ = function (arr) {
  let seen = new Set(); // Create a hash set for fast lookups

  for (let num of arr) {
    // Check if 2*num or num/2 (if even) exists in the set
    if (seen.has(2 * num) || (num % 2 === 0 && seen.has(num / 2))) {
      return true;
    }
    seen.add(num); // Add current number to the set
  }

  return false; // If no pair found
};

const checkIfExistSort = function (arr) {
  // Sort the array
  arr.sort((a, b) => a - b);

  // Use two pointers
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] === 2 * arr[i]) return true;
      if (arr[j] > 2 * arr[i]) break; // Optimization
    }
  }
  return false;
};

/**
 * @param {number[]} arr
 * @return {boolean}
 */
const checkIfExist_ = function (arr) {
  // Create a Set to store numbers we've seen
  const seen = new Set();

  // Handle each number in the array
  for (const num of arr) {
    // Check if either double or half of current number exists
    // Note: We check both because we might see the double
    // before we see the original number
    if (seen.has(num * 2) || seen.has(num / 2)) {
      return true;
    }

    // Special case for zero to avoid false positives
    // since 2 * 0 = 0
    seen.add(num);
  }

  // If we haven't found any pairs, return false
  return false;
};

const checkIfExistBruteForce = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === 2 * arr[j]) {
        return true;
      }
    }
  }
  return false;
};
