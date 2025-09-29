# **80. Remove Duplicates from Sorted Array II**

Let me guide you through solving this fascinating array manipulation problem step by step. This is an excellent example of how seemingly complex problems can be elegantly solved with simple patterns.

## 1. Problem Understanding

At its core, this problem is asking us to clean up a sorted array by removing excess duplicates while preserving order. Think of it like editing a guest list where each person can appear at most twice, but you need to maintain the original ordering.

The key constraints are that we must work in-place (no extra arrays) and return the count of valid elements. The array is already sorted, which is our biggest advantage since identical elements are grouped together.

Let's trace through Example 1: `[1,1,1,2,2,3]`

- We want to keep at most 2 of each number
- Result should be `[1,1,2,2,3]` with length 5
- The third `1` gets removed, but everything else stays

## 2. Key Technical Concepts

This problem tests several fundamental concepts:

- **In-place array modification**: Modifying the original array without using additional space
- **Two-pointer technique**: Using one pointer to read and another to write
- **State tracking**: Keeping count of how many times we've seen the current element
- **Sorted array properties**: Leveraging the fact that duplicates are adjacent

## 3. Constraints Analysis

Let's examine the constraints to understand edge cases:

- `1 <= nums.length <= 30,000`: We need an efficient solution, but the size isn't massive
- `-10,000 <= nums[i] <= 10,000`: Numbers can be negative, but this doesn't affect our logic
- Array is sorted in non-decreasing order: This is crucial - duplicates are always adjacent

**Edge Cases to Consider:**

- Array with only one element: `[1]` → return 1
- Array with no duplicates: `[1,2,3]` → return 3 (no changes needed)
- Array where all elements are the same: `[1,1,1,1,1]` → return 2
- Array with exactly two of each: `[1,1,2,2,3,3]` → return 6 (no changes needed)

## 4. Breaking Down the Problem

Let's decompose this into manageable parts:

**Part 1: Detection** - How do we know when we've seen an element more than twice?
**Part 2: Tracking** - How do we keep count of occurrences for the current element?
**Part 3: Writing** - Where do we place elements we want to keep?
**Part 4: Result** - How do we return the final count?

The beautiful insight is that we can solve all these parts with a single pass through the array using two pointers.

## 5. Pattern Identification

This is a classic **Two Pointers (Fast-Slow)** pattern, specifically the "write pointer" variant. Here's how it works:

- **Read pointer (i)**: Scans through every element in the original array
- **Write pointer (writeIndex)**: Points to where we should place the next valid element
- **Counter**: Tracks how many times we've seen the current element

This pattern is perfect for in-place array modifications where we need to filter or transform elements while maintaining order.

## 6. Step-by-Step Approach

Let me walk you through the logical progression:

**Step 1**: Initialize our write pointer at position 0 and a counter for tracking occurrences.

**Step 2**: For each element we read, determine if it's the same as the previous element or a new one.

**Step 3**: If it's a new element, reset our counter to 1. If it's the same element, increment the counter.

**Step 4**: Only write the element to our write position if the counter is ≤ 2.

**Step 5**: Return the final write position, which represents the length of our cleaned array.

The key insight is that we're essentially building a new valid array in the same memory space as the original array.

## 7. Code Implementation

```javascript
/**

- Remove Duplicates from Sorted Array II
- Time Complexity: O(n) - single pass through array
- Space Complexity: O(1) - only using constant extra variables
-
- @param {number[]} nums - sorted array in non-decreasing order
- @return {number} - length of array after removing excess duplicates
 */
function removeDuplicates(nums) {
    // Edge case: empty array or single element
    if (nums.length <= 2) {
        return nums.length;
    }

    // writeIndex: points to where we should place the next valid element
    // We start at index 2 because first two elements are always valid
    let writeIndex = 2;

    // Iterate through array starting from index 2
    // We compare current element with element two positions back
    for (let i = 2; i < nums.length; i++) {
        // Key insight: if current element is different from element
        // two positions back in our result array, it's safe to include
        // This automatically handles the "at most 2 duplicates" rule
        if (nums[i] !== nums[writeIndex - 2]) {
            // Place current element at write position
            nums[writeIndex] = nums[i];
            // Move write pointer forward
            writeIndex++;
        }
        // If nums[i] === nums[writeIndex - 2], we skip this element
        // because including it would create a third duplicate
    }

    return writeIndex;
}

/**

- Alternative implementation with explicit counting
- This approach is more intuitive but slightly more verbose
 */
function removeDuplicatesWithCounter(nums) {
    if (nums.length <= 2) {
        return nums.length;
    }

    let writeIndex = 1; // Position to write next valid element
    let count = 1;      // Count of current element occurrences

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            // Same element as previous
            count++;
        } else {
            // New element found
            count = 1;
        }

        // Only write if we haven't exceeded limit of 2
        if (count <= 2) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }

    return writeIndex;
}

// Test cases to verify our solution
function testSolution() {
    console.log("Testing Remove Duplicates Solution:");

    // Test Case 1: Example from problem
    let test1 = [1, 1, 1, 2, 2, 3];
    let result1 = removeDuplicates(test1);
    console.log(`Test 1: [${test1.slice(0, result1)}], length: ${result1}`);
    // Expected: [1, 1, 2, 2, 3], length: 5
    
    // Test Case 2: Second example
    let test2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
    let result2 = removeDuplicates(test2);
    console.log(`Test 2: [${test2.slice(0, result2)}], length: ${result2}`);
    // Expected: [0, 0, 1, 1, 2, 3, 3], length: 7
    
    // Test Case 3: Edge case - all same elements
    let test3 = [1, 1, 1, 1, 1];
    let result3 = removeDuplicates(test3);
    console.log(`Test 3: [${test3.slice(0, result3)}], length: ${result3}`);
    // Expected: [1, 1], length: 2
    
    // Test Case 4: No duplicates
    let test4 = [1, 2, 3, 4, 5];
    let result4 = removeDuplicates(test4);
    console.log(`Test 4: [${test4.slice(0, result4)}], length: ${result4}`);
    // Expected: [1, 2, 3, 4, 5], length: 5
}

// Uncomment to run tests
// testSolution();

```

