/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const lastSeen = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (lastSeen.has(nums[i])) {
      if (i - lastSeen.get(nums[i]) <= k) {
        return true;
      }
    }

    lastSeen.set(nums[i], i);
  }

  return false;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  // Step 1: Create a hash map to store the most recent index of each number
  const indexMap = new Map();

  // Step 2: Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // Step 3: Check if the current number exists in the map
    if (indexMap.has(nums[i])) {
      // Step 4: If it exists, check if the difference between indices is <= k
      if (i - indexMap.get(nums[i]) <= k) {
        return true;
      }
    }

    // Step 5: Update the most recent index of the current number
    indexMap.set(nums[i], i);
  }

  // Step 6: If no such pair is found, return false
  return false;
}

// Test cases
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // Output: true
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // Output: true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)); // Output: false

var containsNearbyDuplicate = function (nums, k) {
  const numberCounts = {};

  for (let i = 0; i < nums.length; i++) {
    if (
      numberCounts.hasOwnProperty(nums[i]) &&
      Math.abs(i - numberCounts[nums[i]]) <= k
    ) {
      return true;
    }
    numberCounts[nums[i]] = i;
  }

  return false;
};
containsNearbyDuplicate([1, 2, 3, 1], 3);
containsNearbyDuplicate([1, 0, 1, 1], 1);
containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
