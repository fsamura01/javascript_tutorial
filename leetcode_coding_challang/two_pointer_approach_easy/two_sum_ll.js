/* 
# Two Sum (Sorted Array) Solution in JavaScript

## Problem Statement
Find two numbers in a sorted array that add up to a target sum.

## Solution with Two-Pointer Technique
*/
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];

    if (currentSum === target) {
      return [left, right]; // Found the pair
    }

    if (currentSum < target) {
      left++; // Need a larger sum, move left pointer right
    } else {
      right--; // Need a smaller sum, move right pointer left
    }
  }

  return null; // No pair found
}

// Example usage
const sortedArray = [2, 7, 11, 15];
console.log(twoSum(sortedArray, 9)); // Output: [0, 1]
twoSum([2, 7, 11, 15], 9);
twoSum([2, 3, 4], 6);
twoSum([-1, 0], -1);

/* 
  ## Key Characteristics
- Time Complexity: O(n)
- Space Complexity: O(1)
- Works only on sorted arrays
- Uses opposite directional pointers

## Algorithm Steps
1. Initialize left pointer at start
2. Initialize right pointer at end
3. Calculate current sum of left and right elements
4. Compare sum with target
5. Move pointers based on sum comparison
6. Repeat until pair found or pointers cross

## Variations
- Return values instead of indices
- Handle no solution scenarios
- Add error checking for input validation
*/
