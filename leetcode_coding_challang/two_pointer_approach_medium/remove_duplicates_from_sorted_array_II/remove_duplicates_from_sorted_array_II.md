# Remove Duplicates from Sorted Array II - Problem Solving Guide

## 1. Problem Understanding

This problem asks us to modify a sorted array in-place so that each unique element appears at most twice. We need to return the new length of the array after this modification.

In simpler terms:

- We have a sorted array of integers
- We need to ensure each number appears at most twice
- We must modify the original array (not create a new one)
- We need to return the new length after modifications
- All unique elements should maintain their relative order

The special requirement is that we must do this without using extra space (O(1) memory complexity), meaning we can't create additional arrays to help us.

## 2. Constraints of the Problem

Let's analyze the constraints carefully:

- Array is already sorted in non-decreasing order
- We must modify the array in-place
- Each unique element can appear at most twice (not just once)
- We must use O(1) extra memory (can't allocate another array)
- The array length is between 1 and 30,000
- Array elements can range from -10,000 to 10,000
- The judge will only check the first k elements after our modification

These constraints guide us toward using a two-pointer approach, as we need to modify the array in-place without extra space.

## 3. Breaking Down the Problem

Let's break this down into smaller steps:

1. We need to keep track of the elements we want to keep
2. We need to count occurrences of each element
3. We need to overwrite elements when necessary
4. We need to return the new length

Since the array is sorted, identical elements are grouped together, making it easier to count occurrences.

## 4. Pattern Identification

This problem fits the **Two Pointers** pattern, specifically the "slow and fast pointer" technique.

- The fast pointer scans through the array
- The slow pointer keeps track of where to place the next element
- This approach is ideal for in-place array modifications

We can also view this as an **Array Manipulation** problem with an in-place modification requirement.

## 5. Approach Discussion

Here's a step-by-step approach:

1. Initialize two pointers:
   - `slow`: points to the position where we'll write the next valid element
   - `fast`: scans through the array to find valid elements

2. Keep track of the count of each element:
   - For the first occurrence of an element, always include it
   - For the second occurrence, also include it
   - For third or more occurrences, skip them

3. Move valid elements to their new positions using the slow pointer

4. Return the final position of the slow pointer as the new length

Let's trace this approach with an example:
Input: `[1,1,1,2,2,3]`

- Initialize `slow = 0`, `fast = 0`
- For element `1`:
  - First occurrence: Keep it at position `slow = 0`
  - Second occurrence: Keep it at position `slow = 1`
  - Third occurrence: Skip it
- For element `2`:
  - First occurrence: Keep it at position `slow = 2`
  - Second occurrence: Keep it at position `slow = 3`
- For element `3`:
  - First occurrence: Keep it at position `slow = 4`
- Return `slow + 1 = 5` (the new length)

Result: `[1,1,2,2,3]` with length 5.

## 6. Code Implementation

Let's implement this solution in JavaScript:

```javascript
/**
 * @param {number[]} nums - Input array sorted in non-decreasing order
 * @return {number} - Length of array after removing duplicates (keeping at most 2)
 */
function removeDuplicates(nums) {
    // Handle edge cases
    if (nums.length <= 2) {
        return nums.length; // Already meets our criteria
    }
    
    // Initialize the slow pointer (position to place next element)
    let slow = 2; // Start at 2 because we always keep at least first two elements (if they exist)
    
    // Fast pointer starts at the third element
    for (let fast = 2; fast < nums.length; fast++) {
        // Check if current element is different from the element two positions back
        // If it is, or if it's the same but we've seen it less than twice, we keep it
        if (nums[fast] !== nums[slow - 2]) {
            nums[slow] = nums[fast]; // Place the element at the slow pointer position
            slow++; // Move slow pointer forward
        }
        // If current element is the same as element two positions back,
        // we've already seen it twice, so we skip it
    }
    
    // The slow pointer now points to the position after the last valid element
    // So it represents the new length of the modified array
    return slow;
}

// Example usage:
const example1 = [1, 1, 1, 2, 2, 3];
const k1 = removeDuplicates(example1);
console.log(`Output: ${k1}, nums = [${example1.slice(0, k1).join(',')}${example1.length > k1 ? ',_'.repeat(example1.length - k1) : ''}]`);

const example2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
const k2 = removeDuplicates(example2);
console.log(`Output: ${k2}, nums = [${example2.slice(0, k2).join(',')}${example2.length > k2 ? ',_'.repeat(example2.length - k2) : ''}]`);
```

The code implements our two-pointer approach:

1. We handle edge cases where arrays with 0, 1, or 2 elements already satisfy our requirements.

2. We initialize our slow pointer at index 2 (third position) because:
   - The first two elements (if they exist) will always be kept regardless of their values.
   - This simplifies our logic as we compare the current element with the element two positions back.

3. For the fast pointer:
   - We start at index 2 and iterate through the array
   - We compare the current element (nums[fast]) with the element two positions back from the slow pointer (nums[slow - 2])
   - If they're different, we know we haven't seen the current element twice yet, so we keep it
   - If they're the same, we've already seen this element at least twice, so we skip it

4. We return the slow pointer's value, which represents the new length of the array after modifications.

## **7. Complexity Analysis**

### **Time Complexity: O(n)**

- We only need to iterate through the array once with our fast pointer
- Each element is processed in constant time
- Overall, this gives us linear time complexity

### **Space Complexity: O(1)**

- We only use two pointers and don't allocate any additional data structures
- The modifications are done in-place
- This satisfies the problem's requirement for constant space complexity

## **8. Alternative Solutions**

### **Alternative 1: Count-based Approach**

We could also solve this by keeping a counter for the current element:

```javascript
/**
 * @param {number[]} nums - Input array sorted in non-decreasing order
 * @param {number} k - Maximum allowed duplicates
 * @return {number} - Length of array after removing duplicates (keeping at most k)
 */
function removeDuplicatesGeneralized(nums, k) {
    // Handle edge cases
    if (nums.length <= k) {
        return nums.length;
    }
    
    let index = k; // Start after the first k elements
    
    // Iterate from the k+1 element
    for (let i = k; i < nums.length; i++) {
        // If current element is different from the element k positions back
        if (nums[i] !== nums[index - k]) {
            nums[index] = nums[i]; // Write current element
            index++;
        }
    }
    
    return index;
}

// Example usage for k=2:
const example1 = [1, 1, 1, 2, 2, 3];
const k1 = removeDuplicatesGeneralized(example1, 2);
console.log(`Output: ${k1}, nums = [${example1.slice(0, k1).join(',')}${example1.length > k1 ? ',_'.repeat(example1.length - k1) : ''}]`);

const example2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
const k2 = removeDuplicatesGeneralized(example2, 2);
console.log(`Output: ${k2}, nums = [${example2.slice(0, k2).join(',')}${example2.length > k2 ? ',_'.repeat(example2.length - k2) : ''}]`);
```

This alternative approach explicitly tracks the count of each element, resetting the counter whenever we encounter a new element. Both approaches have the same time and space complexity, but they differ in how they determine whether to keep an element.

### Alternative 2: Generalized K-Duplicates Approach

We can also generalize our solution for any k duplicates:

This generalized solution allows for any number of duplicates (not just 2) by parameterizing k. It's a good example of how we can extend the algorithm to handle similar problems with different constraints.

## 9. Practice Recommendations

Here are similar LeetCode problems that use the two-pointer technique for in-place array modifications:

1. **Remove Duplicates from Sorted Array (26)**: The simpler version where each element can appear only once.

2. **Move Zeroes (283)**: Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.

3. **Remove Element (27)**: Remove all occurrences of a specific value from an array.

4. **Sort Colors (75)**: Sort an array with only three unique values, a variation of the Dutch national flag problem.

5. **Merge Sorted Array (88)**: Merge two sorted arrays in-place.

6. **Remove Duplicates from Sorted Array III (custom)**: Try extending the solution to allow each element to appear at most 3 times as an exercise.

7. **Minimum Size Subarray Sum (209)**: Find the minimum length subarray with a sum greater than or equal to a target value.

8. **3Sum (15)**: Find all unique triplets in the array that sum to zero.

## 10. Flowchart Design

Let's create a flowchart to visualize the algorithm:

## Summary

We've solved the "Remove Duplicates from Sorted Array II" problem using a two-pointer approach. The key insight is that we can detect duplicates beyond our limit (2) by comparing the current element with the element that's two positions back from our write position.

The algorithm is efficient with:

- O(n) time complexity - we only need one pass through the array
- O(1) space complexity - we modify the array in-place without extra space

The problem demonstrates common techniques used in array manipulation questions, particularly the slow and fast pointer pattern that's frequently used for in-place array modifications.

Remember these key takeaways:

1. Two-pointer techniques are powerful for in-place array operations
2. When dealing with sorted arrays, comparing adjacent or nearby elements can help identify patterns
3. Sometimes initializing pointers at positions other than the beginning can simplify the logic

Would you like me to elaborate on any part of the solution or explain the approach in more detail?

Let's trace through this corrected solution with [1,1,1,2,2,3]:

Initialize k = 2, so we already have [1,1] kept
i = 2: Compare nums[2] (which is 1) with nums[k-2] (which is nums[0], which is 1)

Since they're equal, we don't copy this third 1

i = 3: Compare nums[3] (which is 2) with nums[k-2] (which is nums[0], which is 1)

They're different, so we set nums[k] (which is nums[2]) to 2 and increment k to 3
Now nums = [1,1,2,2,2,3] and k = 3

i = 4: Compare nums[4] (which is 2) with nums[k-2] (which is nums[1], which is 1)

They're different, so we set nums[k] (which is nums[3]) to 2 and increment k to 4
Now nums = [1,1,2,2,2,3] and k = 4

i = 5: Compare nums[5] (which is 3) with nums[k-2] (which is nums[2], which is 2)

They're different, so we set nums[k] (which is nums[4]) to 3 and increment k to 5
Now nums = [1,1,2,2,3,3] and k = 5

So the function returns k = 5, which means we have [1,1,2,2,3] with length 5, which is correct!
The key insight is that when we're deciding whether to keep an element, we need to compare it with what's already in our modified result array (at position k-2), not with the original array (at position i-2).
This way, we're checking: "If I've already kept two of this number in my result, don't add more." By comparing with nums[k-2], we're looking at what would be the earliest occurrence of the current number in our result, ensuring we keep at most two instances of any number.
