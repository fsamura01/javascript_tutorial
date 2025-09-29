# Two Sum II - Input Array Is Sorted

## 1. Problem Understanding

This problem asks us to find two numbers in a sorted array that add up to a given target. Let's clarify the key points:

- We have a 1-indexed sorted array (meaning the first element is at index 1, not 0)
- We need to find two distinct numbers that sum to the target
- We need to return the indices (adjusted for 1-indexing) of these numbers
- There is exactly one solution guaranteed
- We must use constant extra space (O(1))
- The array is already sorted in non-decreasing order

The 1-indexed nature is just for the problem statement and result reporting - our implementation will work with 0-indexing and adjust the final answer.

## 2. Constraints of the Problem

Let's analyze the constraints to understand the problem boundaries:

- The array length can be as small as 2 and as large as 30,000 elements
- The array values range from -1000 to 1000
- The target value also ranges from -1000 to 1000
- The array is sorted (this is a crucial hint for our approach)
- We're guaranteed exactly one solution
- We must use O(1) extra space, which means no additional data structures that scale with input size
- We cannot use the same element twice

## 3. Breaking Down the Problem

Let's break this down into smaller parts:

1. We need to find two different elements that sum to the target
2. We need to do this efficiently, taking advantage of the sorted nature of the array
3. We need to use constant space
4. We need to return the indices (adjusted for 1-indexing)

## 4. Pattern Identification

This problem is perfect for the **Two Pointers** pattern. Since the array is sorted, we can use two pointers starting from opposite ends of the array and move them based on the sum comparison with the target.

The two-pointer technique works well here because:

- The array is sorted
- We need exactly two elements
- We need to optimize for space (O(1))

## 5. Approach Discussion

Here's a step-by-step approach using the two-pointer technique:

1. Initialize two pointers: `left` at the start of the array (index 0) and `right` at the end (index n-1)
2. Calculate the sum of the values at the `left` and `right` pointers
3. Compare the sum with the target:
   - If sum equals the target, we've found our answer
   - If sum is less than the target, increment the `left` pointer to increase the sum
   - If sum is greater than the target, decrement the `right` pointer to decrease the sum
4. Repeat steps 2-3 until we find the target sum
5. Return the indices (adding 1 to convert from 0-indexed to 1-indexed)

This approach works because the array is sorted. If the sum is too small, we need a larger number, so we move the left pointer right. If the sum is too large, we need a smaller number, so we move the right pointer left.

## 6. Code Implementation

Let's implement the solution in JavaScript:

```javascript
/**
 * @param {number[]} numbers - The sorted array of integers (0-indexed in code)
 * @param {number} target - The target sum we're looking for
 * @return {number[]} - The indices of the two numbers (adjusted to be 1-indexed)
 */
function twoSum(numbers, target) {
    // Initialize two pointers
    let left = 0;
    let right = numbers.length - 1;
    
    // Continue until the pointers meet
    while (left < right) {
        // Calculate current sum
        const currentSum = numbers[left] + numbers[right];
        
        // Check if we've found the target
        if (currentSum === target) {
            // Return 1-indexed positions
            return [left + 1, right + 1];
        }
        
        // If sum is too small, move left pointer to increase sum
        if (currentSum < target) {
            left++;
        } 
        // If sum is too large, move right pointer to decrease sum
        else {
            right--;
        }
    }
    
    // The problem guarantees a solution, so we should never reach here
    return [-1, -1];
}
```

## 7. Complexity Analysis

**Time Complexity:** O(n) where n is the length of the array.

- In the worst case, we might need to traverse the entire array once with our two pointers.

**Space Complexity:** O(1)

- We only use two pointers and a few variables, regardless of the input size.
- This satisfies the problem's requirement for constant extra space.

## 8. Alternative Solutions

### 1. Binary Search Approach

We could use a binary search approach with O(n log n) time complexity:

- For each element, use binary search to find the complementary element
- This is less efficient than our two-pointer approach

### 2. Hash Map Approach

We could use a hash map with O(n) time and O(n) space:

- Iterate through the array, storing each element and its index
- For each element, check if the complement (target - current) exists in the hash map
- While this has the same time complexity as our solution, it uses O(n) space and doesn't take advantage of the sorted nature of the array

The two-pointer approach is optimal for this problem because it leverages the sorted property of the array and meets the constant space requirement.

## 9. Practice Recommendations

If you want to practice similar problems using the two-pointer pattern, here are some recommendations:

1. **LeetCode 15: 3Sum** - Find triplets that sum to zero
2. **LeetCode 16: 3Sum Closest** - Find a triplet with sum closest to target
3. **LeetCode 11: Container With Most Water** - Two pointers from opposite ends
4. **LeetCode 42: Trapping Rain Water** - Two pointers with additional logic
5. **LeetCode 75: Sort Colors** - Three-pointer approach (Dutch national flag problem)
6. **LeetCode 125: Valid Palindrome** - Two pointers moving toward the center
7. **LeetCode 259: 3Sum Smaller** - Finding triplets with sum less than target
8. **LeetCode 977: Squares of a Sorted Array** - Two pointers from opposite directions

## 10. Flowchart Design

## Key Insights and Takeaways

1. **Leverage Sorted Properties**: When given a sorted array, consider how that property can simplify your approach. The two-pointer technique is especially powerful for sorted arrays.

2. **Space-Time Tradeoffs**: This problem demonstrates how we can optimize space complexity by using a more clever algorithm (two pointers) instead of additional data structures (hash maps).

3. **Boundary Conditions**: Be careful about 0-indexing vs. 1-indexing requirements. Always clarify this in interview settings.

4. **Guaranteed Solutions**: The problem statement tells us there's exactly one solution, which lets us optimize our code by not handling edge cases where no solution exists.

5. **Two-Pointer Movement Logic**: The decision to move left or right pointers is based on whether we need to increase or decrease our sum, leveraging the sorted property of the array.

By understanding this pattern, you'll be able to apply similar thinking to many other problems that involve searching for pairs, triplets, or other relationships in sorted arrays.
