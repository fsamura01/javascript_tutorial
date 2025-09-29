# K-Distant Indices in an Array

I'll guide you through solving this problem step by step, focusing on building a clear understanding of both the problem and its solution.

## 1. Problem Understanding

This problem asks us to find all indices in an array that are at most k positions away from any occurrence of a specific value (key). Let's break it down:

- We have an array `nums`
- We're looking for a specific value `key` in this array
- We want to find all indices `i` where there exists at least one index `j` such that:
  - `nums[j] == key` (the value at index j equals our target key)
  - `|i - j| <= k` (the distance between indices i and j is at most k)
- We need to return these indices in sorted order

In simpler terms: find all positions in the array that are within k steps of any occurrence of the key value.

## 2. Pattern Identification

This problem doesn't fit neatly into common patterns like sliding window or two pointers. Instead, it's primarily about:

1. Finding all occurrences of the key in the array
2. For each occurrence, marking all indices within distance k as "k-distant"
3. Collecting all k-distant indices without duplicates

The core approach here is array traversal with distance calculation.

## 3. Approach Discussion

Let's develop a clear approach:

1. First, find all indices where `nums[j] == key`
2. For each such index j, mark all indices i where `|i - j| <= k` as k-distant
3. Collect all these k-distant indices, remove duplicates, and sort them

We can implement this efficiently by:

- First scanning the array to find all occurrences of the key
- For each occurrence, calculating the range of affected indices (from j-k to j+k)
- Using a Set to automatically handle duplicates
- Converting the Set to a sorted array for the final result

## 4. Code Implementation

```javascript
/**
 * @param {number[]} nums - Input array of integers
 * @param {number} key - The target value to find in the array
 * @param {number} k - The maximum allowed distance between indices
 * @return {number[]} - Sorted array of all k-distant indices
 */
function findKDistantIndices(nums, key, k) {
    // Step 1: Find all indices where nums[j] equals key
    const keyIndices = [];
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] === key) {
            keyIndices.push(j);
        }
    }
    
    // Step 2: Use a Set to collect k-distant indices without duplicates
    const kDistantSet = new Set();
    
    // Step 3: For each key index, mark all indices within distance k
    for (const j of keyIndices) {
        // Calculate the valid range: from max(0, j-k) to min(nums.length-1, j+k)
        const startIdx = Math.max(0, j - k);
        const endIdx = Math.min(nums.length - 1, j + k);
        
        // Add all indices in this range to our set
        for (let i = startIdx; i <= endIdx; i++) {
            kDistantSet.add(i);
        }
    }
    
    // Step 4: Convert Set to array and sort in ascending order
    // (though the indices should already be in order due to how we added them)
    return Array.from(kDistantSet).sort((a, b) => a - b);
}

// Test Case 1
const nums1 = [3, 4, 9, 1, 3, 9, 5];
const key1 = 9;
const k1 = 1;
console.log(findKDistantIndices(nums1, key1, k1)); // Expected: [1, 2, 3, 4, 5, 6]

// Test Case 2
const nums2 = [2, 2, 2, 2, 2];
const key2 = 2;
const k2 = 2;
console.log(findKDistantIndices(nums2, key2, k2)); // Expected: [0, 1, 2, 3, 4]
```

Let's implement this solution in JavaScript:

Let me walk through the key components of this solution:

1. **Finding key indices**: We first scan the array to find all positions where the key appears. This gives us our "source" indices.

2. **Using a Set for unique values**: JavaScript's Set object automatically handles duplicates, which is perfect for our use case. If multiple key occurrences would mark the same index as k-distant, we only need to include it once in our result.

3. **Calculating valid ranges**: For each key occurrence at index j, we calculate the range of affected indices:
   - The start index is `Math.max(0, j - k)` to ensure we don't go below index 0
   - The end index is `Math.min(nums.length - 1, j + k)` to ensure we don't exceed the array bounds

