// JavaScript Solution
function findUnsortedSubarray(nums) {
  const n = nums.length;
  let left = -1,
    right = -1;

  // Step 1: Find initial boundaries
  // Left boundary: first element smaller than previous
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[i - 1]) {
      left = i - 1;
      break;
    }
  }

  // If array is already sorted
  if (left === -1) return 0;

  // Right boundary: last element larger than next
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      right = i + 1;
      break;
    }
  }

  // Step 2: Find min and max in unsorted region
  // Method 1: Using spread operator (recommended)
  let min = Math.min(...nums.slice(left, right + 1));
  let max = Math.max(...nums.slice(left, right + 1));

  // Method 2: Manual loop (more explicit)
  // let min = nums[left], max = nums[left];
  // for (let i = left; i <= right; i++) {
  //     min = Math.min(min, nums[i]);
  //     max = Math.max(max, nums[i]);
  // }

  // Step 3: Expand boundaries
  // Extend left boundary: find where min should be placed
  while (left > 0 && nums[left - 1] > min) {
    left--;
  }

  // Extend right boundary: find where max should be placed
  while (right < n - 1 && nums[right + 1] < max) {
    right++;
  }

  return right - left + 1;
}

// Optimized JavaScript Solution (O(n) time, O(1) space)
function findUnsortedSubarrayOptimized(nums) {
  const n = nums.length;
  let left = n,
    right = 0;
  let min = Infinity,
    max = -Infinity;

  // Single pass to find boundaries and min/max
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      min = Math.min(min, nums[i + 1]);
      max = Math.max(max, nums[i]);
      if (left === n) left = i;
      right = i + 1;
    }
  }

  if (left === n) return 0; // Already sorted

  // Expand boundaries based on min/max
  while (left > 0 && nums[left - 1] > min) left--;
  while (right < n - 1 && nums[right + 1] < max) right++;

  return right - left + 1;
}

findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]);
findUnsortedSubarray([1, 2, 3, 4]);
findUnsortedSubarray([1]);
