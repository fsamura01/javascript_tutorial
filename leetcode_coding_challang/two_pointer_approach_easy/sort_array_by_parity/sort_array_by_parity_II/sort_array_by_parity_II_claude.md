# **922. Sort Array By Parity II**

Let me guide you through solving the "Sort Array By Parity II" problem in a structured way that will help build your problem-solving skills.

## Problem Understanding

Let's break down what this problem is asking us to do:

- Given an array of integers, we need to rearrange it so that:
  - Even indices (0, 2, 4...) contain even numbers
  - Odd indices (1, 3, 5...) contain odd numbers
- The array length is always even
- There are an equal number of odd and even integers
- The relative order of numbers doesn't matter

For example, if we have [4, 2, 5, 7], one valid solution would be [4, 5, 2, 7].

## Pattern Identification

This problem exhibits characteristics of:

- Two Pointers Pattern: We need to track and manipulate elements at different positions
- In-place Array Manipulation: We can swap elements to achieve our goal
- Invariant Maintenance: We maintain the property that even indices have even numbers and odd indices have odd numbers

## Approach Discussion

Let's develop our solution step by step:

First, let's understand why two pointers would work well here:

- We can use one pointer for even indices (0, 2, 4...)
- And another pointer for odd indices (1, 3, 5...)
- When we find a misplaced number at an even index, we know there must be an even number misplaced at an odd index (due to the equal count constraint)
- We can swap these misplaced numbers to fix two positions at once

## Code Implementation

Let me write a solution in JavaScript with detailed comments:

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParityII(nums) {
  // Initialize two pointers
  let evenPtr = 0; // Points to even indices (0, 2, 4...)
  let oddPtr = 1; // Points to odd indices (1, 3, 5...)
  const n = nums.length;

  // Continue until we reach the end with either pointer
  while (evenPtr < n && oddPtr < n) {
    // If even number is at even index, move to next even index
    if (nums[evenPtr] % 2 === 0) {
      evenPtr += 2;
      continue;
    }

    // If odd number is at odd index, move to next odd index
    if (nums[oddPtr] % 2 === 1) {
      oddPtr += 2;
      continue;
    }

    // At this point, we have:
    // - An odd number at an even index (evenPtr)
    // - An even number at an odd index (oddPtr)
    // So we swap them
    [nums[evenPtr], nums[oddPtr]] = [nums[oddPtr], nums[evenPtr]];

    // Move both pointers to next positions
    evenPtr += 2;
    oddPtr += 2;
  }

  return nums;
}
```

## Complexity Analysis

Time Complexity: O(n)

- We traverse the array once with our two pointers
- Each element is looked at at most once
- Swaps are O(1) operations

Space Complexity: O(1)

- We only use two pointers regardless of input size
- The solution modifies the array in-place

## Alternative Solutions

An alternative approach could use extra space:

- Create two separate arrays for even and odd numbers
- Place them back into the original array at correct positions
  This would be O(n) space complexity but might be more readable.

## Practice Recommendations

Similar problems to practice this pattern:

- LeetCode 905: Sort Array By Parity
- LeetCode 1470: Shuffle the Array
- LeetCode 280: Wiggle Sort
  These problems involve array manipulation with multiple pointers and maintaining specific ordering properties.

## Let me create a flowchart to visualize the solution

To solidify your understanding, try to:

1. Trace the algorithm with a small example like [4, 5, 2, 7]
2. Identify why the solution works even when multiple elements are misplaced
3. Think about why we don't need to worry about running out of matching elements to swap

Would you like me to walk you through any specific part of the solution in more detail, or would you like to see how the algorithm works with a specific example?
