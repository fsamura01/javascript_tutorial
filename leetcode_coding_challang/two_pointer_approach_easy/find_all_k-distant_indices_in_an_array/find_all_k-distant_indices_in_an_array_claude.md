# **2200. Find All K-Distant Indices in an Array**

I'll guide you through solving this LeetCode problem step by step.

1. **Problem Understanding**
   Let's break down the problem:

- Given an array `nums` of integers and two integers `key` and `k`
- We need to find all k-distant indices
- A k-distant index is an index `i` where:
  - |i - j| ≤ k for some index j where nums[j] == key
  - In other words, index i should be within distance k of any occurrence of key
- Return all k-distant indices in sorted order

Example:

```javascript
(nums = [3, 4, 9, 1, 3, 9, 5]), (key = 9), (k = 1);
Output: [1, 2, 3, 4, 5]; // indices within distance 1 of any 9
```

## **Pattern Identification**

This problem involves:

- Array traversal
- Range checking
- Set operations to avoid duplicates
  The main pattern here is "finding elements within a range" which is similar to a sliding window, but with a twist - we need to consider ranges around specific elements.

## **Approach Discussion**

Let's solve this step by step:

1. First, find all indices where nums[j] == key
1. For each such index j, all indices i where |i - j| ≤ k are valid
1. For each key index, we need to include all indices within range [j-k, j+k]
1. Combine all valid indices and sort them
1. Remove duplicates (since ranges might overlap)

1. **Code Implementation**
   Let me create an artifact with the solution:

1. **Complexity Analysis**

- Time Complexity: O(n log n)
  - Finding key indices: O(n)
  - Adding valid indices: O(n\* k) in worst case
  - Sorting final array: O(n log n)
  - Overall dominated by the sorting step
- Space Complexity: O(n)
  - Set to store valid indices: O(n)
  - Output array: O(n)

## **Alternative Solutions**

We could optimize this slightly by:

1. Maintaining a sorted order while building the result
1. Using a boolean array instead of a Set
1. Avoiding the final sort by tracking indices in order

1. **Practice Recommendations**
   Similar problems to practice:
1. "Find K Closest Elements" (LeetCode 658)
1. "Contains Duplicate II" (LeetCode 219)
1. "Longest Substring with At Most K Distinct Characters" (LeetCode 340)

1. **Flowchart Design**
   Let me create a flowchart to visualize the solution:

Key learning points from this problem:

1. When dealing with range-based problems, always consider edge cases at array boundaries
2. Using a Set for deduplication is often cleaner than manual tracking
3. Breaking down the problem into clear steps makes implementation simpler
4. Consider the trade-offs between time and space complexity

Would you like me to explain any part of the solution in more detail?

## **Let me break this down with a visual example to make it crystal clear.**

The distance between two indices `i` and `j` is the absolute difference |i - j|. An index `i` is "within distance k" of a key if you can find any occurrence of the key at some position `j` where |i - j| ≤ k.

Let's use a concrete example:

```javascript
nums = [3, 4, 9, 1, 3, 9, 5];
key = 9;
k = 1;
```

Let's find all the 9's first:

- 9 appears at index 2 (first occurrence)
- 9 appears at index 5 (second occurrence)

Now, for each 9, we look k=1 positions in both directions:

For the first 9 (index 2):

```javascript
[3, 4, 9, 1, 3, 9, 5]
   ↑  ↑  ↑
   1  2  3

Within distance 1 of index 2:
- index 1 (|1-2| = 1)
- index 2 (|2-2| = 0)
- index 3 (|3-2| = 1)
```

For the second 9 (index 5):

```javascript
[3, 4, 9, 1, 3, 9, 5]
         ↑  ↑  ↑  ↑
         4  5  6

Within distance 1 of index 5:
- index 4 (|4-5| = 1)
- index 5 (|5-5| = 0)
- index 6 (|6-5| = 1)
```