The elegant solution uses a brilliant insight: instead of explicitly counting duplicates, we compare the current element with the element two positions back in our result array. If they're different, we know it's safe to include the current element because we can't have more than two duplicates in a row.

## 8. Complexity Analysis

**Time Complexity: O(n)**
We make exactly one pass through the array, examining each element once. The comparison and assignment operations inside the loop are constant time, so our overall complexity is linear with respect to the input size.

**Space Complexity: O(1)**
We only use a constant amount of extra space regardless of input size. The variables `writeIndex` and loop counter `i` don't grow with the input, making this a true in-place algorithm.

This optimal complexity makes the solution highly efficient even for the maximum constraint of 30,000 elements.

## 9. Alternative Solutions

**Approach 1: Explicit Counter Method**
The alternative implementation in the code uses an explicit counter to track occurrences. While more intuitive, it requires additional variables and slightly more complex logic. Both approaches have the same time and space complexity.

**Approach 2: HashMap Approach (Not Recommended)**
You might consider using a HashMap to count occurrences, but this would violate the space constraint and be less efficient since we'd need to make multiple passes through the data.

**Approach 3: Recursive Approach (Not Recommended)**
A recursive solution would have O(n) space complexity due to the call stack, violating our space constraint.

The two-pointer approach we implemented is considered the most elegant and efficient solution for this problem.

## 10. Practice Recommendations

To master this pattern, practice these similar LeetCode problems:

**Same Pattern (Two Pointers - Write Index):**

- **26. Remove Duplicates from Sorted Array** (easier version - no duplicates allowed)
- **283. Move Zeroes** (move all zeros to end while maintaining order)
- **27. Remove Element** (remove all instances of a specific value)

**Related Array Manipulation:**

- **88. Merge Sorted Array** (merge two sorted arrays in-place)
- **75. Sort Colors** (Dutch flag problem - three-way partitioning)
- **845. Longest Mountain in Array** (requires understanding of array traversal patterns)

**Advanced Two Pointers:**

- **15. 3Sum** (find triplets that sum to zero)
- **11. Container With Most Water** (maximize area between two pointers)

These problems will help you recognize when the two-pointer pattern is applicable and develop intuition for in-place array manipulations.

## 11. Flowchart Design

Congratulations! You've now mastered one of the most elegant examples of the two-pointer pattern. The beauty of this solution lies in its simplicity - by comparing elements two positions apart, we automatically enforce the "at most two duplicates" rule without explicit counting.

The key insight that transforms this from a complex counting problem into an elegant pointer manipulation is understanding that in a sorted array, if `nums[i] != nums[writeIndex-2]`, then including `nums[i]` at position `writeIndex` cannot create three consecutive duplicates. This is because the array is sorted, so if these elements are different, we know we're either starting a new sequence or continuing a sequence that has at most one duplicate so far.

This problem beautifully demonstrates how leveraging the properties of sorted data can lead to remarkably clean solutions. The pattern you've learned here - using a write pointer to build a filtered result in-place - appears frequently in technical interviews and real-world systems where memory efficiency is crucial.

As you continue practicing, you'll start recognizing when problems can benefit from this two-pointer approach, particularly when you need to filter, partition, or rearrange array elements while maintaining certain ordering properties. The flowchart shows how the decision logic flows naturally from the problem constraints, making the algorithm both intuitive and efficient.