4. **Final sorting**: We convert our Set to an array and sort it, though the sorting might be unnecessary based on how we populate the Set (indices are added in ascending order).

## 5. Complexity Analysis

Let's analyze the time and space complexity:

**Time Complexity**: O(n)

- Finding all key indices takes O(n) time
- For each key index, we might mark up to 2k+1 indices as k-distant
- In the worst case (if all elements are the key), we could process each index k times
- However, the Set ensures we only process each index once
- Sorting the final result would technically be O(n log n), but since indices are already in order, it's essentially O(n)

**Space Complexity**: O(n)

- In the worst case, all indices could be k-distant, requiring O(n) space for the Set
- We also use O(n) space for storing key indices in the worst case

## 6. Alternative Solutions

```javascript
/**
 * @param {number[]} nums - Input array of integers
 * @param {number} key - The target value to find in the array
 * @param {number} k - The maximum allowed distance between indices
 * @return {number[]} - Sorted array of all k-distant indices
 */
function findKDistantIndices(nums, key, k) {
    const result = [];
    
    // For each index i in nums
    for (let i = 0; i < nums.length; i++) {
        // Check if there's any index j where |i-j| <= k and nums[j] == key
        let isKDistant = false;
        
        // We only need to check indices j where j is at most k away from i
        // This limits our search range to improve efficiency
        const startJ = Math.max(0, i - k);
        const endJ = Math.min(nums.length - 1, i + k);
        
        for (let j = startJ; j <= endJ; j++) {
            if (nums[j] === key) {
                isKDistant = true;
                break; // We found one valid j, no need to check further
            }
        }
        
        if (isKDistant) {
            result.push(i);
        }
    }
    
    return result; // Already in ascending order
}

// Test Case 1
const nums1 = [3, 4, 9, 1, 3, 9, 5];
const key1 = 9;
const k1 = 1;
console.log(findKDistantIndices(nums1, key1, k1)); // Expected: [1, 2, 3, 4, 5, 6]

// Test Case 2
const nums2 = [2, 2, 2, 2, 2];
const key2 = 2;
const k2 = 2;
console.log(findKDistantIndices(nums2, key2, k2)); // Expected: [0, 1, 2, 3, 4]
```

Let's consider an alternative approach that might be more intuitive for some:

This alternative approach directly implements the problem statement:

- For each index i, we check if it's a k-distant index by looking for at least one index j that satisfies the conditions
- Once we find one such j, we can immediately mark i as k-distant and move on
- This approach is more intuitive and follows the problem definition more directly

### Comparing the Two Approaches

1. **First Solution** (finding key indices first):
   - More efficient when k is large and key is rare
   - Does less redundant checking
   - Uses a Set to handle duplicates

2. **Second Solution** (checking each index directly):
   - More intuitive and directly matches the problem statement
   - Potentially more efficient when k is small or key is common
   - Simplifies the logic by checking one index at a time

Both approaches have a similar time complexity in the worst case, but the first approach might be more efficient in practice for large arrays with few occurrences of the key.

## 7. Practice Recommendations

Here are similar problems you might want to practice to reinforce this pattern:

1. **LeetCode #1608**: Special Array With X Elements Greater Than or Equal X
2. **LeetCode #1385**: Find the Distance Value Between Two Arrays
3. **LeetCode #1337**: The K Weakest Rows in a Matrix
4. **LeetCode #1539**: Kth Missing Positive Number

These problems also involve array traversal with various forms of distance or count calculations.

Let me create a flowchart to visualize the solution:

## Key Insights and Learning Points

1. **Problem Analysis**: This problem teaches us how to carefully analyze the requirements and translate them into algorithmic steps. Understanding what "k-distant" means is the key to solving it effectively.

2. **Set Usage**: The problem demonstrates a perfect use case for Sets in JavaScript to eliminate duplicates automatically.

3. **Range Calculations**: We learn how to calculate valid ranges within array bounds using Math.max and Math.min, which is a common technique in array problems.

