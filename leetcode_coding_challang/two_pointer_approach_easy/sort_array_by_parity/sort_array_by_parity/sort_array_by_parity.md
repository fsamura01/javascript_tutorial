# **905. Sort Array By Parity**

## I'll help guide you through solving the "Sort Array By Parity" problem using a structured approach that will strengthen your problem-solving skills

1. Problem Understanding
   Let's break down what this problem is asking us to do:

- Input: An integer array nums
- Output: An array where all even numbers come before odd numbers
- We need to return ANY array that satisfies this condition (order within even/odd groups doesn't matter)
- The input array's length can be from 1 to 5000
- Each number in the array is a non-negative integer from 0 to 5000

For example, if we have [3,1,2,4], one valid solution would be [2,4,3,1].

## **Pattern Identification**

This problem is an excellent candidate for the "Two Pointers" pattern. Here's why:

- We need to partition elements into two groups (even and odd)
- We can make the swap decisions based on local information
- We can solve it in a single pass through the array
- We want to do it in-place to optimize space complexity

1. Approach Discussion
   Let's solve this using a two-pointer approach:

- Initialize left pointer at the start and right pointer at the end
- While left < right:
  - If left points to an odd number and right points to an even number, swap them
  - Move left pointer right if it points to an even number
  - Move right pointer left if it points to an odd number
- Continue until pointers meet

## **Code Implementation**

Let me write a well-commented solution:

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParity(nums) {
  // Edge case: if array has 0 or 1 elements, return as is
  if (nums.length <= 1) return nums;

  // Initialize two pointers
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // Find first odd number from left
    while (left < right && nums[left] % 2 === 0) {
      left++;
    }

    // Find first even number from right
    while (left < right && nums[right] % 2 === 1) {
      right--;
    }

    // If pointers haven't crossed, swap elements
    if (left < right) {
      // Swap using destructuring assignment
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  return nums;
}
```

1. Complexity Analysis
   Time Complexity: O(n) where n is the length of the array

- We make a single pass through the array
- Each element is looked at at most once
- Swaps are O(1) operations

Space Complexity: O(1)

- We modify the array in-place
- We only use a constant amount of extra space for pointers

## **Alternative Solutions**

We could also solve this using:

A. Single Pass with Extra Space:

```javascript
function sortArrayByParityWithExtraSpace(nums) {
  return nums
    .filter((x) => x % 2 === 0)
    .concat(nums.filter((x) => x % 2 === 1));
}
```

This has O(n) time complexity but O(n) space complexity.

B. Using Array.sort():

```javascript
function sortArrayByParityWithSort(nums) {
  return nums.sort((a, b) => (a % 2) - (b % 2));
}
```

This has O(n log n) time complexity but is more concise.

1. Practice Recommendations
   Similar problems to practice this pattern:

- LeetCode 75: Sort Colors (Dutch National Flag problem)
- LeetCode 283: Move Zeroes
- LeetCode 27: Remove Element
- LeetCode 922: Sort Array By Parity II

## **Let me create a flowchart to visualize the solution:**

Key Insights for Interviews:

1. The two-pointer technique is particularly powerful for array partitioning problems
2. When handling array problems, always consider in-place solutions first as they optimize space complexity
3. Think about whether the relative order matters - it can affect your approach
4. Consider edge cases like empty arrays or single-element arrays

Would you like me to elaborate on any part of the solution or discuss how this pattern applies to other similar problems?
