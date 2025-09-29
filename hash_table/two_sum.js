/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Step 1: Create a hash map to store numbers and their indices
  const numMap = new Map();

  // Step 2: Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // Step 3: Check if the complement exists in the hash map
    if (numMap.has(complement)) {
      // Step 4: If found, return the indices
      return [numMap.get(complement), i];
    }

    // Step 5: If not found, add the current number and its index to the map
    numMap.set(nums[i], i);
  }

  // Step 6: If no solution is found, return an empty array or throw an error
  return []; // or throw new Error("No two sum solution");
}

// Example usage:
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
console.log(twoSum([3, 3], 6)); // Output: [0, 1]
