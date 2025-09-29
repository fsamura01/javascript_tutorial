/*219. Contains Duplicate II*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
/*var containsNearbyDuplicate = function (nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] == nums[j] && Math.abs(i - j) <= k) {
        return true;
      }
    }
  }

  return false;
};

const nums = [1, 2, 3, 1],
  k = 3;
containsNearbyDuplicate(nums, k);*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  // Step 1: Create an object to store the last seen index of each number
  const lastSeen = {};

  // Step 2: Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // Step 3: Check if the current number has been seen before
    if (nums[i] in lastSeen) {
      // Step 4: If it has been seen, check if it's within k indices
      if (i - lastSeen[nums[i]] <= k) {
        return true;
      }
    }

    // Step 5: Update the last seen index of the current number
    lastSeen[nums[i]] = i;
  }

  // Step 6: If no nearby duplicates found, return false
  return false;
}

// Test cases
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)); // false

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
