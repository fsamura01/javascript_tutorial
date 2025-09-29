/**
 * @param {number[]} nums
 * @return {number}
 */
function minimumAverageDifference(nums) {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const averages = [];

  // Process n/2 pairs
  for (let i = 0; i < n / 2; i++) {
    // Get the smallest and largest remaining elements
    const minElement = nums[i];
    const maxElement = nums[n - 1 - i];

    // Calculate their average and add to the averages array
    const average = (minElement + maxElement) / 2;
    averages.push(average);
  }

  // Return the minimum value in the averages array
  return Math.min(...averages);
}

/* Not using an additional array */
function minimumAverageDifference(nums) {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  let minAverage = Infinity;

  for (let i = 0; i < n / 2; i++) {
    const average = (nums[i] + nums[n - 1 - i]) / 2;
    minAverage = Math.min(minAverage, average);
  }

  return minAverage;
}
