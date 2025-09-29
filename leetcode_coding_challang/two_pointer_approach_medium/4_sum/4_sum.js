/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
  // Handle edge cases
  if (nums.length < 4) return [];

  // Sort the array to enable two-pointer technique and duplicate skipping
  nums.sort((a, b) => a - b);

  const result = [];
  const n = nums.length;

  // Fix the first element
  for (let i = 0; i < n - 3; i++) {
    // Skip duplicates for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Fix the second element
    for (let j = i + 1; j < n - 2; j++) {
      // Skip duplicates for the second element
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      // Use two pointers for the remaining two elements
      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        // Calculate current sum
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          // Found a valid quadruplet
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          // Skip duplicates for the third element
          while (left < right && nums[left] === nums[left + 1]) left++;
          // Skip duplicates for the fourth element
          while (left < right && nums[right] === nums[right - 1]) right--;

          // Move both pointers
          left++;
          right--;
        } else if (sum < target) {
          // Sum is too small, increase the left pointer
          left++;
        } else {
          // Sum is too large, decrease the right pointer
          right--;
        }
      }
    }
  }

  return result;
}
