/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var numSubseq = function (nums, target) {
  const MOD = 1e9 + 7;
  const n = nums.length;

  // Step 1: Sort the array
  nums.sort((a, b) => a - b);

  // Step 2: Precompute powers of 2
  // powers[i] = 2^i % MOD
  const powers = new Array(n);
  powers[0] = 1;
  for (let i = 1; i < n; i++) {
    powers[i] = (powers[i - 1] * 2) % MOD;
  }

  // Step 3: Two pointer approach
  let left = 0;
  let right = n - 1;
  let count = 0;

  while (left <= right) {
    // Check if min + max <= target
    if (nums[left] + nums[right] <= target) {
      // All subsequences with nums[left] as min
      // and any element from left to right as max
      // Count: 2^(right - left)
      count = (count + powers[right - left]) % MOD;
      left++; // Move to next potential minimum
    } else {
      // nums[right] is too large
      right--; // Try smaller maximum
    }
  }

  return count;
};
// Example usage:
console.log(numSubseq([3, 5, 6, 7], 9));
