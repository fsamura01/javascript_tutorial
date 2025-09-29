# LeetCode 532: K-diff Pairs in an Array

## 1. Problem Understanding

Find the count of unique pairs where the absolute difference equals k.

Key points:

- Pairs are unordered: (1,3) same as (3,1)
- Must be unique pairs, not unique indices
- Special case: k=0 means finding duplicates

## 2. Constraints Analysis

- `1 ≤ nums.length ≤ 10⁴` - Small to medium array size
- `-10⁷ ≤ nums[i] ≤ 10⁷` - Large range, no overflow concerns
- `0 ≤ k ≤ 10⁷` - Non-negative difference only

## 3. Break Down The Problem

1. Handle k=0 case: count elements with frequency ≥ 2
2. Handle k>0 case: for each unique element x, check if x+k exists
3. Ensure uniqueness by avoiding duplicate counting

## 4. Pattern Identification

**Hash Set/Map Pattern** - Perfect for:

- O(1) lookups to check existence
- Counting frequencies
- Ensuring uniqueness

## 5. Step-by-Step Approach

1. **Special case k=0**: Count elements appearing ≥ 2 times
2. **General case k>0**:
   - Store all numbers in a set for O(1) lookup
   - For each unique number x, check if x+k exists
   - Count such pairs

## 6. Code Implementation

```Javascript
// JavaScript Solution
function findPairs(nums, k) {
    // Special case: k = 0, we need duplicates
    if (k === 0) {
        const freq = new Map();
        // Count frequency of each number
        for (const num of nums) {
            freq.set(num, (freq.get(num) || 0) + 1);
        }
        
        // Count numbers that appear at least twice
        let count = 0;
        for (const [num, frequency] of freq) {
            if (frequency >= 2) {
                count++;
            }
        }
        return count;
    }
    
    // General case: k > 0
    const numSet = new Set(nums); // Remove duplicates for uniqueness
    let count = 0;
    
    // For each unique number, check if num + k exists
    for (const num of numSet) {
        if (numSet.has(num + k)) {
            count++;
        }
    }
    
    return count;
}

// Test cases
console.log(findPairs([3,1,4,1,5], 2)); // Output: 2
console.log(findPairs([1,2,3,4,5], 1)); // Output: 4  
console.log(findPairs([1,3,1,5,4], 0)); // Output: 1
```

