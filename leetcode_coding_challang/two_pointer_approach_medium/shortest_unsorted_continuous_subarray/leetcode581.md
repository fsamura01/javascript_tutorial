# LeetCode 581: Shortest Unsorted Continuous Subarray

## 1. Problem Understanding

**Simple explanation:** Find the shortest contiguous portion of an array that, when sorted, makes the entire array sorted.

**Key insight:** We need to identify the leftmost and rightmost positions where elements are "out of place" in a sorted array.

## 2. Constraints Analysis

- Array length: 1 to 10⁴ elements
- Element values: -10⁵ to 10⁵
- Must handle single elements and already sorted arrays
- Target: O(n) time complexity

## 3. Breaking Down the Problem

The problem has three main components:

1. **Identify unsorted region**: Find where sorting begins and ends
2. **Boundary detection**: Locate precise start/end indices
3. **Length calculation**: Return the subarray length

## 4. Pattern Identification

**Primary Pattern:** Two-pass scanning with boundary detection

- **Left scan**: Find where ascending order breaks
- **Right scan**: Find where descending order breaks
- **Boundary adjustment**: Expand boundaries based on min/max values

## 5. Step-by-Step Approach

1. **Find initial boundaries**: Scan left-to-right and right-to-left to find disorder
2. **Extract min/max**: Get minimum and maximum values in the unsorted region
3. **Expand boundaries**: Extend boundaries to include all elements that should be within the sorted subarray
4. **Calculate length**: Return the final boundary difference

## 6. Code Implementation

