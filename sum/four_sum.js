/**
 * 4Sum Solution
 * Time Complexity: O(n³) - nested loops with two pointers
 * Space Complexity: O(1) - excluding the space needed for output
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of quadruplets that sum to target
 */
function fourSum(nums, target) {
  // Sort array to handle duplicates and use two pointers
  nums.sort((a, b) => a - b);
  const result = [];

  // Early return for invalid input
  if (nums.length < 4) return result;

  // First loop for the first number
  for (let i = 0; i < nums.length - 3; i++) {
    // Skip duplicates for i
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Second loop for the second number
    for (let j = i + 1; j < nums.length - 2; j++) {
      // Skip duplicates for j
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      // Use two pointers for the remaining two numbers
      let left = j + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          // Found a quadruplet
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          // Skip duplicates for left
          while (left < right && nums[left] === nums[left + 1]) left++;
          // Skip duplicates for right
          while (left < right && nums[right] === nums[right - 1]) right--;

          // Move both pointers
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return result;
}

// Optimization: Helper function to check if quadruplet sum would overflow
function willOverflow(a, b, c, d) {
  // Check if sum might overflow
  if (
    a > 0 &&
    b > 0 &&
    c > 0 &&
    d > 0 &&
    Number.MAX_SAFE_INTEGER - a - b - c < d
  ) {
    return true;
  }
  // Check if sum might underflow
  if (
    a < 0 &&
    b < 0 &&
    c < 0 &&
    d < 0 &&
    Number.MIN_SAFE_INTEGER - a - b - c > d
  ) {
    return true;
  }
  return false;
}

// Test cases
const testCases = [
  {
    nums: [1, 0, -1, 0, -2, 2],
    target: 0,
    expected: [
      [-2, -1, 1, 2],
      [-2, 0, 0, 2],
      [-1, 0, 0, 1],
    ],
  },
  {
    nums: [2, 2, 2, 2, 2],
    target: 8,
    expected: [[2, 2, 2, 2]],
  },
  {
    nums: [1, 2, 3, 4, 5],
    target: 10,
    expected: [[1, 2, 3, 4]],
  },
];

// Test runner
function runTests() {
  testCases.forEach((test, index) => {
    const result = fourSum(test.nums, test.target);
    console.log(`Test ${index + 1}:`);
    console.log("Input array:", test.nums);
    console.log("Target:", test.target);
    console.log("Output:", result);
    console.log("Expected:", test.expected);
    console.log("---");
  });
}

// Run the tests
runTests();