```Java
// JavaScript Solution
function findPairs(nums, k) {
    // Special case: k = 0, we need duplicates
    if (k === 0) {
        const freq = new Map();
        // Count frequency of each number
        for (const num of nums) {
            freq.set(num, (freq.get(num) || 0) + 1);
        }
        
        // Count numbers that appear at least twice
        let count = 0;
        for (const [num, frequency] of freq) {
            if (frequency >= 2) {
                count++;
            }
        }
        return count;
    }
    
    // General case: k > 0
    const numSet = new Set(nums); // Remove duplicates for uniqueness
    let count = 0;
    
    // For each unique number, check if num + k exists
    for (const num of numSet) {
        if (numSet.has(num + k)) {
            count++;
        }
    }
    
    return count;
}

// Java Solution
import java.util.*;

class Solution {
    public int findPairs(int[] nums, int k) {
        // Special case: k = 0, we need duplicates
        if (k == 0) {
            Map<Integer, Integer> freq = new HashMap<>();
            // Count frequency of each number
            for (int num : nums) {
                freq.put(num, freq.getOrDefault(num, 0) + 1);
            }
            
            // Count numbers that appear at least twice
            int count = 0;
            for (int frequency : freq.values()) {
                if (frequency >= 2) {
                    count++;
                }
            }
            return count;
        }
        
        // General case: k > 0
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num); // Remove duplicates for uniqueness
        }
        
        int count = 0;
        // For each unique number, check if num + k exists
        for (int num : numSet) {
            if (numSet.contains(num + k)) {
                count++;
            }
        }
        
        return count;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Example 1 from problem
        int[] nums1 = {3, 1, 4, 1, 5};
        int k1 = 2;
        int result1 = solution.findPairs(nums1, k1);
        System.out.println("Test 1 - Input: " + Arrays.toString(nums1) + ", k = " + k1);
        System.out.println("Expected: 2, Got: " + result1);
        System.out.println("Status: " + (result1 == 2 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 2: Example 2 from problem
        int[] nums2 = {1, 2, 3, 4, 5};
        int k2 = 1;
        int result2 = solution.findPairs(nums2, k2);
        System.out.println("Test 2 - Input: " + Arrays.toString(nums2) + ", k = " + k2);
        System.out.println("Expected: 4, Got: " + result2);
        System.out.println("Status: " + (result2 == 4 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 3: Example 3 from problem (k = 0 case)
        int[] nums3 = {1, 3, 1, 5, 4};
        int k3 = 0;
        int result3 = solution.findPairs(nums3, k3);
        System.out.println("Test 3 - Input: " + Arrays.toString(nums3) + ", k = " + k3);
        System.out.println("Expected: 1, Got: " + result3);
        System.out.println("Status: " + (result3 == 1 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 4: Edge case - single element
        int[] nums4 = {1};
        int k4 = 0;
        int result4 = solution.findPairs(nums4, k4);
        System.out.println("Test 4 - Input: " + Arrays.toString(nums4) + ", k = " + k4);
        System.out.println("Expected: 0, Got: " + result4);
        System.out.println("Status: " + (result4 == 0 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 5: All duplicates with k = 0
        int[] nums5 = {1, 1, 1, 1};
        int k5 = 0;
        int result5 = solution.findPairs(nums5, k5);
        System.out.println("Test 5 - Input: " + Arrays.toString(nums5) + ", k = " + k5);
        System.out.println("Expected: 1, Got: " + result5);
        System.out.println("Status: " + (result5 == 1 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 6: No valid pairs
        int[] nums6 = {1, 2, 3, 4, 5};
        int k6 = 10;
        int result6 = solution.findPairs(nums6, k6);
        System.out.println("Test 6 - Input: " + Arrays.toString(nums6) + ", k = " + k6);
        System.out.println("Expected: 0, Got: " + result6);
        System.out.println("Status: " + (result6 == 0 ? "PASS" : "FAIL"));
        System.out.println();
        
        System.out.println("=== Test Summary ===");
        System.out.println("All test cases completed!");
    }
}

// Test cases
console.log(findPairs([3,1,4,1,5], 2)); // Output: 2
console.log(findPairs([1,2,3,4,5], 1)); // Output: 4  
console.log(findPairs([1,3,1,5,4], 0)); // Output: 1
```

## 7. Complexity Analysis

- **Time**: O(n) - Single pass to build set + single pass to check pairs
- **Space**: O(n) - Hash set stores all unique elements

## 8. Alternative Solutions

**Two Pointers (after sorting)**:

- Sort array: O(n log n)
- Use two pointers to find pairs
- Less optimal due to sorting overhead

## 9. Practice Recommendations

Similar hash set pattern problems:

- LeetCode 1: Two Sum
- LeetCode 15: 3Sum  
- LeetCode 202: Happy Number
- LeetCode 349: Intersection of Two Arrays

## 10. Flowchart Design

The solution uses the **hash set pattern** to achieve O(n) efficiency. The key insight is treating k=0 as a special case (finding duplicates) while the general case checks for num+k existence. This pattern frequently appears in interview problems involving pair/element existence checks.

---

## Why Split Into Two Cases?

**Mathematical Reason**: When k=0, we need `|nums[i] - nums[j]| = 0`, meaning `nums[i] = nums[j]`. This requires finding duplicate values, not different numbers.

## Case 1: k = 0 Logic

```javascript
// We need pairs where nums[i] = nums[j] (but i ≠ j)
// This means finding numbers that appear multiple times
const freq = new Map();
// Count: {1: 2, 3: 1, 5: 1, 4: 1} for [1,3,1,5,4]
```

**Why frequency ≥ 2?** If a number appears n times, it can form pairs with itself. We only need to count each unique duplicate once.

Example: `[1,3,1,5,4], k=0`

- Number 1 appears 2 times → can form pair (1,1)
- Only 1 unique duplicate → answer = 1

## Case 2: k > 0 Logic

```javascript
// We need |nums[i] - nums[j]| = k
// This means nums[j] = nums[i] + k OR nums[j] = nums[i] - k
// Since we check every number, we only need to check nums[i] + k
```

**Why only check `num + k`?**

- If we have numbers a and b where `b - a = k`
- When we process a: we check if `a + k` exists (finds b)
- When we process b: we check if `b + k` exists (different pair)
- No double counting because we use a Set (unique numbers only)