```Javascript
// JavaScript Solution
function findUnsortedSubarray(nums) {
    const n = nums.length;
    let left = -1, right = -1;
    
    // Step 1: Find initial boundaries
    // Left boundary: first element smaller than previous
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[i - 1]) {
            left = i - 1;
            break;
        }
    }
    
    // If array is already sorted
    if (left === -1) return 0;
    
    // Right boundary: last element larger than next
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] > nums[i + 1]) {
            right = i + 1;
            break;
        }
    }
    
    // Step 2: Find min and max in unsorted region
    let min = Math.min(...nums.slice(left, right + 1));
    let max = Math.max(...nums.slice(left, right + 1));
    
    // Step 3: Expand boundaries
    // Extend left boundary: find where min should be placed
    while (left > 0 && nums[left - 1] > min) {
        left--;
    }
    
    // Extend right boundary: find where max should be placed
    while (right < n - 1 && nums[right + 1] < max) {
        right++;
    }
    
    return right - left + 1;
}

// Optimized JavaScript Solution (O(n) time, O(1) space)
function findUnsortedSubarrayOptimized(nums) {
    const n = nums.length;
    let left = n, right = 0;
    let min = Infinity, max = -Infinity;
    
    // Single pass to find boundaries and min/max
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            min = Math.min(min, nums[i + 1]);
            max = Math.max(max, nums[i]);
            if (left === n) left = i;
            right = i + 1;
        }
    }
    
    if (left === n) return 0; // Already sorted
    
    // Expand boundaries based on min/max
    while (left > 0 && nums[left - 1] > min) left--;
    while (right < n - 1 && nums[right + 1] < max) right++;
    
    return right - left + 1;
}

/*
Java Solution
*/
public class Solution {
    public int findUnsortedSubarray(int[] nums) {
        int n = nums.length;
        int left = -1, right = -1;
        
        // Step 1: Find initial boundaries
        for (int i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                left = i - 1;
                break;
            }
        }
        
        if (left == -1) return 0; // Already sorted
        
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] > nums[i + 1]) {
                right = i + 1;
                break;
            }
        }
        
        // Step 2: Find min and max in unsorted region
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int i = left; i <= right; i++) {
            min = Math.min(min, nums[i]);
            max = Math.max(max, nums[i]);
        }
        
        // Step 3: Expand boundaries
        while (left > 0 && nums[left - 1] > min) {
            left--;
        }
        
        while (right < n - 1 && nums[right + 1] < max) {
            right++;
        }
        
        return right - left + 1;
    }
    
    // Optimized Java Solution
    public int findUnsortedSubarrayOptimized(int[] nums) {
        int n = nums.length;
        int left = n, right = 0;
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                min = Math.min(min, nums[i + 1]);
                max = Math.max(max, nums[i]);
                if (left == n) left = i;
                right = i + 1;
            }
        }
        
        if (left == n) return 0;
        
        while (left > 0 && nums[left - 1] > min) left--;
        while (right < n - 1 && nums[right + 1] < max) right++;
        
        return right - left + 1;
    }
}

// JavaScript Solution
function findUnsortedSubarray(nums) {
    const n = nums.length;
    let left = -1, right = -1;
    
    // Step 1: Find initial boundaries
    // Left boundary: first element smaller than previous
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[i - 1]) {
            left = i - 1;
            break;
        }
    }
    
    // If array is already sorted
    if (left === -1) return 0;
    
    // Right boundary: last element larger than next
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] > nums[i + 1]) {
            right = i + 1;
            break;
        }
    }
    
    // Step 2: Find min and max in unsorted region
    // Method 1: Using spread operator (recommended)
    let min = Math.min(...nums.slice(left, right + 1));
    let max = Math.max(...nums.slice(left, right + 1));
    
    // Method 2: Manual loop (more explicit)
    // let min = nums[left], max = nums[left];
    // for (let i = left; i <= right; i++) {
    //     min = Math.min(min, nums[i]);
    //     max = Math.max(max, nums[i]);
    // }
    
    // Step 3: Expand boundaries
    // Extend left boundary: find where min should be placed
    while (left > 0 && nums[left - 1] > min) {
        left--;
    }
    
    // Extend right boundary: find where max should be placed
    while (right < n - 1 && nums[right + 1] < max) {
        right++;
    }
    
    return right - left + 1;
}

// Optimized JavaScript Solution (O(n) time, O(1) space)
function findUnsortedSubarrayOptimized(nums) {
    const n = nums.length;
    let left = n, right = 0;
    let min = Infinity, max = -Infinity;
    
    // Single pass to find boundaries and min/max
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            min = Math.min(min, nums[i + 1]);
            max = Math.max(max, nums[i]);
            if (left === n) left = i;
            right = i + 1;
        }
    }
    
    if (left === n) return 0; // Already sorted
    
    // Expand boundaries based on min/max
    while (left > 0 && nums[left - 1] > min) left--;
    while (right < n - 1 && nums[right + 1] < max) right++;
    
    return right - left + 1;
}

/*
Java Solution
*/
public class Solution {
    public int findUnsortedSubarray(int[] nums) {
        int n = nums.length;
        int left = -1, right = -1;
        
        // Step 1: Find initial boundaries
        for (int i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                left = i - 1;
                break;
            }
        }
        
        if (left == -1) return 0; // Already sorted
        
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] > nums[i + 1]) {
                right = i + 1;
                break;
            }
        }
        
        // Step 2: Find min and max in unsorted region
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int i = left; i <= right; i++) {
            min = Math.min(min, nums[i]);
            max = Math.max(max, nums[i]);
        }
        
        // Step 3: Expand boundaries
        while (left > 0 && nums[left - 1] > min) {
            left--;
        }
        
        while (right < n - 1 && nums[right + 1] < max) {
            right++;
        }
        
        return right - left + 1;
    }
    
    // Optimized Java Solution
    public int findUnsortedSubarrayOptimized(int[] nums) {
        int n = nums.length;
        int left = n, right = 0;
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                min = Math.min(min, nums[i + 1]);
                max = Math.max(max, nums[i]);
                if (left == n) left = i;
                right = i + 1;
            }
        }
        
        if (left == n) return 0;
        
        while (left > 0 && nums[left - 1] > min) left--;
        while (right < n - 1 && nums[right + 1] < max) right++;
        
        return right - left + 1;
    }
}
```

## 7. Complexity Analysis

**Time Complexity:** O(n) - Single pass through array  
**Space Complexity:** O(1) - Only using constant extra space

## 8. Alternative Solutions

**Sorting approach:** Compare with sorted version

