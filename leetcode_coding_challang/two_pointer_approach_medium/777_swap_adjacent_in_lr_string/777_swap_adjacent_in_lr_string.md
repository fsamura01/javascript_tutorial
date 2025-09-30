# Leetcode 777: Swap Adjacent in LR String - Complete Tutorial

Let me guide you through this problem using first-principles thinking, breaking it down into digestible concepts.

## 1. Problem Understanding 🎯

**In Simple Terms:**

Imagine you have a string with three types of characters: 'L', 'R', and 'X'. Think of:

- **'L'** as a person who can only move **left**
- **'R'** as a person who can only move **right**  
- **'X'** as an **empty space**

The rules are:

- An 'R' can swap with an 'X' to its right: "RX" → "XR" (R moves right)
- An 'L' can swap with an 'X' to its left: "XL" → "LX" (L moves left)

**The Question:** Can we transform the `start` string into the `result` string using only these swaps?

**Key Insight:**

- 'L' can only move **leftward** (decreasing index)
- 'R' can only move **rightward** (increasing index)
- 'L' and 'R' **cannot pass through each other** (their relative order must stay the same)
- 'X' is just empty space that allows movement

---

## 2. Constraints of the Problem 🔍

Let's understand what makes a transformation **impossible**:

### Critical Constraints

1. **Character Count Must Match:**
   - If `start` has 3 'L's, `result` must have 3 'L's
   - Same for 'R's and 'X's

2. **Relative Order is Sacred:**
   - If 'L' appears before 'R' in `start`, it must appear before that same 'R' in `result`
   - Example: "LR" can never become "RL"

3. **Movement Direction Rules:**
   - **'L' can only move left:** In `result`, 'L' must be at the same position or to the LEFT of where it was in `start`
   - **'R' can only move right:** In `result`, 'R' must be at the same position or to the RIGHT of where it was in `start`

4. **Edge Cases:**
   - Empty strings or single characters
   - All 'X's (always transformable to all 'X's)
   - No 'X's means strings must be identical

---

## 3. Break Down Into Manageable Parts 🧩

Let's decompose this problem:

### Part 1: Validate Character Sequences

- Remove all 'X's from both strings
- The remaining sequences must be identical
- Why? Because 'L' and 'R' cannot pass each other

### Part 2: Validate Movement Constraints

- For each 'L': its position in `result` ≤ its position in `start` (moved left or stayed)
- For each 'R': its position in `result` ≥ its position in `start` (moved right or stayed)

### Part 3: Position Tracking

- Use two pointers to traverse both strings simultaneously
- Skip 'X's and focus on 'L' and 'R' characters
- Compare positions when we find matching non-'X' characters

---

## 4. Pattern Identification 🎨

- **Primary Pattern: Two Pointers**

This problem is a classic **two-pointer** pattern with **invariant checking**.

**Why Two Pointers?**

