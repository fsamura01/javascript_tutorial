# Missing Number

I'll provide multiple solutions with different approaches, including the optimal O(1) space solution.

## Approach 1: Mathematical Sum (Optimal)

The sum of numbers from 0 to n is `n * (n + 1) / 2`. We can subtract the sum of array elements to find the missing number.

```python
def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
```

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

## Approach 2: XOR (Optimal)

Using the property that `a ^ a = 0` and `a ^ 0 = a`. XOR all indices and values together - pairs cancel out, leaving only the missing number.

```python
def missingNumber(nums):
    missing = len(nums)
    for i, num in enumerate(nums):
        missing ^= i ^ num
    return missing
```

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

## Approach 3: Cyclic Sort (In-place)

Place each number at its correct index position, then find the missing one.

```python
def missingNumber(nums):
    i = 0
    n = len(nums)
    
    # Place each number at its correct position
    while i < n:
        correct_pos = nums[i]
        if correct_pos < n and nums[i] != nums[correct_pos]:
            nums[i], nums[correct_pos] = nums[correct_pos], nums[i]
        else:
            i += 1
    
    # Find the missing number
    for i in range(n):
        if nums[i] != i:
            return i
    
    return n
```

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

## Complete Solution with Test Cases## Explanation of Solutions

### 1. **Mathematical Sum (Recommended)**

- Calculate the expected sum of 0 to n: `n × (n + 1) / 2`
- Subtract the actual sum of array elements
- The difference is the missing number
- Clean and intuitive

### 2. **XOR Approach**

- XOR has useful properties: `a ^ a = 0` and `a ^ 0 = a`
- XOR all indices (0 to n-1) and all values together
- All present numbers cancel out, leaving only the missing one
- More elegant but less intuitive

### 3. **Cyclic Sort**

- Place each number at its correct index position
- After sorting, the index with wrong value is the answer
- More complex but demonstrates in-place manipulation

All three solutions meet the follow-up requirements: **O(1) space** and **O(n) time**. The mathematical sum approach is the most straightforward and recommended for interviews.

---

```javascript
var missingNumber = function(nums) {
    const n = nums.length;
    const expectedSum = n * (n + 1) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
};
```

### 2. **XOR** (Most Elegant)

```javascript
var missingNumber = function(nums) {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    return missing;
};
```

### 3. **Cyclic Sort** (In-place)

```javascript
var missingNumber = function(nums) {
    const n = nums.length;
    let i = 0;
    
    while (i < n) {
        const correctPos = nums[i];
        if (correctPos < n && nums[i] !== nums[correctPos]) {
            [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
        } else {
            i++;
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) return i;
    }
    return n;
};
```

All solutions meet the **O(1) space** and **O(n) time** requirements. The mathematical sum approach is recommended for its clarity and readability!

---
Great questions! Let me break down the logic for both approaches:## Quick Visual Explanation

### **1. Why `n * (n + 1) / 2`?**

This is the **Gauss formula** for the sum of natural numbers:

```Javascript
Sum of 0 to n = 0 + 1 + 2 + 3 + ... + n = n * (n + 1) / 2
```

**Example:** Array `[3, 0, 1]`

- Length: `n = 3`
- Complete range: `0, 1, 2, 3` (4 numbers)
- Expected sum: `0 + 1 + 2 + 3 = 6`
- Formula: `3 * 4 / 2 = 6` ✓

**Why it works:**

```Javascript
0 + 1 + 2 + 3 + 4 + 5
Pair from ends:
(0+5) + (1+4) + (2+3) = 5 + 5 + 5 = 3 pairs × 5 = 15
General: (n/2) pairs × (n+1) = n * (n+1) / 2
```

---

### **2. Why `missing = nums.length` in XOR?**

In the array `[3, 0, 1]`:

- **Indices we loop through:** `0, 1, 2`
- **Complete range needed:** `0, 1, 2, 3`

We're **missing `3` from the indices**! So we initialize with `missing = 3` (which is `nums.length`).

**What we XOR:**

```javascript
missing = 3              // Start with n
missing ^= 0 ^ 3        // index 0, value 3
missing ^= 1 ^ 0        // index 1, value 0
missing ^= 2 ^ 1        // index 2, value 1
```

**After rearranging (XOR is commutative):**

```Javascript
3 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1
= (0^0) ^ (1^1) ^ (3^3) ^ 2
= 0 ^ 0 ^ 0 ^ 2
= 2 ✓
```

All **paired numbers cancel out** (a ^ a = 0), leaving only the missing number!

Run the updated artifact to see detailed step-by-step walkthroughs! 🎯

---

```javascrript binary search
var missingNumber = function(nums) {
    // Binary search requires a sorted array.
    // This step changes overall complexity to O(n log n).
    nums.sort((a, b) => a - b);

    let left = 0;
    let right = nums.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

      // If the value at the middle index is equal to the index itself,
      // all numbers up to and including 'mid' are present.
      // The missing number must be in the right half.
      if (nums[mid] === mid) {
          left = mid + 1;
      } 
      // If the value is greater than the index, it means 'mid'
      // or an earlier number is missing. We search the left half.
       else {
           right = mid;
      }
    }

    // The loop terminates when left === right.
    // 'left' (or 'right') will be the index of the first missing number,
    // which is the missing number itself.
    return left;
};
```
