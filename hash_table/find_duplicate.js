/**
 * Template for using Set to find duplicates.
 * @param {Array} keys - An array of elements to check for duplicates
 * @return {boolean} - Returns true if duplicates are found, false otherwise
 */
function findDuplicates(keys) {
  // In JavaScript, we use Set instead of HashSet
  const set = new Set();

  for (const key of keys) {
    // If the set already has the key, we've found a duplicate
    if (set.has(key)) {
      return true;
    }
    // Otherwise, add the key to the set
    set.add(key);
  }

  // If we've gone through all keys without finding a duplicate, return false
  return false;
}

// Example usage:
console.log(findDuplicates([1, 2, 3, 4, 5])); // false
console.log(findDuplicates([1, 2, 3, 3, 5])); // true
console.log(findDuplicates(["a", "b", "c", "b"])); // true

/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // Create a new Set from the input array
  const uniqueNums = new Set(nums);

  // Compare the size of the Set to the length of the input array
  return uniqueNums.size !== nums.length;
}

// Test cases
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
