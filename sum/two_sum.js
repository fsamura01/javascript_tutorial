const twoSum = (arr, target) => {
  if (arr.length === 0) {
    return [];
  }
  let numIndices = {};

  for (let i = 0; i < arr.length; i++) {
    let complement = target - arr[i];

    if (numIndices.hasOwnProperty(complement)) {
      return [numIndices[complement], i];
    }

    numIndices[arr[i]] = i;
  }

  return [];
};

twoSum([2, 7, 11, 15], 9);
console.log("🚀 ~ twoSum([2, 7, 11, 15], 9):", twoSum([2, 7, 11, 15], 9));

// Solution 1: Brute Force Approach
// Time Complexity: O(n²)
// Space Complexity: O(1)
function twoSumBruteForce(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return []; // No solution found
}

// Solution 2: Hash Map Approach (Optimized)
// Time Complexity: O(n)
// Space Complexity: O(n)
function twoSum(nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(nums[i], i);
  }

  return []; // No solution found
}

// Test cases
const testCases = [
  { nums: [2, 7, 11, 15], target: 9 },
  { nums: [3, 2, 4], target: 6 },
  { nums: [3, 3], target: 6 },
];

console.log("Testing Brute Force Solution:");
testCases.forEach((test, index) => {
  console.log(`Test ${index + 1}:`, twoSumBruteForce(test.nums, test.target));
});

console.log("\nTesting Optimized Solution:");
testCases.forEach((test, index) => {
  console.log(`Test ${index + 1}:`, twoSum(test.nums, test.target));
});

// Example usage:
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
console.log(twoSum([3, 3], 6)); // Output: [0, 1]
// var twoSum = function (nums, target) {
//   const map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     let cur = nums[i];
//     // cur + x = target
//     // x = target - cur
//     // if (map.has(target - cur)) {
//     //   return [map.get(target - cur), i];
//     // }
//     // map.set(cur, i); // add current number to map
//     let x = target - cur;
//     if (map.has(x)) {
//       return [map.get(x), i];
//     } else {
//     }
//     map.set(cur, i); // add current number to map
//   }
//   return []; // no pair found
// };
// const nums = [2, 7, 11, 15],
//   target = 9;
// twoSum(nums, target);
