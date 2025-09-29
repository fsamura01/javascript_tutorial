/**
 * @param {number[]} nums
 * @return {number}
 */
function incremovableSubarrayCount(nums) {
  // Helper function to check if an array is strictly increasing
  function isStrictlyIncreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] <= arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  let count = 0;
  const n = nums.length;

  // Generate all possible subarrays and check each one
  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      // Create the remaining array after removing the subarray [start...end]
      const remaining = [];

      // Add elements before the removed subarray
      for (let i = 0; i < start; i++) {
        remaining.push(nums[i]);
      }

      // Add elements after the removed subarray
      for (let i = end + 1; i < n; i++) {
        remaining.push(nums[i]);
      }

      // Check if the remaining array is strictly increasing
      if (isStrictlyIncreasing(remaining)) {
        count++;
      }
    }
  }

  return count;
}

/* Alternative Solutions
We can optimize our solution by avoiding the creation of a new array for each subarray check: */
/**
 * @param {number[]} nums
 * @return {number}
 */
function incremovableSubarrayCount(nums) {
  const n = nums.length;
  let count = 0;

  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      // Check if the array without the subarray [start...end] is strictly increasing
      let isValid = true;
      let prev = -Infinity; // Initialize with negative infinity

      // Check elements before the removed subarray
      for (let i = 0; i < start; i++) {
        if (nums[i] <= prev) {
          isValid = false;
          break;
        }
        prev = nums[i];
      }

      // Check elements after the removed subarray
      if (isValid) {
        for (let i = end + 1; i < n; i++) {
          if (nums[i] <= prev) {
            isValid = false;
            break;
          }
          prev = nums[i];
        }
      }

      if (isValid) {
        count++;
      }
    }
  }

  return count;
}
