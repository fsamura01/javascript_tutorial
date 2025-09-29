# 26 - Remove Duplicates from Sorted Array - Solution Guide

## 1. Problem Understanding

This problem asks us to remove duplicates from a sorted array *in-place*, meaning we need to modify the original array without using extra space for another array. The key requirements are:

- The first k elements of the array should contain unique elements
- These unique elements must maintain their original relative order
- We need to return k (the count of unique elements)
- The values beyond the first k positions don't matter

What makes this problem interesting is the constraint to modify the array in-place while preserving the order of unique elements.

## 2. Constraints of the Problem

Let's examine the constraints carefully:

- Array length is between 1 and 30,000 (1 ≤ nums.length ≤ 3 × 10^4)
- Array values range from -100 to 100 (-100 ≤ nums[i] ≤ 100)
- The array is already sorted in non-decreasing order
- We must modify the original array, not create a new one
- Only the first k positions matter for validation

The array being sorted is a crucial clue – it means duplicate elements are always adjacent to each other, which will help us solve the problem efficiently.

## 3. Breaking Down the Problem

We can break this problem into these smaller parts:

1. Identify unique elements in the sorted array
2. Move these unique elements to the beginning of the array
3. Keep track of how many unique elements we've found (k)
4. Return k

## 4. Pattern Identification

This problem is a classic example of the **Two Pointers** pattern, specifically using what we call the "slow and fast pointer" approach. This pattern is extremely useful for in-place array manipulations, particularly when we need to process elements in relation to each other.

The two pointers will serve different purposes:

- A slow pointer that keeps track of where we should place the next unique element
- A fast pointer that scans through the array to find unique elements

## 5. Approach Discussion

Here's our step-by-step approach:

1. If the array is empty or has only one element, it already has no duplicates, so we can return its length.

2. Initialize two pointers:
   - `slow = 0` (points to the position where we'll place the next unique element)
   - `fast = 1` (scans through the array looking for unique elements)

3. Iterate with the fast pointer through the array:
   - Compare the element at the fast pointer with the element at the slow pointer
   - If they're different, it means we've found a new unique element:
     - Increment the slow pointer
     - Copy the unique element (at the fast position) to the slow pointer position
   - If they're the same, it's a duplicate, so we skip it (just move the fast pointer)

4. Return `slow + 1` as our answer (slow is 0-indexed, so we add 1 to get the count)

This approach ensures that:

- We only need to iterate through the array once (O(n) time complexity)
- We modify the array in-place (O(1) space complexity)
- Unique elements maintain their relative order
- The first k positions contain all unique elements

## 6. Code Implementation

Let's trace through the execution of our algorithm using Example 2:

**Input**: `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]`

1. Initialize `slow = 0`, `fast = 1`

2. Iterate through the array:
   - `nums[slow] = 0`, `nums[fast] = 0` → They're the same (duplicate), so just increment `fast` to 2
   - `nums[slow] = 0`, `nums[fast] = 1` → Different! Increment `slow` to 1, set `nums[slow] = nums[fast]`, and increment `fast` to 3
     - Array: `[0, 1, 1, 1, 1, 2, 2, 3, 3, 4]` (`slow = 1`, `fast = 3`)
   - `nums[slow] = 1`, `nums[fast] = 1` → Same, increment `fast` to 4
   - `nums[slow] = 1`, `nums[fast] = 1` → Same, increment `fast` to 5
   - `nums[slow] = 1`, `nums[fast] = 2` → Different! Increment `slow` to 2, set `nums[slow] = nums[fast]`, and increment `fast` to 6
     - Array: `[0, 1, 2, 1, 1, 2, 2, 3, 3, 4]` (`slow = 2`, `fast = 6`)
   - `nums[slow] = 2`, `nums[fast] = 2` → Same, increment `fast` to 7
   - `nums[slow] = 2`, `nums[fast] = 3` → Different! Increment `slow` to 3, set `nums[slow] = nums[fast]`, and increment `fast` to 8
     - Array: `[0, 1, 2, 3, 1, 2, 2, 3, 3, 4]` (`slow = 3`, `fast = 8`)
   - `nums[slow] = 3`, `nums[fast] = 3` → Same, increment `fast` to 9
   - `nums[slow] = 3`, `nums[fast] = 4` → Different! Increment `slow` to 4, set `nums[slow] = nums[fast]`, and increment `fast` to 10
     - Array: `[0, 1, 2, 3, 4, 2, 2, 3, 3, 4]` (`slow = 4`, `fast = 10`)
   - `fast = 10` is outside the array, so we exit the loop

3. Return `slow + 1 = 5`

Final state of the array: `[0, 1, 2, 3, 4, 2, 2, 3, 3, 4]`
The first 5 elements are unique and in their original order, as required.

## **7. Complexity Analysis**

### **Time Complexity: O(n)**

- We traverse the array once with the fast pointer, where n is the length of the array
- Each operation inside the loop (comparison, assignment) takes constant time

### **Space Complexity: O(1)**

- We use only a constant amount of extra space (the two pointer variables)
- We modify the array in-place without using any additional data structures

## **8. Alternative Solutions**

While our two-pointer approach is optimal for this problem, let's consider some alternatives:

### **Using a Set (Not In-Place)**

```javascript
function removeDuplicatesUsingSet(nums) {
    const uniqueSet = new Set(nums);
    const unique = [...uniqueSet];
    
    // Copy unique elements back to original array
    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }
    
    return unique.length;
}
```

This solution has:

- Time Complexity: O(n)
- Space Complexity: O(n) - requires additional space for the Set

The main drawback is that it uses extra space, violating the in-place requirement.

## **Using Array Filter (Not In-Place)**

```javascript
function removeDuplicatesUsingFilter(nums) {
    const unique = nums.filter((item, index, array) => index === 0 || item !== array[index - 1]);
    
    // Copy unique elements back to original array
    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }
    
    return unique.length;
}
```

This also has O(n) time complexity but O(n) space complexity.

Our original two-pointer solution is the most efficient for this problem given the constraints.

## 9. Practice Recommendations

For more practice with the two-pointer pattern, try these similar LeetCode problems:

1. **Problem 27: Remove Element** - Remove all instances of a specific value from an array in-place
2. **Problem 80: Remove Duplicates from Sorted Array II** - Similar to our problem but allows up to two occurrences of each element
3. **Problem 283: Move Zeroes** - Move all zeroes to the end while maintaining the relative order of non-zero elements
4. **Problem 88: Merge Sorted Array** - Merge two sorted arrays in-place
5. **Problem 977: Squares of a Sorted Array** - Return an array of the squares of each number, sorted in non-decreasing order

These problems will help reinforce your understanding of the two-pointer technique and in-place array modifications.

## 10. Flowchart Design

## Key Insights and Learning Points

1. **In-Place Modification**: This problem teaches the valuable skill of modifying arrays in-place, which is memory-efficient and often required in interviews.

2. **Two-Pointer Technique**: The slow and fast pointer approach is a fundamental pattern you'll see in many array and linked list problems.

3. **Leveraging Array Properties**: We took advantage of the fact that the array was already sorted, which made identifying duplicates much simpler.

4. **Efficiency Matters**: While there are multiple ways to solve this problem, understanding which approach is most efficient (both in time and space) is crucial for technical interviews.

5. **Input Processing**: We handled the array elements sequentially, making decisions based on current values rather than looking ahead, which is often more efficient.

This problem is an excellent introduction to the two-pointer technique and showcases how you can achieve efficient solutions by carefully manipulating array indices rather than creating new data structures.

Would you like me to explain any part of the solution in more detail?