- Time: O(n log n)
- Space: O(n)
- Less optimal but simpler to understand

**Stack-based approach:** Use monotonic stack to track boundaries

- Time: O(n)
- Space: O(n)

## 9. Practice Recommendations

Similar pattern problems:

- LeetCode 215: Kth Largest Element
- LeetCode 75: Sort Colors
- LeetCode 283: Move Zeroes
- LeetCode 448: Find All Numbers Disappeared

This solution uses a **boundary detection pattern** to identify the shortest unsorted subarray. The key insight is that elements outside the sorted boundaries must be included if they would fall within the min-max range of the unsorted region.

The algorithm efficiently finds disorder points, extracts the problematic value range, then expands boundaries to ensure all misplaced elements are captured. This achieves O(n) time complexity by avoiding the need to actually sort the array.

`Great question! This is a key insight about the algorithm's logic. Let me explain why checking only the left pointer is sufficient to determine if the array is already sorted.

## Why Left Pointer Check is Sufficient

The left boundary search looks for the **first position where order breaks**:

```javascript
for (let i = 1; i < n; i++) {
    if (nums[i] < nums[i - 1]) {  // Found disorder!
        left = i - 1;
        break;
    }
}
```

### The Logic

1. **If `left === -1`**: We never found a position where `nums[i] < nums[i-1]`
2. **This means**: Every adjacent pair satisfies `nums[i] >= nums[i-1]`
3. **Therefore**: The entire array is in non-decreasing order (sorted)

### Why We Don't Need to Check Right Pointer

If there's **any** disorder in the array, the left-to-right scan **must** find it. Here's why:

- **Case 1: Array is sorted**

```Javascript
[1, 2, 3, 4, 5] → No nums[i] < nums[i-1] found → left = -1
```

- **Case 2: Array has disorder**

```Javascript
[2, 6, 4, 8, 10, 9, 15]
     ↑
   At i=2: nums[2]=4 < nums[1]=6 → left = 1
```

The moment we find **any** position where an element is smaller than its predecessor, we know the array needs sorting.

### Mathematical Proof

For an array to be sorted: `nums[0] ≤ nums[1] ≤ nums[2] ≤ ... ≤ nums[n-1]`

If this condition fails at **any** position `i`, then `nums[i] < nums[i-1]`, and our left scan will detect it.

**Therefore**: If left scan finds no violations (`left === -1`), the array must be completely sorted.

This is an elegant optimization - we can determine if the entire array is sorted with just a single left-to-right pass, without needing to perform the right-to-left scan at all
`

`---`
Excellent catch! You've found a bug in my code. Let me explain what's happening and fix it.

## The Problem

`Math.min()` and `Math.max()` don't work directly with arrays. When you pass an array to them, they can't process it correctly, resulting in `NaN`.

```javascript
let arr = [6, 4, 8, 10, 9];
Math.min(arr);  // NaN ❌
Math.max(arr);  // NaN ❌
```

## Why This Happens

`Math.min()` and `Math.max()` expect individual arguments, not an array:

- `Math.min(6, 4, 8, 10, 9)` ✅ returns 4
- `Math.min([6, 4, 8, 10, 9])` ❌ returns NaN

## Correct Solutions

Here are the proper ways to fix this:## The Fix Explained

### Method 1: Spread Operator (...)

```javascript
let min = Math.min(...nums.slice(left, right + 1));
```

- `nums.slice(left, right + 1)` creates `[6, 4, 8, 10, 9]`
- `...` spreads it into individual arguments: `6, 4, 8, 10, 9`
- `Math.min(6, 4, 8, 10, 9)` returns `4` ✅

### Method 2: Manual Loop

```javascript
let min = nums[left], max = nums[left];
for (let i = left; i <= right; i++) {
    min = Math.min(min, nums[i]);
    max = Math.max(max, nums[i]);
}
```

## Example Walkthrough

For `nums = [2, 6, 4, 8, 10, 9, 15]` with `left = 1, right = 5`:

