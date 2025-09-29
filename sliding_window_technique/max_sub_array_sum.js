function maxSubarraySum(arr, k) {
  if (k > arr.length) {
    return null;
  }

  let maxSum = 0;
  let currentSum = 0;

  // Calculate the sum of the first window
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }
  maxSum = currentSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

const arr = [1, 4, 2, 10, 23, 3, 1, 0, 20];
const k = 4;

const result = maxSubarraySum(arr, k);
console.log(result); // Output: 39 (which is the sum of 10, 23, 3, and 3)
