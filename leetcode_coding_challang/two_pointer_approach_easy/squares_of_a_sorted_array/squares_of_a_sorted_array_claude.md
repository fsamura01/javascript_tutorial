# **977. Squares of a Sorted Array**

Let me guide you through solving the "Squares of a Sorted Array" problem with a focus on building a strong understanding of the underlying patterns and problem-solving approach.

## **1. Problem Understanding**

Let's first break down what this problem is asking us to do. Given an array of integers sorted in non-decreasing order, we need to:

- Square each number in the array
- Return a new array of the squared numbers in non-decreasing order

Key constraints and observations:

- The input array is already sorted in non-decreasing order
- The array can contain both negative and positive integers
- We need to maintain sorted order in the output
- Array length ranges from 1 to 10^4
- Numbers in the array range from -10^4 to 10^4

## **2. Pattern Identification**

This problem presents an interesting twist on sorting. While our initial instinct might be to square everything and sort (which would work), we can leverage the fact that the input array is already sorted and use the Two Pointers pattern. Here's why:

When we square numbers, two interesting things happen:

- Negative numbers become positive when squared
- The largest squared values will come from either the leftmost (most negative) or rightmost (most positive) elements

This naturally suggests using two pointers to compare elements from both ends of the array.

## **3. Approach Discussion**

Let's develop our solution step by step:

a. Since we know the result array will be the same size as the input array, we can create it upfront
b. Place two pointers:

- left pointer at the start (most negative numbers)
- right pointer at the end (most positive numbers)
  c. Compare squares of numbers at both pointers
  d. Place the larger squared value in the result array, working from right to left
  e. Move the corresponding pointer (left or right) accordingly

## **4. Code Implementation**

Let me write a solution in JavaScript with detailed comments:

```javascript
function sortedSquares(nums) {
  // Create result array of same length as input
  const result = new Array(nums.length);

  // Initialize two pointers
  let left = 0;
  let right = nums.length - 1;

  // Fill result array from right to left (largest to smallest)
  for (let i = nums.length - 1; i >= 0; i--) {
    // Square numbers at both pointers
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    // Compare squares and place larger one in result
    if (leftSquare > rightSquare) {
      result[i] = leftSquare;
      left++;
    } else {
      result[i] = rightSquare;
      right--;
    }
  }

  return result;
}
```

## **5. Complexity Analysis**

Time Complexity: O(n) where n is the length of the input array

- We only traverse the array once with our two pointers
- Each element is processed exactly once

Space Complexity: O(n)

- We create a new array to store the result
- No additional space is used beyond the output array

## **6. Alternative Solutions**

We could also solve this problem using a simpler approach:

```javascript
function sortedSquaresSimple(nums) {
  return nums.map((num) => num * num).sort((a, b) => a - b);
}
```

While this solution is more concise, it has a time complexity of O(n log n) due to the sorting step. Our two-pointer solution is more efficient with O(n) time complexity.

## **7. Practice Recommendations**

To master this pattern, try these related problems:

- LeetCode 15: 3Sum (uses multiple pointers)
- LeetCode 11: Container With Most Water
- LeetCode 167: Two Sum II - Input Array Is Sorted
- LeetCode 283: Move Zeroes

## **8. Solution Flowchart**

Let me create a flowchart to visualize the solution:

Key Learning Points:

1. When dealing with sorted arrays, consider using the two-pointer technique
2. Sometimes working backwards (right to left) can simplify the solution
3. Look for mathematical properties (like how squares affect negative numbers) that can be leveraged in your solution
4. Consider edge cases (all negative numbers, all positive numbers, zeros) when testing your solution

Would you like me to elaborate on any part of the solution or explore a specific aspect in more detail?
