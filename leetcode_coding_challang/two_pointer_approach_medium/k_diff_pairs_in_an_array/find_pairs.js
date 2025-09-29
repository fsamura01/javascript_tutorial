// JavaScript Solution
function findPairs(nums, k) {
  // Special case: k = 0, we need duplicates
  if (k === 0) {
    const freq = new Map();
    // Count frequency of each number
    for (const num of nums) {
      freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Count numbers that appear at least twice
    let count = 0;
    for (const [num, frequency] of freq) {
      if (frequency >= 2) {
        count++;
      }
    }
    return count;
  }

  // General case: k > 0
  const numSet = new Set(nums); // Remove duplicates for uniqueness
  let count = 0;

  // For each unique number, check if num + k exists
  for (const num of numSet) {
    if (numSet.has(num + k)) {
      count++;
    }
  }

  return count;
}

// Test cases
console.log(findPairs([3, 1, 4, 1, 5], 2)); // Output: 2
console.log(findPairs([1, 2, 3, 4, 5], 1)); // Output: 4
console.log(findPairs([1, 3, 1, 5, 4], 0)); // Output: 1