Example: `[3,1,4,1,5], k=2`

- Set: {3, 1, 4, 5}
- Check 3: does 3+2=5 exist? ✓ (pair: 3,5)
- Check 1: does 1+2=3 exist? ✓ (pair: 1,3)  
- Check 4: does 4+2=6 exist? ✗
- Check 5: does 5+2=7 exist? ✗
- Answer = 2

## Why This Algorithm?

1. **Correctness**: Handles both cases mathematically correctly
2. **Efficiency**: O(n) time vs O(n²) brute force
3. **Uniqueness**: Set automatically handles duplicate elimination
4. **Simplicity**: Clear separation of concerns

The key insight: k=0 is fundamentally different (finding duplicates) vs k>0 (finding arithmetic differences).

---
Let me break this down with concrete examples:

## Why Two Different Approaches?

**k = 0**: We need pairs where both numbers are *identical*
**k > 0**: We need pairs where numbers are *different* by exactly k

## Case 1: k = 0 (Finding Duplicates)

```javascript
nums = [1,3,1,5,4], k = 0
```

We need `|nums[i] - nums[j]| = 0`, so `nums[i] = nums[j]`

- Can we pair 1 with 1? YES (indices 0,2)
- Can we pair 3 with 3? NO (only appears once)
- Can we pair 5 with 5? NO (only appears once)

**Frequency counting**: Only number 1 appears ≥2 times → 1 unique pair

## Case 2: k > 0 (Finding Differences)

```javascript
nums = [3,1,4,1,5], k = 2
```

We need `|nums[i] - nums[j]| = 2`

Using set {1,3,4,5}, for each number check if `number + k` exists:

- 1: Does 1+2=3 exist? YES → pair (1,3)
- 3: Does 3+2=5 exist? YES → pair (3,5)  
- 4: Does 4+2=6 exist? NO
- 5: Does 5+2=7 exist? NO

Result: 2 pairs

## Why Not Use Same Logic for Both?

If we used frequency counting for k=2:

- We'd need complex logic to avoid double counting
- Set approach is simpler and naturally avoids duplicates

If we used set approach for k=0:

- `num + 0 = num`, so we'd check if number exists (always true)
- Wouldn't tell us about duplicates

Each case has the mathematically optimal approach.

---
For pair (1,3) with k=2:

**K-diff definition**: `|nums[i] - nums[j]| = k`

**Check**: `|1 - 3| = |-2| = 2`

Since `2 = k`, the pair (1,3) satisfies the k-diff condition.

The absolute difference between 1 and 3 is exactly 2, which matches our target k value.

---
Great question! Let me clarify the k=0 case logic:

## K=0 Case: When Do We Count a Number?

For k=0, we need pairs where `|nums[i] - nums[j]| = 0`, meaning `nums[i] = nums[j]` with `i ≠ j`.

**Rule**: A number can only form k=0 pairs if it appears **at least 2 times** in the array.

## Example Walkthrough

```javascript
nums = [1,3,1,5,4], k = 0
```

**Step 1**: Count frequencies

- 1 appears 2 times (indices 0, 2)
- 3 appears 1 time (index 1)
- 5 appears 1 time (index 3)
- 4 appears 1 time (index 4)

**Step 2**: Check each number

- **1**: frequency = 2 ≥ 2 ✓ → Can form pair (1,1) using indices 0,2
- **3**: frequency = 1 < 2 ✗ → Cannot pair with itself
- **5**: frequency = 1 < 2 ✗ → Cannot pair with itself  
- **4**: frequency = 1 < 2 ✗ → Cannot pair with itself

**Result**: Only 1 unique k-diff pair possible → answer = 1

## Why frequency ≥ 2?

You need at least 2 occurrences of the same number to form a valid pair with different indices (`i ≠ j` requirement).

---
The main method includes comprehensive test cases:

1. **Example 1**: Basic k>0 case with duplicates
2. **Example 2**: Consecutive numbers
3. **Example 3**: k=0 case (duplicate finding)
4. **Edge case**: Single element array
5. **All duplicates**: Multiple same numbers with k=0
6. **No pairs**: k value too large

Each test shows input, expected output, actual result, and pass/fail status. This helps verify the algorithm works correctly across different scenarios and edge cases.