4. **Early Termination**: In our alternative solution, we use early termination with the `break` statement once we find a single valid j. This optimization is important when dealing with large datasets.

5. **Edge Cases**: The solution naturally handles edge cases:
   - When k is large (potentially larger than the array size)
   - When all elements are the key or none of them are
   - When the array has only one element

## Conclusion

This problem illustrates a common array traversal pattern with distance calculations. While it doesn't fit neatly into standard algorithm patterns like sliding window or two pointers, it teaches valuable skills in array manipulation and efficient searching.

The first solution (using key indices and a Set) is generally more efficient for most scenarios, especially when k is large and the key is relatively rare in the array. However, the alternative approach is more intuitive and directly implements the problem statement.

Understanding both approaches gives you flexibility to choose the most appropriate one based on the specific constraints and characteristics of the input data.

Would you like me to elaborate on any particular aspect of the solution or discuss how this approach might be adapted for similar problems?

I'll provide a more detailed explanation of how we calculate the range of affected indices for each occurrence of the key value.

## Calculating the Range of Affected Indices

When we find an occurrence of the key value at index `j`, we need to determine which other indices would be considered "k-distant" from this occurrence. According to the problem definition, an index `i` is k-distant if `|i - j| <= k`, meaning the absolute difference between indices `i` and `j` is at most `k`.

Let's break this down step by step:

### Mathematical Understanding

If we have the key value at index `j`, then any index `i` that satisfies `|i - j| <= k` is k-distant. This translates to:

```javascript
|i - j| <= k
```

Which means:

```javascript
-k <= i - j <= k
```

Rearranging to isolate `i`:

```javascript
j - k <= i <= j + k
```

This gives us a range of indices: from `j - k` to `j + k`.

### Practical Implementation

In our solution, for each key occurrence at index `j`, we calculate:

1. **Lower bound (startIdx)**: `j - k`
   - But we need to ensure we don't go below index 0 (the first element of the array)
   - So we use `Math.max(0, j - k)`

2. **Upper bound (endIdx)**: `j + k`
   - But we need to ensure we don't exceed the last index of the array (nums.length - 1)
   - So we use `Math.min(nums.length - 1, j + k)`

### Concrete Example

Let's use the example from the problem:

- `nums = [3, 4, 9, 1, 3, 9, 5]`
- `key = 9`
- `k = 1`

The key value 9 appears at indices 2 and 5.

For the occurrence at index 2:

- startIdx = Math.max(0, 2 - 1) = Math.max(0, 1) = 1
- endIdx = Math.min(6, 2 + 1) = Math.min(6, 3) = 3

So indices 1, 2, and 3 are k-distant because of the key at index 2.

For the occurrence at index 5:

- startIdx = Math.max(0, 5 - 1) = Math.max(0, 4) = 4
- endIdx = Math.min(6, 5 + 1) = Math.min(6, 6) = 6

So indices 4, 5, and 6 are k-distant because of the key at index 5.

### Visualizing the Range

Here's a visual representation for this example:

```javascript
  0  1  2  3  4  5  6   (indices)
[ 3, 4, 9, 1, 3, 9, 5 ] (values)
      ^        ^        (key occurrences)
   |-----|              (range for key at index 2)
            |-----|     (range for key at index 5)
```

When we combine these ranges, we get indices 1, 2, 3, 4, 5, and 6 as k-distant indices.

### In the Code

In our solution, we implement this logic as follows:

```javascript
// For each key index j
for (const j of keyIndices) {
    // Calculate the valid range
    const startIdx = Math.max(0, j - k);
    const endIdx = Math.min(nums.length - 1, j + k);
    
    // Add all indices in this range to our set
    for (let i = startIdx; i <= endIdx; i++) {
        kDistantSet.add(i);
    }
}
```

This ensures that for each occurrence of the key, we mark all indices within distance k as k-distant, while respecting the array boundaries.

Does this explanation help clarify how we calculate the range of affected indices for each key occurrence?