- We need to compare corresponding elements from two sequences
- We need to skip 'X's (they're irrelevant noise)
- We process both strings in a single pass

**Related Patterns:**

- **String manipulation with constraints**
- **Invariant preservation** (relative order)
- **Greedy validation** (checking conditions as we go)

---

## 5. Step-by-Step Approach 🚀

### Algorithm Logic

```Javacript
Step 1: Initialize two pointers (i for start, j for result)

Step 2: While both pointers are in bounds:
    a. Skip all 'X' in start (increment i)
    b. Skip all 'X' in result (increment j)
    
    c. Check if both reached the end:
       - If yes → valid transformation ✓
       - If only one reached end → invalid ✗
    
    d. Check if characters match:
       - If start[i] ≠ result[j] → invalid ✗
    
    e. Check movement constraints:
       - If char is 'L' and i < j → L moved right → invalid ✗
       - If char is 'R' and i > j → R moved left → invalid ✗
    
    f. Move both pointers forward

Step 3: Return true (all checks passed)
```

**Rationale:**

- We ignore 'X's because they don't affect the relative order of 'L' and 'R'
- We check position constraints because 'L' and 'R' have directional movement restrictions
- Single-pass efficiency: O(n) time

---

## 6. Code Implementation 💻

### JavaScript Implementation

```javascript
/**
 * @param {string} start
 * @param {string} result
 * @return {boolean}
 */
var canTransform = function(start, result) {
    const n = start.length;
    
    // Two pointers: i for start, j for result
    let i = 0, j = 0;
    
    while (i < n || j < n) {
        // Skip all 'X' in start string
        while (i < n && start[i] === 'X') {
            i++;
        }
        
        // Skip all 'X' in result string
        while (j < n && result[j] === 'X') {
            j++;
        }
        
        // If both pointers reached the end, transformation is valid
        if (i === n && j === n) {
            return true;
        }
        
        // If only one pointer reached the end, invalid
        if (i === n || j === n) {
            return false;
        }
        
        // Characters at current positions must match
        if (start[i] !== result[j]) {
            return false;
        }
        
        // Check movement constraints:
        // 'L' can only move left (result position <= start position)
        if (start[i] === 'L' && i < j) {
            return false;
        }
        
        // 'R' can only move right (result position >= start position)
        if (start[i] === 'R' && i > j) {
            return false;
        }
        
        // Move both pointers forward
        i++;
        j++;
    }
    
    return true;
};

// Test cases
console.log(canTransform("RXXLRXRXL", "XRLXXRRLX")); // true
console.log(canTransform("X", "L")); // false
console.log(canTransform("XXXXXLXXXX", "LXXXXXXXXX")); // true
```

### Java Implementation

```java
class Solution {
    /**
     * Determines if start string can be transformed to result string
     * using allowed swap operations: XL->LX and RX->XR
     * 
     * @param start The starting string
     * @param result The target result string
     * @return true if transformation is possible, false otherwise
     */
    public boolean canTransform(String start, String result) {
        int n = start.length();
        
        // Two pointers: i for start, j for result
        int i = 0, j = 0;
        
        while (i < n || j < n) {
            // Skip all 'X' characters in start string
            while (i < n && start.charAt(i) == 'X') {
                i++;
            }
            
            // Skip all 'X' characters in result string
            while (j < n && result.charAt(j) == 'X') {
                j++;
            }
            
            // Both pointers reached the end - valid transformation
            if (i == n && j == n) {
                return true;
            }
            
            // Only one pointer reached the end - invalid
            if (i == n || j == n) {
                return false;
            }
            
            // The non-X characters must match at corresponding positions
            if (start.charAt(i) != result.charAt(j)) {
                return false;
            }
            
            // Movement constraint for 'L':
            // Can only move left, so position in result must be <= position in start
            if (start.charAt(i) == 'L' && i < j) {
                return false;
            }
            
            // Movement constraint for 'R':
            // Can only move right, so position in result must be >= position in start
            if (start.charAt(i) == 'R' && i > j) {
                return false;
            }
            
            // Move both pointers to next positions
            i++;
            j++;
        }
        
        return true;
    }
    
    // Test the solution
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.canTransform("RXXLRXRXL", "XRLXXRRLX")); // true
        System.out.println(solution.canTransform("X", "L")); // false
        System.out.println(solution.canTransform("XXXXXLXXXX", "LXXXXXXXXX")); // true
    }
}
```

---

## 7. Complexity Analysis 📊

### Time Complexity: **O(n)**

- **n** = length of the input strings
- We traverse each string exactly once with our two pointers
- Each character is visited at most once
- All operations inside the loop are O(1)

**Detailed Breakdown:**

```Javascrip
- Outer while loop: runs at most n iterations (i goes from 0 to n)
- Inner while loops (skipping X's): collectively process each character once
- Total: O(n) + O(n) = O(n)
```

### Space Complexity: **O(1)**

- Only using a constant amount of extra space
- Two integer pointers: `i` and `j`
- No additional data structures
- Input strings are not modified

**Why not O(n)?**

- We don't create any arrays or strings
- We don't use recursion (no call stack)
- Only primitive variables are used

---

## 8. Alternative Solutions 🔄

### Alternative 1: Remove X's First

```javascript
var canTransform = function(start, result) {
    // Remove all X's and compare sequences
    const startClean = start.replace(/X/g, '');
    const resultClean = result.replace(/X/g, '');
    
    // If L/R sequences don't match, impossible
    if (startClean !== resultClean) {
        return false;
    }
    
    // Check position constraints
    let startIdx = 0, resultIdx = 0;
    
    for (let i = 0; i < startClean.length; i++) {
        // Find next occurrence of current char in original strings
        while (start[startIdx] === 'X') startIdx++;
        while (result[resultIdx] === 'X') resultIdx++;
        
        if (startClean[i] === 'L' && startIdx < resultIdx) {
            return false;
        }
        if (startClean[i] === 'R' && startIdx > resultIdx) {
            return false;
        }
        
        startIdx++;
        resultIdx++;
    }
    
    return true;
};
```

**Pros:** More intuitive, clearer separation of concerns
**Cons:** O(n) extra space for cleaned strings, two passes

### Alternative 2: Stack-Based Approach

```javascript
var canTransform = function(start, result) {
    // Collect positions of L's and R's
    const startPos = [], resultPos = [];
    
    for (let i = 0; i < start.length; i++) {
        if (start[i] !== 'X') startPos.push([start[i], i]);
        if (result[i] !== 'X') resultPos.push([result[i], i]);
    }
    
    // Sequences must match
    if (startPos.length !== resultPos.length) return false;
    
    for (let i = 0; i < startPos.length; i++) {
        const [sChar, sIdx] = startPos[i];
        const [rChar, rIdx] = resultPos[i];
        
        if (sChar !== rChar) return false;
        if (sChar === 'L' && sIdx < rIdx) return false;
        if (sChar === 'R' && sIdx > rIdx) return false;
    }
    
    return true;
};
```

**Pros:** Very clear logic, easy to debug
**Cons:** O(n) extra space for position arrays

### Comparison

| Approach                   | Time | Space | Clarity      |
|----------------------------|------|-------|--------------|
| Two Pointers (Recommended) | O(n) | O(1)  | ⭐⭐⭐⭐    |
| Remove X's First           | O(n) | O(n)  | ⭐⭐⭐⭐⭐ |
| Stack-Based                | O(n) | O(n)  | ⭐⭐⭐⭐⭐  |

**Best Choice:** Two pointers for optimal space complexity

---

## 9. Practice Recommendations 📚

Master this pattern with these similar problems:

### Same Difficulty Level

1. **[LeetCode 809 - Expressive Words](https://leetcode.com/problems/expressive-words/)** - Two pointers with character grouping
2. **[LeetCode 844 - Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/)** - Two pointers with special characters
3. **[LeetCode 1570 - Dot Product of Two Sparse Vectors](https://leetcode.com/problems/dot-product-of-two-sparse-vectors/)** - Two pointers with skipping

### Slightly Harder

1. **[LeetCode 678 - Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/)** - Constraints with wildcards
2. **[LeetCode 763 - Partition Labels](https://leetcode.com/problems/partition-labels/)** - Two pointers with intervals

### Related String Transformation

1. **[LeetCode 459 - Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)** - String pattern matching
2. **[LeetCode 1016 - Binary String With Substrings Representing 1 To N](https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n/)** - String validation

### Practice Strategy

- **Week 1:** Solve problems 1-3 (two pointers fundamentals)
- **Week 2:** Tackle problems 4-5 (advanced constraints)
- **Week 3:** Review and solve problems 6-7 (pattern variations)

---

## 10. Flowchart Design 📊---

## 🎓 Key Takeaways

### Core Concepts Mastered

1. **Two-pointer technique** for string comparison with filtering
2. **Invariant preservation** - understanding what cannot change
3. **Directional constraints** - movement rules affect position relationships
4. **Efficient filtering** - skipping irrelevant data (X's) on the fly

### Problem-Solving Strategy

1. **Identify what cannot change:** The sequence of L's and R's
2. **Identify what can change:** The positions of L's and R's (within constraints)
3. **Model the constraints:** L moves left, R moves right
4. **Validate efficiently:** Single pass with two pointers

### Interview Tips

- Start by explaining the intuition (L and R are people moving in opposite directions)
- Clarify the constraints before coding
- Mention the O(1) space optimization
- Test with edge cases: all X's, no X's, single character

**You've now mastered LeetCode 777!** 🎉 The two-pointer pattern with constraint checking is a powerful technique you'll use in many string manipulation problems. Practice the recommended problems to solidify your understanding!
