/**
 * 4Sum II Solution using Hash Map
 * Time Complexity: O(n²) - two O(n²) operations
 * Space Complexity: O(n²) - storing sums in hash map
 *
 * @param {number[]} nums1 - First array of integers
 * @param {number[]} nums2 - Second array of integers
 * @param {number[]} nums3 - Third array of integers
 * @param {number[]} nums4 - Fourth array of integers
 * @return {number} - Number of tuples that sum to zero
 */
function fourSumCount(nums1, nums2, nums3, nums4) {
  // Create a hash map to store the sum of first two arrays
  const sumMap = new Map();
  let count = 0;

  // First pass: Calculate all possible sums of nums1 and nums2
  // and store their frequencies in the hash map
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const sum = nums1[i] + nums2[j];
      sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
    }
  }

  // Second pass: Check if the complement of sums from nums3 and nums4
  // exists in the hash map
  for (let k = 0; k < nums3.length; k++) {
    for (let l = 0; l < nums4.length; l++) {
      const sum = nums3[k] + nums4[l];
      // Look for the complement that would make total sum zero
      const complement = -sum;
      if (sumMap.has(complement)) {
        count += sumMap.get(complement);
      }
    }
  }

  return count;
}

// Helper function to validate input arrays
function validateInputs(nums1, nums2, nums3, nums4) {
  const n = nums1.length;
  return (
    n === nums2.length &&
    n === nums3.length &&
    n === nums4.length &&
    n >= 1 &&
    n <= 200
  );
}

// Test cases
const testCases = [
  {
    nums1: [1, 2],
    nums2: [-2, -1],
    nums3: [-1, 2],
    nums4: [0, 2],
    expected: 2,
  },
  {
    nums1: [0],
    nums2: [0],
    nums3: [0],
    nums4: [0],
    expected: 1,
  },
  {
    nums1: [1, -1],
    nums2: [-1, 1],
    nums3: [1, -1],
    nums4: [1, -1],
    expected: 6,
  },
];

// Test runner
function runTests() {
  testCases.forEach((test, index) => {
    // Validate inputs before running test
    if (!validateInputs(test.nums1, test.nums2, test.nums3, test.nums4)) {
      console.log(`Test ${index + 1}: Invalid input dimensions`);
      return;
    }

    const result = fourSumCount(test.nums1, test.nums2, test.nums3, test.nums4);
    const passed = result === test.expected;

    console.log(`Test ${index + 1}:`);
    console.log("Input arrays:");
    console.log("nums1:", test.nums1);
    console.log("nums2:", test.nums2);
    console.log("nums3:", test.nums3);
    console.log("nums4:", test.nums4);
    console.log("Output:", result);
    console.log("Expected:", test.expected);
    console.log("Status:", passed ? "PASSED" : "FAILED");
    console.log("---");
  });
}

// Run the tests
runTests();