Combining all indices that are within distance 1 of ANY 9:

- From first 9: indices 1, 2, 3
- From second 9: indices 4, 5, 6

Therefore, our final answer is [1, 2, 3, 4, 5, 6] in sorted order.

The key insight is:

1. We don't need to find just one nearby 9 - if ANY 9 is within distance k, that index counts
2. The same index might be close to multiple occurrences of the key (like index 3 could be within k=2 of both 9's) - but we only include it once in our answer
3. We include the indices where the key appears AND their neighbors within distance k

Does this help clarify the concept? Let me know if you'd like me to provide another example with different numbers.

## **Let me break down this crucial part of the code that handles array boundaries.**

```javascript

var findKDistantIndices = function(nums, key, k) {
    // Step 1: Find all indices where nums[j] == key
    const keyIndices = [];
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] === key) {
            keyIndices.push(j);
        }
    }
    
    // Step 2: Use Set to store unique valid indices
    const validIndices = new Set();
    
    // Step 3: For each key index, add all indices within range k
    for (const j of keyIndices) {
        // Calculate valid range: [max(0, j-k), min(n-1, j+k)]
        const start = Math.max(0, j - k);
        const end = Math.min(nums.length - 1, j + k);
        
        // Add all indices in range to set
        for (let i = start; i <= end; i++) {
            validIndices.add(i);
        }
    }
    
    // Step 4: Convert set to sorted array
    return Array.from(validIndices).sort((a, b) => a - b);
};
```

The purpose of these lines `[max(0, j-k), min(n-1, j+k)]` is to calculate the valid range of indices around each occurrence of the key while ensuring we don't go out of bounds of the array. Let's analyze it step by step:

1. **Why we need these calculations:**

```javascript
// If nums = [3,4,9,1,3,9,5], key = 9, k = 1
// Array indices:  0,1,2,3,4,5,6

// For first 9 at j=2:
j - k = 2 - 1 = 1  // valid start
j + k = 2 + 1 = 3  // valid end

// For second 9 at j=5:
j - k = 5 - 1 = 4  // valid start
j + k = 5 + 1 = 6  // valid end
```

## **The edge cases problem:**

Let's see what happens with k = 2 at array boundaries:

```javascript
nums = [3,4,9,1,3,9,5]
// Array indices: 0,1,2,3,4,5,6

// For first element (j=0):
j - k = 0 - 2 = -2  // PROBLEM! Invalid negative index
j + k = 0 + 2 = 2   // OK

// For last element (j=6):
j - k = 6 - 2 = 4   // OK
j + k = 6 + 2 = 8   // PROBLEM! Beyond array length
```

## **How the fix works:**

```javascript
const start = Math.max(0, j - k);
// If j - k is negative, choose 0
// Example: j = 0, k = 2
// Math.max(0, 0 - 2) = Math.max(0, -2) = 0

const end = Math.min(nums.length - 1, j + k);
// If j + k exceeds array length, choose last index
// Example: j = 6, k = 2
// Math.min(6, 6 + 2) = Math.min(6, 8) = 6
```

Let's visualize with a complete example:

```javascript
nums = [3, 4, 9, 1, 3, 9, 5]
k = 2
// For the 9 at index 2:

// Calculate start:
start = Math.max(0, 2 - 2)
      = Math.max(0, 0)
      = 0

// Calculate end:
end = Math.min(6, 2 + 2)
    = Math.min(6, 4)
    = 4

// Valid range is [0,1,2,3,4]
[3, 4, 9, 1, 3, 9, 5]
 ↑  ↑  ↑  ↑  ↑
 0  1  2  3  4
```

## **Why this matters:**

Without these boundary checks:

- Negative indices could cause undefined behavior
- Indices beyond array length would return undefined values
- Could cause runtime errors in the program

Here's a visualization of all possible cases:

```javascript
// Case 1: Normal case (middle of array)
j = 3, k = 2
start = Math.max(0, 3-2) = 1
end = Math.min(6, 3+2) = 5
Range: [1,2,3,4,5]

// Case 2: Near start of array
j = 1, k = 2
start = Math.max(0, 1-2) = 0  // Prevented negative index
end = Math.min(6, 1+2) = 3
Range: [0,1,2,3]

// Case 3: Near end of array
j = 5, k = 2
start = Math.max(0, 5-2) = 3
end = Math.min(6, 5+2) = 6  // Prevented exceeding length
Range: [3,4,5,6]
```

Think of it as putting "guardrails" on both ends of our range calculation to ensure we never try to access array positions that don't exist.

Would you like me to show how this behaves with different values of k or array sizes?

## **Let me walk you through how the boundary calculations behave with different array sizes and k values. This will help build a deeper understanding of how our "guardrails" work in various scenarios.**

Let's start with a small array and gradually explore different situations:

### **Scenario 1: Small Array, Large k**

```javascript
nums = [1, 2, 3]  // length = 3, indices: 0,1,2
k = 4

// Let's find valid ranges for each position:
For j = 0:
    start = Math.max(0, 0-4) = Math.max(0, -4) = 0
    end = Math.min(2, 0+4) = Math.min(2, 4) = 2
    Range: [0,1,2] (entire array)

For j = 1:
    start = Math.max(0, 1-4) = Math.max(0, -3) = 0
    end = Math.min(2, 1+4) = Math.min(2, 5) = 2
    Range: [0,1,2] (entire array)

For j = 2:
    start = Math.max(0, 2-4) = Math.max(0, -2) = 0
    end = Math.min(2, 2+4) = Math.min(2, 6) = 2
    Range: [0,1,2] (entire array)
```

Notice how with a large k relative to array size, every position's range covers the entire array because our boundary checks prevent going out of bounds.

### **Scenario 2: Medium Array, Small k**

```javascript
nums = [5, 8, 2, 9, 3, 6]  // length = 6, indices: 0-5
k = 1

For j = 0:
    start = Math.max(0, 0-1) = Math.max(0, -1) = 0
    end = Math.min(5, 0+1) = Math.min(5, 1) = 1
    Range: [0,1] (just the first two elements)

For j = 3 (middle):
    start = Math.max(0, 3-1) = Math.max(0, 2) = 2
    end = Math.min(5, 3+1) = Math.min(5, 4) = 4
    Range: [2,3,4] (balanced range)

For j = 5 (last):
    start = Math.max(0, 5-1) = Math.max(0, 4) = 4
    end = Math.min(5, 5+1) = Math.min(5, 6) = 5
    Range: [4,5] (just the last two elements)
```

Here we see how a small k creates "windows" of valid indices that change as we move through the array.

### **Scenario 3: Large Array, Medium k**

```javascript
nums = [1,2,3,4,5,6,7,8,9,10]  // length = 10, indices: 0-9
k = 3

For j = 0 (start):
    start = Math.max(0, 0-3) = Math.max(0, -3) = 0
    end = Math.min(9, 0+3) = Math.min(9, 3) = 3
    Range: [0,1,2,3] (left-bounded)

For j = 5 (middle):
    start = Math.max(0, 5-3) = Math.max(0, 2) = 2
    end = Math.min(9, 5+3) = Math.min(9, 8) = 8
    Range: [2,3,4,5,6,7,8] (full window)

For j = 9 (end):
    start = Math.max(0, 9-3) = Math.max(0, 6) = 6
    end = Math.min(9, 9+3) = Math.min(9, 12) = 9
    Range: [6,7,8,9] (right-bounded)
```

### **Key Insights:**

1. When k is larger than the array length, our ranges still stay within bounds, but effectively cover the whole array.

2. The "window" size is actually (2k + 1) when there's room, because it includes:

   - k positions to the left
   - the position itself
   - k positions to the right

3. Three distinct behaviors emerge:
   - At the start: right side extends normally, left side bounded by 0
   - In the middle: full window of 2k + 1 positions (when possible)
   - At the end: left side extends normally, right side bounded by array length - 1

This boundary handling ensures our code works correctly regardless of:

- Array size
- Value of k
- Position within the array
- Edge cases at array boundaries

Would you like to explore any particular combination of array size and k value to see how the ranges would work out? Or shall we look at how this affects the actual indices we collect for our k-distant indices problem?

### **Let me walk you through a detailed comparison of both approaches across different scenarios. Understanding the trade-offs will help you make better decisions when solving similar problems.**

The Set-based Solution:

```javascript
// Simplified version of first approach
function findKDistantIndicesWithSet(nums, key, k) {
  const keyIndices = [];
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] === key) keyIndices.push(j);
  }

  const validIndices = new Set();
  for (const j of keyIndices) {
    const start = Math.max(0, j - k);
    const end = Math.min(nums.length - 1, j + k);
    for (let i = start; i <= end; i++) {
      validIndices.add(i);
    }
  }

  return Array.from(validIndices).sort((a, b) => a - b);
}
```

The Two-pointer Solution:

```javascript
// Simplified version of second approach
function findKDistantIndicesWithPointers(nums, key, k) {
  const keyIndices = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === key) keyIndices.push(i);
  }

  const result = [];
  let currentIndex = 0;
  let keyPtr = 0;

  while (currentIndex < nums.length && keyPtr < keyIndices.length) {
    const distance = Math.abs(currentIndex - keyIndices[keyPtr]);
    if (distance <= k) {
      result.push(currentIndex++);
    } else if (currentIndex < keyIndices[keyPtr]) {
      currentIndex++;
    } else {
      keyPtr++;
    }
  }

  return result;
}
```

Let's compare them across different scenarios:

Scenario 1: Sparse Key Occurrences

```javascript
(nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), (key = 5), (k = 1);
// Only one occurrence of key in a large array
```

Set-based Solution:

- Creates a small set (just 3 elements: 4,5,6)
- Still needs to sort, but very small sort
- Memory usage is minimal

Two-pointer Solution:

- Single pass through array
- No extra memory allocation beyond result
- More efficient here as it avoids Set operations
  Winner: Two-pointer approach (slightly better)

Scenario 2: Dense Key Occurrences

```javascript
(nums = [5, 1, 5, 2, 5, 3, 5, 4, 5]), (key = 5), (k = 1);
// Many occurrences of key close together
```

Set-based Solution:

- Set prevents duplicate indices automatically
- Multiple overlapping ranges handled efficiently
- Extra memory for Set, but deduplication is automatic

Two-pointer Solution:

- No duplicate checking needed
- Linear scan is efficient
- Might process same indices multiple times when ranges overlap
  Winner: Set-based approach (cleaner handling of overlaps)

Scenario 3: Large K Value

```javascript
(nums = [1, 2, 3, 4, 5]), (key = 3), (k = 100);
// k is much larger than array size
```

Set-based Solution:

- Will try to add many indices within large ranges
- Set prevents duplicates automatically
- More memory usage for Set operations

Two-pointer Solution:

- Simply walks through array once
- No extra memory for large ranges
- More efficient with large k values
  Winner: Two-pointer approach (more efficient with large ranges)

Scenario 4: Memory Constraints
When working with very large arrays and limited memory:

- Set-based Solution needs extra space for the Set and sorted array
- Two-pointer Solution only needs space for key indices and result
  Winner: Two-pointer approach (more memory efficient)

General Performance Characteristics:

Time Complexity Analysis:
Set-based Solution:

- Finding key indices: O(n)
- Adding to Set: O(m \* k) where m is number of key occurrences
- Sorting: O(n log n)
  Overall: O(n log n) dominated by the sort

Two-pointer Solution:

- Finding key indices: O(n)
- Processing indices: O(n)
  Overall: O(n) linear time

Space Complexity Analysis:
Set-based Solution:

- Set storage: O(n)
- Sorted array: O(n)
  Overall: O(n)

Two-pointer Solution:

- Key indices array: O(m) where m is number of keys
- Result array: O(n)
  Overall: O(n)

The key insights for choosing between them:

The Set-based solution is better when:

1. You expect many overlapping ranges and value code clarity
2. The order of operations needs to be more flexible
3. You're working with smaller arrays where the sorting cost is negligible

The Two-pointer solution is better when:

1. Memory efficiency is crucial
2. You're working with very large arrays
3. You need guaranteed linear time complexity
4. The k value is large relative to array size

## **Why Expanding the Range [j-k, j+k] is Crucial for the K-Distant Problem**

Let me explain why expanding the range [j-k, j+k] is fundamental to solving the K-distant indices problem. This concept is at the heart of understanding how we find all valid indices.

Think of the range expansion like ripples in a pond. When you drop a stone (our key value) into the water at position j, the ripples spread out in both directions by distance k. This creates a "zone of influence" around each key occurrence.

Let's break this down with a concrete example:

```javascript
nums = [7, 2, 9, 1, 3, 9, 5];
key = 9;
k = 2;
```

When we find a 9 at position 2, we need to:

1. Look backwards by k positions: [2-2 = 0] to 2
2. Look forwards by k positions: 2 to [2+2 = 4]

So for this first 9, our range is [0,1,2,3,4]. Let's visualize why each position qualifies:

```javascript
Index:    0   1   2   3   4   5   6
Value:    7   2   9   1   3   9   5
Distance: 2   1   0   1   2
          ↑   ↑   ↑   ↑   ↑
          |___|___|___|___|
          All these indices are within
          distance 2 of the 9 at index 2
```

Similarly, for the second 9 at position 5:

```javascript
Index:    0   1   2   3   4   5   6
Value:    7   2   9   1   3   9   5
Distance:             2   1   0   1
                      ↑   ↑   ↑   ↑
                      |___|___|___|
                      These indices are within
                      distance 2 of the 9 at index 5
```

The range expansion serves three crucial purposes:

1. **Completeness**: By expanding in both directions, we ensure we don't miss any valid indices. Every position that could possibly be within distance k of our key is included.

2. **Distance Property Preservation**: The expanded range guarantees that for any index i we include, there exists some key index j where |i - j| ≤ k. This is the fundamental property required by the problem.

3. **Boundary Management**: When we use Math.max(0, j-k) and Math.min(n-1, j+k), we ensure our ranges stay within array bounds while still capturing all valid indices.

Here's what happens as we process this example:

```javascript
// First 9 (j=2)
range = [0,1,2,3,4]
|i-j| calculations:
|0-2| = 2 ✓ (within k=2)
|1-2| = 1 ✓
|2-2| = 0 ✓
|3-2| = 1 ✓
|4-2| = 2 ✓

// Second 9 (j=5)
range = [3,4,5,6]
|i-j| calculations:
|3-5| = 2 ✓
|4-5| = 1 ✓
|5-5| = 0 ✓
|6-5| = 1 ✓
```

The final result combines all indices that fall within these ranges, which gives us [0,1,2,3,4,5,6]. Each index in our result is guaranteed to be within distance k=2 of at least one occurrence of 9.

This range expansion approach is particularly elegant because it:

1. Transforms a distance-based problem into a simpler range-based problem
2. Handles overlapping ranges naturally (an index might be close to multiple keys)
3. Makes it easy to verify the correctness of our solution

## **Let me explain how the range expansion concept works differently in both approaches, highlighting the unique advantages and trade-offs of each.**

First, let's review both implementations through the lens of range expansion:

### **Set-based Approach**

```javascript
const keyIndices = [];
for (let j = 0; j < nums.length; j++) {
  if (nums[j] === key) keyIndices.push(j);
}

const validIndices = new Set();
for (const j of keyIndices) {
  // Direct range expansion
  const start = Math.max(0, j - k);
  const end = Math.min(nums.length - 1, j + k);

  // Add entire range at once
  for (let i = start; i <= end; i++) {
    validIndices.add(i);
  }
}
```

### **Two-pointer Approach**

```javascript
const keyIndices = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] === key) keyIndices.push(i);
}

const result = [];
let currentIndex = 0;
let keyPtr = 0;

while (currentIndex < nums.length && keyPtr < keyIndices.length) {
  // Implicit range expansion through distance calculation
  const distance = Math.abs(currentIndex - keyIndices[keyPtr]);
  if (distance <= k) {
    result.push(currentIndex++);
  } else if (currentIndex < keyIndices[keyPtr]) {
    currentIndex++;
  } else {
    keyPtr++;
  }
}
```

Let's dive into how each approach handles range expansion:

**Set-based Approach - Explicit Range Expansion**
Think of this approach like painting with a broad brush. For each key we find, we:

1. Calculate the exact range boundaries upfront
2. Fill in all positions within that range at once
3. Let the Set handle any overlapping positions automatically

For example, with nums = [1,2,9,4,5,9,7], key = 9, k = 2:

```javascript
First 9 at index 2:
[1, 2, 9, 4, 5, 9, 7]
 ↑  ↑  ↑  ↑  ↑
 0  1  2  3  4     Range: [0,1,2,3,4]

Second 9 at index 5:
[1, 2, 9, 4, 5, 9, 7]
          ↑  ↑  ↑  ↑
          3  4  5  6  Range: [3,4,5,6]

Set combines these: [0,1,2,3,4,5,6]
```

**Two-pointer Approach - Implicit Range Expansion**
This approach is more like following a moving spotlight. We:

1. Move through the array position by position
2. Check if the current position is within range of any key
3. Move our pointers based on the relative positions

Using the same example:

```javascript
[1, 2, 9, 4, 5, 9, 7]
 c           k        currentIndex = 0, keyPtr at first 9 (index 2)
                      distance = |0-2| = 2 ≤ k, add 0

[1, 2, 9, 4, 5, 9, 7]
    c        k        currentIndex = 1, still checking first 9
                      distance = |1-2| = 1 ≤ k, add 1

[1, 2, 9, 4, 5, 9, 7]
       c     k        currentIndex = 2
                      distance = |2-2| = 0 ≤ k, add 2
```

The key differences in how they handle range expansion:

1. **Memory Usage**

   - Set-based: Stores all valid indices at once, potentially using more memory
   - Two-pointer: Builds result incrementally, using less temporary storage

2. **Overlap Handling**

   - Set-based: Automatically handles overlaps through Set properties
   - Two-pointer: Naturally handles overlaps by checking distance to nearest key

3. **Range Processing**

   - Set-based: Processes entire ranges at once, more intuitive for visualization
   - Two-pointer: Processes one position at a time, more efficient for large ranges

4. **Flexibility**
   - Set-based: Easy to modify for different range patterns or conditions
   - Two-pointer: More efficient but less flexible for modified requirements

Let's look at a specific example where these differences matter:

```javascript
(nums = [9, 1, 9, 1, 9]), (key = 9), (k = 2);
```

Set-based processes ranges:

```javascript
First 9 (index 0):  [0,1,2]
Second 9 (index 2): [0,1,2,3,4]
Third 9 (index 4):  [2,3,4]
Set handles all overlaps automatically
```

Two-pointer processes positions:

```javascript
Check 0: Within range of first 9
Check 1: Within range of first 9 and second 9
Check 2: Within range of first 9 and second 9
Check 3: Within range of second 9 and third 9
Check 4: Within range of second 9 and third 9
```

Would you like me to explore how these approaches handle any specific edge cases or create a detailed visualization of how they process a particular input?
