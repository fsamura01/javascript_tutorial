# LeetCode Problem 2441: Largest Positive Integer That Exists With Its Negative

## 1. Problem Understanding

Let me first break down what this problem is asking:

Given an integer array `nums`, you need to find the largest positive integer that appears in the array, where its negative counterpart also appears in the array. If there's no such integer, return -1.

For example:

- If `nums = [1, 2, 3, -1]`, the answer is 1 because both 1 and -1 are in the array.
- If `nums = [5, 6, -5, 7]`, the answer is 5 because both 5 and -5 are in the array.
- If `nums = [1, 2, 3, 4]`, the answer is -1 because none of these numbers have their negative counterparts in the array.

The constraints are typically:

- 1 ≤ nums.length ≤ 1000
- -1000 ≤ nums[i] ≤ 1000
- nums[i] ≠ 0 (no zeros in the array)

## 2. Pattern Identification

This problem involves searching for specific elements within an array. The most appropriate pattern here is a **Hash Set** approach. We need to efficiently check if the negative of each positive number exists in the array, and then find the maximum such positive number.

## 3. Approach Discussion

Let's develop our approach step-by-step:

1. We need to find pairs of numbers where both a positive number and its negative counterpart exist in the array.
2. A naive approach would be to check each positive number against all other numbers, but that would be O(n²).
3. Instead, we can use a hash set for O(1) lookups to check if the negative counterpart exists.
4. We'll iterate through the array once to build the hash set.
5. Then we'll iterate through the array again, checking only positive numbers to see if their negatives exist in the set.
6. We'll keep track of the maximum positive number that satisfies this condition.

## 4. Code Implementation

Here's the JavaScript implementation with detailed comments:

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxK(nums) {
    // Create a hash set to store all numbers in the array
    const numSet = new Set(nums);
    
    // Initialize the result to -1 (default return value if no valid number is found)
    let maxK = -1;
    
    // Iterate through each number in the array
    for (const num of nums) {
        // We only need to check positive numbers
        if (num > 0) {
            // Check if its negative counterpart exists in the set
            if (numSet.has(-num)) {
                // Update maxK if this number is larger than the current maximum
                maxK = Math.max(maxK, num);
            }
        }
    }
    
    // Return the largest valid number found, or -1 if none exists
    return maxK;
}
```

## 5. Complexity Analysis

**Time Complexity**: O(n) where n is the length of the array

- Building the hash set takes O(n) time
- Iterating through the array to find the maximum valid number also takes O(n) time

**Space Complexity**: O(n)

- In the worst case, all elements in the array are unique, so our hash set will store n elements

## 6. Alternative Solutions

### Alternative Approach 1: Two-Pass with Single Set

We could slightly optimize our approach by doing two separate passes:

```javascript
function findMaxK(nums) {
    const numSet = new Set(nums);
    let maxK = -1;
    
    // Only check positive numbers in the set
    for (const num of numSet) {
        if (num > 0 && numSet.has(-num)) {
            maxK = Math.max(maxK, num);
        }
    }
    
    return maxK;
}
```

### Alternative Approach 2: Single-Pass Solution

We can also solve this in a single pass by maintaining two sets - one for positive numbers and one for negative numbers:

```javascript
function findMaxK(nums) {
    const positives = new Set();
    const negatives = new Set();
    
    // Populate both sets in a single pass
    for (const num of nums) {
        if (num > 0) positives.add(num);
        else negatives.add(num);
    }
    
    let maxK = -1;
    
    // Check each positive number against the negatives set
    for (const num of positives) {
        if (negatives.has(-num)) {
            maxK = Math.max(maxK, num);
        }
    }
    
    return maxK;
}
```

## 7. Practice Recommendations

If you enjoyed this problem, here are similar LeetCode problems that use the same pattern of hash sets and pair matching:

1. **Two Sum (Problem #1)** - Find two numbers that add up to a target
2. **Find All Numbers Disappeared in an Array (Problem #448)** - Similar set-based approach
3. **Find the Duplicate Number (Problem #287)** - Hash set solution is straightforward
4. **Intersection of Two Arrays (Problem #349)** - Uses sets to find common elements
5. **Pairs of Songs With Total Durations Divisible by 60 (Problem #1010)** - Similar pattern of finding pairs with a specific relationship

## 8. Flowchart Design

## Summary

The problem "Largest Positive Integer That Exists With Its Negative" is a classic example of using hash sets to efficiently search for related elements in an array.

The key insights are:

1. We need to find positive numbers that have their negative counterparts in the array
2. Using a hash set gives us O(1) lookup time, dramatically improving efficiency
3. We only need to check positive numbers, since we're looking for the largest positive integer

The solution has a linear time complexity O(n) and space complexity O(n), making it efficient for the given constraints. The pattern of using a hash set to check for the existence of related elements is a common technique in many array and string problems, so mastering this approach will help you solve a wide range of competitive programming challenges.

When approaching similar problems, remember to consider:

1. Can we use a data structure to avoid nested loops?
2. Can we break down the problem to avoid checking unnecessary cases?
3. Are there mathematical relationships between elements that we can leverage?

This problem demonstrates how a thoughtful choice of data structure can transform a potentially quadratic solution into a linear one. This optimization pattern is a cornerstone of efficient algorithm design.

## Two-Pointer Approach for LeetCode Problem 2441

Let me rethink this problem using a two-pointer approach instead of the hash set solution.

### Problem Understanding Refresher

We need to find the largest positive integer in the array `nums` that also has its negative counterpart in the array. If no such pair exists, we return -1.

### Two-Pointer Approach

The two-pointer technique typically works best on sorted arrays. Here's how we can adapt it for this problem:

1. Sort the array first
2. Use two pointers - one starting from the left and one from the right
3. Since the array is sorted, negative numbers will be on the left side and positive numbers on the right side
4. We'll check if any pairs sum to zero (meaning they're negatives of each other)

### Step-by-Step Approach

1. Sort the array in ascending order
2. Initialize `left` pointer at the beginning (smallest, most negative value)
3. Initialize `right` pointer at the end (largest, most positive value)
4. While the pointers haven't crossed:
   - If `nums[left] + nums[right] = 0`, we found a valid pair
   - If `nums[left] + nums[right] < 0`, move `left` pointer right
   - If `nums[left] + nums[right] > 0`, move `right` pointer left
5. Keep track of the maximum value found

### Code Implementation

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxK(nums) {
    // Sort the array in ascending order
    nums.sort((a, b) => a - b);
    
    // Initialize pointers
    let left = 0;
    let right = nums.length - 1;
    
    // Initialize result
    let maxK = -1;
    
    // While the pointers haven't crossed
    while (left < right) {
        // Calculate the sum
        const sum = nums[left] + nums[right];
        
        if (sum === 0) {
            // If sum is 0, we found a valid pair
            // Update maxK with the positive number (which is at the right pointer)
            maxK = Math.max(maxK, nums[right]);
            
            // Move both pointers inward to check for more pairs
            left++;
            right--;
        } else if (sum < 0) {
            // If sum is negative, the left value is too small (too negative)
            // Move left pointer to the right to get a less negative value
            left++;
        } else {
            // If sum is positive, the right value is too large
            // Move right pointer to the left to get a smaller positive value
            right--;
        }
    }
    
    return maxK;
}
```