```javascript
// Wrong way (what you found):
nums.slice(1, 6)           // [6, 4, 8, 10, 9]
Math.min([6, 4, 8, 10, 9]) // NaN ❌

// Correct way:
nums.slice(1, 6)            // [6, 4, 8, 10, 9]
Math.min(...[6, 4, 8, 10, 9]) // Math.min(6, 4, 8, 10, 9)
                            // 4 ✅
```

Thank you for catching this! It's a common JavaScript gotcha. The spread operator (`...`) is essential when using `Math.min/max` with arrays.

`---`Great question! `slice()` and `splice()` are both array methods but serve completely different purposes. Let me break down the key differences:

## slice() - Non-destructive Extraction

**Purpose:** Creates a shallow copy of a portion of an array
**Mutates original:** NO ❌
**Returns:** New array

```javascript
let arr = [1, 2, 3, 4, 5];
let result = arr.slice(1, 4);

console.log(result);  // [2, 3, 4]
console.log(arr);     // [1, 2, 3, 4, 5] - unchanged!
```

**Syntax:** `array.slice(start, end)`

- `start`: Starting index (inclusive)
- `end`: Ending index (exclusive)

## splice() - Destructive Modification

**Purpose:** Changes array by removing/adding elements
**Mutates original:** YES ✅
**Returns:** Array of removed elements

```javascript
let arr = [1, 2, 3, 4, 5];
let result = arr.splice(1, 3, 'a', 'b');

console.log(result);  // [2, 3, 4] - removed elements
console.log(arr);     // [1, 'a', 'b', 5] - original modified!
```

**Syntax:** `array.splice(start, deleteCount, item1, item2, ...)`

- `start`: Starting index
- `deleteCount`: Number of elements to remove
- `item1, item2, ...`: Elements to add

## Side-by-Side Comparison

```Javascript
// ========== slice() Examples ==========
console.log("=== slice() - Non-destructive ===");

let fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// Basic slicing
let portion1 = fruits.slice(1, 4);
console.log('fruits.slice(1, 4):', portion1);     // ['banana', 'cherry', 'date']
console.log('Original array:', fruits);           // ['apple', 'banana', 'cherry', 'date', 'elderberry']

// Negative indices
let portion2 = fruits.slice(-3, -1);
console.log('fruits.slice(-3, -1):', portion2);   // ['cherry', 'date']

// Single parameter (from index to end)
let portion3 = fruits.slice(2);
console.log('fruits.slice(2):', portion3);        // ['cherry', 'date', 'elderberry']

// No parameters (shallow copy)
let copy = fruits.slice();
console.log('fruits.slice():', copy);             // ['apple', 'banana', 'cherry', 'date', 'elderberry']

console.log('\n');

// ========== splice() Examples ==========
console.log("=== splice() - Destructive ===");

let numbers = [1, 2, 3, 4, 5, 6, 7];

// Remove elements only
let removed1 = numbers.splice(2, 2);
console.log('Removed elements:', removed1);       // [3, 4]
console.log('Modified array:', numbers);          // [1, 2, 5, 6, 7]

// Reset array for next example
numbers = [1, 2, 3, 4, 5, 6, 7];

// Remove and add elements
let removed2 = numbers.splice(1, 3, 'a', 'b', 'c', 'd');
console.log('Removed elements:', removed2);       // [2, 3, 4]
console.log('Modified array:', numbers);          // [1, 'a', 'b', 'c', 'd', 5, 6, 7]

// Reset array for next example
numbers = [1, 2, 3, 4, 5];

// Insert without removing (deleteCount = 0)
let removed3 = numbers.splice(2, 0, 'X', 'Y');
console.log('Removed elements:', removed3);       // [] (nothing removed)
console.log('Modified array:', numbers);          // [1, 2, 'X', 'Y', 3, 4, 5]

// Reset array for next example
numbers = [1, 2, 3, 4, 5];

// Remove from end using negative index
let removed4 = numbers.splice(-2, 1);
console.log('Removed elements:', removed4);       // [4]
console.log('Modified array:', numbers);          // [1, 2, 3, 5]

console.log('\n');

// ========== Common Use Cases ==========
console.log("=== Common Use Cases ===");

// slice: Getting subarray for processing (like in LeetCode 581)
let data = [10, 20, 30, 40, 50];
let subset = data.slice(1, 4);  // Get middle portion
let min = Math.min(...subset);
console.log('Subset for min calculation:', subset); // [20, 30, 40]
console.log('Minimum value:', min);                 // 20
console.log('Original data intact:', data);         // [10, 20, 30, 40, 50]

// splice: Modifying array in-place
let todoList = ['task1', 'task2', 'task3', 'task4'];
todoList.splice(1, 1);  // Remove 'task2'
console.log('After removing task2:', todoList);     // ['task1', 'task3', 'task4']

todoList.splice(1, 0, 'urgent_task');  // Insert at index 1
console.log('After inserting urgent task:', todoList); // ['task1', 'urgent_task', 'task3', 'task4']

// ========== Memory Considerations ==========
console.log('\n=== Memory Impact ===');

let largeArray = new Array(1000000).fill(0).map((_, i) => i);

// slice creates new array (uses more memory)
console.time('slice performance');
let sliceResult = largeArray.slice(100, 200);
console.timeEnd('slice performance');

// splice modifies in-place (more memory efficient for modifications)
console.time('splice performance');
let spliceCopy = [...largeArray];  // Copy for fair comparison
let spliceResult = spliceCopy.splice(100, 100);
console.timeEnd('splice performance');

console.log('slice result length:', sliceResult.length);   // 100
console.log('splice result length:', spliceResult.length); // 100
```

