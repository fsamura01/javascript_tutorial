var findIndices = function (nums, indexDifference, valueDifference) {
  let n = nums.length;

  // Iterate through each possible i
  for (let i = 0; i < n; i++) {
    // Iterate through each valid j
    for (let j = i + indexDifference; j < n; j++) {
      // Check if the value difference condition is met
      if (Math.abs(nums[i] - nums[j]) >= valueDifference) {
        return [i, j]; // Found valid indices
      }
    }
  }

  return [-1, -1]; // No valid indices found
};

/**
 * @param {number[]} nums
 * @param {number} indexDifference
 * @param {number} valueDifference
 * @return {number[]}
 */
var findIndices = function (nums, indexDifference, valueDifference) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (
        Math.abs(i - j) >= indexDifference &&
        Math.abs(nums[i] - nums[j]) >= valueDifference
      ) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};
