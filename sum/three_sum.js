/**
 * 3Sum Solution
 * Time Complexity: O(n²) - one loop O(n) and two pointers O(n)
 * Space Complexity: O(1) - excluding the space needed for output
 *
 * @param {number[]} nums - Array of integers
 * @return {number[][]} - Array of triplets that sum to zero
 */
function threeSum(nums) {
  // Sort the array first - O(n log n)
  nums.sort((a, b) => a - b);
  const result = [];

  // Iterate through the array - O(n)
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for i to avoid duplicate triplets
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Two pointer technique for the remaining elements
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        // Found a triplet
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for right
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Move both pointers
        left++;
        right--;
      } else if (sum < 0) {
        // Sum is too small, increment left to get a larger sum
        left++;
      } else {
        // Sum is too large, decrement right to get a smaller sum
        right--;
      }
    }
  }

  return result;
}

// Test cases
const testCases = [
  {
    input: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: [0, 1, 1],
    expected: [],
  },
  {
    input: [0, 0, 0],
    expected: [[0, 0, 0]],
  },
  {
    input: [-2, 0, 1, 1, 2],
    expected: [
      [-2, 0, 2],
      [-2, 1, 1],
    ],
  },
];

// Test runner
function runTests() {
  testCases.forEach((test, index) => {
    const result = threeSum(test.input);
    console.log(`Test ${index + 1}:`);
    console.log("Input:", test.input);
    console.log("Output:", result);
    console.log("Expected:", test.expected);
    console.log("---");
  });
}

// Run the tests
runTests();