## Quick Reference Table

| Feature | slice() | splice() |
|---------|---------|----------|
| **Mutates original** | No | Yes |
| **Returns** | New array | Removed elements |
| **Purpose** | Extract portion | Modify array |
| **Parameters** | (start, end) | (start, deleteCount, ...items) |
| **Use when** | Need copy/subset | Need to modify original |

## In Context of LeetCode 581

In our LeetCode solution, we used `slice()` because:

```javascript
// We want to examine a portion WITHOUT modifying the original
let min = Math.min(...nums.slice(left, right + 1));
```

We need the original array intact for further processing, so `slice()` is perfect here.

## Memory Tip

- **slice()**: Creates new memory space (safe but uses more memory)
- **splice()**: Modifies existing memory space (efficient but destructive)

Choose based on whether you need to preserve the original array!

`Excellent question! This is about calculating the **length** of a subarray, not adding positions together. Let me break this down:

## What We're Actually Calculating

`right - left + 1` calculates the **number of elements** between two indices (inclusive).

## Why Subtraction, Not Addition?

Think of it this way:

- `left` and `right` are **positions** in the array
- We want the **distance** (length) between these positions
- Distance = End position - Start position + 1

## Visual Example

```Javascript
Array: [2, 6, 4, 8, 10, 9, 15]
Index:  0  1  2  3   4  5   6

left = 1, right = 5
Subarray: [6, 4, 8, 10, 9]
```

**Count the elements:**

- Position 1: `6`
- Position 2: `4`
- Position 3: `8`
- Position 4: `10`
- Position 5: `9`

- **Total = 5 elements**

## The Math

```javascript
right - left + 1 = 5 - 1 + 1 = 5 ✅ (correct length)
right + left + 1 = 5 + 1 + 1 = 7 ❌ (meaningless number)
```

## Why the "+1"?

The `+1` accounts for **inclusive boundaries**:

```Javascript
From index 3 to index 5:
Positions: 3, 4, 5
Count: 5 - 3 + 1 = 3 elements ✅

Without +1:
5 - 3 = 2 ❌ (would miss one element)
```

## Real-world Analogy

Think of it like counting pages in a book:

- **Pages 10 to 15**: How many pages?
- **Answer**: 15 - 10 + 1 = 6 pages
- **Not**: 15 + 10 + 1 = 26 (that would be nonsensical)

## General Formula

For any inclusive range `[start, end]`:

```Javascript
Length = end - start + 1
```

This formula works for:

- Array indices
- Date ranges
- Page numbers
- Any sequential counting

The key insight is that we're measuring **distance/length**, not **summing positions**!`
