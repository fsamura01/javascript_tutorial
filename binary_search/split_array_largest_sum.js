function splitArray(nums, k) {
  // Helper function to check if it's possible to split the array into `k`
  // subarrays such that the largest subarray sum is <= `maxSum`
  function canSplit(nums, k, maxSum) {
    let currentSum = 0;
    let splits = 1; // Start with one subarray

    for (let num of nums) {
      // If adding this element exceeds maxSum, start a new subarray
      if (currentSum + num > maxSum) {
        splits++;
        currentSum = num; // Start a new subarray with this number
        if (splits > k) {
          return false; // Too many splits
        }
      } else {
        currentSum += num; // Add number to the current subarray
      }
    }
    return true; // It's possible to split into `k` or fewer subarrays
  }

  // Binary search bounds
  let left = Math.max(...nums); // Largest single element
  let right = nums.reduce((a, b) => a + b, 0); // Sum of all elements

  // Binary search to find the minimum largest subarray sum
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Check if we can split the array into `k` parts with max sum <= mid
    if (canSplit(nums, k, mid)) {
      right = mid; // Try to find a smaller maximum sum
    } else {
      left = mid + 1; // Increase the max sum
    }
  }

  return left; // This is the minimized largest sum
}

const nums = [7, 2, 5, 10, 8];
const k = 2;
console.log(splitArray(nums, k)); // Output: 18