### Complexity Analysis

**Time Complexity**: O(n log n)

- Sorting the array takes O(n log n) time, which dominates the time complexity
- The two-pointer traversal afterward takes O(n) time

**Space Complexity**: O(1) or O(log n)

- We use constant extra space (just the two pointers)
- The space complexity of the sorting algorithm is implementation-dependent (usually O(log n) for the call stack in quicksort)

### Why This Works

This approach leverages the properties of a sorted array:

1. All negative numbers are on the left side
2. All positive numbers are on the right side
3. The absolute values increase as you move away from the center

The two-pointer technique efficiently finds all pairs that sum to zero (which means one is the negative of the other). The furthest right pointer that forms such a pair corresponds to our answer - the largest positive integer with its negative counterpart in the array.

### Advantages and Disadvantages

**Advantages:**

- Uses O(1) extra space instead of O(n) for the hash set approach
- Works well with the natural structure of the problem (looking for positive/negative pairs)

**Disadvantages:**

- Requires sorting, which increases time complexity to O(n log n) compared to O(n) for the hash set approach
- Modifies the original array (though you could create a copy if needed)

### Updated Flowchart

### Practice Recommendations for Two-Pointer Technique

If you want to master the two-pointer technique, here are some excellent LeetCode problems to practice:

1. **Two Sum II - Input Array Is Sorted (Problem #167)** - A classic two-pointer problem
2. **Remove Duplicates from Sorted Array (Problem #26)** - Uses two pointers to process an array in-place
3. **3Sum (Problem #15)** - Extension of two-pointer approach to find triplets
4. **Container With Most Water (Problem #11)** - Creative application of two pointers
5. **Trapping Rain Water (Problem #42)** - Advanced two-pointer problem
6. **Sort Colors (Problem #75)** - Dutch national flag problem using a variation of two pointers

### Comparing Approaches

| Aspect | Hash Set Approach | Two-Pointer Approach |
|--------|-------------------|----------------------|
| Time Complexity | O(n) | O(n log n) |
| Space Complexity | O(n) | O(1) |
| Preserves Original Array | Yes | No (sorts the array) |
| When to Prefer | When time efficiency is critical | When space efficiency is critical |

### Learning Insights

The two-pointer approach to this problem teaches us several important lessons:

1. **Sorting can reveal structure**: By sorting the array, we revealed an inherent structure that made the problem easier to solve with two pointers.

2. **Time-Space trade-off**: We traded better time complexity (O(n)) for better space complexity (O(1)). This is a common trade-off in algorithm design.

3. **Pointer movement**: The direction in which we move pointers depends on the current state compared to our target (in this case, a sum of 0).

4. **Adaptability of techniques**: The same core problem can be solved with different algorithmic approaches, each with their own advantages.

The two-pointer technique is particularly useful for problems involving:

- Sorted arrays
- Finding pairs with a specific sum
- Partitioning problems
- Palindrome or similar string problems

By recognizing when to apply this technique, you'll be able to solve a wide variety of array and string problems efficiently. While the hash set approach was more time-efficient for this particular problem, the two-pointer solution demonstrates an alternative way of thinking that might be more optimal in other scenarios, especially when memory is constrained.
