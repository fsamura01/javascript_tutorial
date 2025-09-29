# **75. Sort Colors**

I'll guide you through solving the "Sort Colors" problem using the Dutch National Flag algorithm, which is an excellent example of the two-pointer (or three-pointer) technique.

## **Problem Understanding**

The problem requires sorting an array containing only three distinct values (0, 1, 2) in-place, representing red, white, and blue colors. The key constraints are:

- Sort in-place
- Use only constant extra space
- Complete the sorting in a single pass
- The final array should have 0s first, then 1s, then 2s

## **Problem Breakdown**

This problem is a classic sorting challenge with unique constraints:

1. We can't use standard library sorting functions
2. We need an O(n) time complexity solution
3. We must use O(1) extra space
4. The array must be sorted in a single pass

## **Pattern Identification**

The key pattern here is the **Three-Pointer Technique** (Dutch National Flag Algorithm), which is a specialized two-pointer approach for sorting an array with three distinct values.

## **Approach Discussion**

Let's develop a solution using three pointers:

1. `low` pointer: tracks the rightmost boundary of 0s
2. `mid` pointer: current element being examined
3. `high` pointer: leftmost boundary of 2s

The algorithm works as follows:

- If the current element is 0, swap with `low` pointer and move both `low` and `mid` forward
- If the current element is 1, just move `mid` forward
- If the current element is 2, swap with `high` pointer and move `high` backward

### **Code Implementation**

I'll create an artifact with the solution:

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    // Three pointers approach
    let low = 0;       // boundary for 0s
    let mid = 0;       // current element
    let high = nums.length - 1;  // boundary for 2s
    
    // Single pass sorting
    while (mid <= high) {
        switch(nums[mid]) {
            case 0:
                // Swap current element with low pointer
                [nums[low], nums[mid]] = [nums[mid], nums[low]];
                low++;
                mid++;
                break;
            case 1:
                // Just move mid pointer forward
                mid++;
                break;
            case 2:
                // Swap current element with high pointer
                [nums[mid], nums[high]] = [nums[high], nums[mid]];
                high--;
                break;
        }
    }
};

// Test cases
console.log("Test Case 1:");
let nums1 = [2,0,2,1,1,0];
sortColors(nums1);
console.log(nums1);  // Expected: [0,0,1,1,2,2]

console.log("Test Case 2:");
let nums2 = [2,0,1];
sortColors(nums2);
console.log(nums2);  // Expected: [0,1,2]
```

## **Complexity Analysis**

- **Time Complexity**: O(n) - we make a single pass through the array
- **Space Complexity**: O(1) - we modify the array in-place using only a constant amount of extra space

Let's create a flowchart to illustrate the algorithm:

## **Alternative Solutions**

1. **Counting Approach**:
   - Count the occurrences of 0, 1, and 2
   - Overwrite the array in two passes
   - Less optimal (requires two passes)

2. **Library Sort (Not Allowed)**:
   - Use built-in sort function
   - Violates problem constraints

## **Practice Recommendations**

Similar LeetCode problems to practice this pattern:

1. [LeetCode 283: Move Zeroes](https://leetcode.com/problems/move-zeroes/)
2. [LeetCode 31: Next Permutation](https://leetcode.com/problems/next-permutation/)
3. [LeetCode 75: Partition Array](https://leetcode.com/problems/partition-array/)

## **Key Takeaways**

- Three-pointer technique is powerful for in-place sorting of limited-value arrays
- Always look for ways to solve problems in a single pass
- Constant extra space doesn't mean no extra variables, but minimal additional memory

## **Interview Tips**

- Communicate your thought process
- Explain the algorithm before coding
- Discuss time and space complexity
- Show how you handle edge cases

The Dutch National Flag algorithm is a classic example of an elegant, efficient sorting technique that goes beyond traditional sorting methods. It demonstrates how understanding the specific constraints of a problem can lead to a highly optimized solution.

Would you like me to elaborate on any part of the solution or discuss the approach in more depth?
