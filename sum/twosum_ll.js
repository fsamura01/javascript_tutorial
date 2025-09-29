const twoSumTwo = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
};
twoSumTwo([2, 7, 11, 15], 9);
console.log("🚀 ~ twoSum([2, 7, 11, 15], 9):", twoSumTwo([2, 7, 11, 15], 9));
Input: (target = 7), (nums = [2, 3, 1, 2, 4, 3]);

/*
  function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        let sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // return 1-based index
        } else if (sum < target) {
            left++; // move the left pointer to the right
        } else {
            right--; // move the right pointer to the left
        }
    }
    
    return []; // just a fallback, though the problem guarantees exactly one solution
}

// Example usage:
console.log(twoSum([2, 7, 11, 15], 9));  // Output: [1, 2]
console.log(twoSum([2, 3, 4], 6));       // Output: [1, 3]
console.log(twoSum([-1, 0], -1));        // Output: [1, 2]
*/

/**
 * Two Sum II - Input Array Is Sorted
 * Time Complexity: O(n) - where n is the length of the input array
 * Space Complexity: O(1) - only using two pointers regardless of input size
 *
 * @param {number[]} numbers - 1-indexed sorted array of integers
 * @param {number} target - target sum to find
 * @return {number[]} - indices of the two numbers that sum to target (1-indexed)
 */
function twoSum(numbers, target) {
  // Initialize two pointers at the start and end of the array
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const currentSum = numbers[left] + numbers[right];

    if (currentSum === target) {
      // Return 1-indexed positions when sum is found
      return [left + 1, right + 1];
    } else if (currentSum < target) {
      // If sum is too small, move left pointer to increase sum
      left++;
    } else {
      // If sum is too large, move right pointer to decrease sum
      right--;
    }
  }

  // No solution found (though problem guarantees one exists)
  return [];
}

// Test cases
const testCases = [
  {
    numbers: [2, 7, 11, 15],
    target: 9,
    expected: [1, 2],
  },
  {
    numbers: [2, 3, 4],
    target: 6,
    expected: [1, 3],
  },
  {
    numbers: [-1, 0],
    target: -1,
    expected: [1, 2],
  },
];

// Test runner
function runTests() {
  testCases.forEach((test, index) => {
    const result = twoSum(test.numbers, test.target);
    const passed = JSON.stringify(result) === JSON.stringify(test.expected);

    console.log(`Test ${index + 1}:`);
    console.log(`Input: numbers = [${test.numbers}], target = ${test.target}`);
    console.log(`Output: [${result}]`);
    console.log(`Expected: [${test.expected}]`);
    console.log(`Status: ${passed ? "PASSED" : "FAILED"}`);
    console.log("---");
  });
}

// Run the tests
runTests();
