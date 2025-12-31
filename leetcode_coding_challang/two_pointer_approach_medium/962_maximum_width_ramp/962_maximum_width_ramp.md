# **LeetCode 962: Maximum Width Ramp - Complete Guide**

I notice there's some confusion in your problem statement (it mentions two different problems), but I'll focus on **LeetCode 962: Maximum Width Ramp** as specified in your title. Let me guide you through this problem using first-principles thinking.

---

## **1. Problem Understanding**

**Simple Terms:**

- You have an array of numbers
- A "ramp" is when you find two positions `i` and `j` where:
  - `i` comes before `j` (i < j)
  - The value at position `i` is less than or equal to the value at position `j` (nums[i] ≤ nums[j])
- The "width" of a ramp is the distance between these positions: `j - i`
- Find the **maximum possible width**

**Example Walkthrough:**

```Javascript
nums = [6, 0, 8, 2, 1, 5]
indices: 0  1  2  3  4  5

Valid ramps:
- (1, 5): nums[1]=0 ≤ nums[5]=5, width = 5-1 = 4 ✓ (Maximum!)
- (1, 2): nums[1]=0 ≤ nums[2]=8, width = 2-1 = 1
- (4, 5): nums[4]=1 ≤ nums[5]=5, width = 5-4 = 1
```

---

## **2. Constraints Analysis**

**Given Constraints:**

- `2 ≤ nums.length ≤ 50,000` → Need efficient solution (O(n) or O(n log n))
- `0 ≤ nums[i] ≤ 50,000` → All non-negative integers
- Must return 0 if no ramp exists

**Key Insights from Constraints:**

1. Array size up to 50K means O(n²) brute force might be too slow
2. We need at least 2 elements, so edge cases are minimal
3. Non-negative values simplify comparisons (no overflow concerns)

---

## **3. Keyword Highlighting**

🔑 **Critical Keywords:**

- **"maximum width"** → Optimization problem (maximize j - i)
- **"i < j"** → Sequential constraint (can't look backwards)
- **"nums[i] ≤ nums[j]"** → Value constraint (need increasing/equal)
- **"pair (i, j)"** → We're finding relationships between two indices

**Pattern Signals:**

- "Maximum/Minimum" → Often DP, Greedy, or Stack
- "Pairs with constraints" → Two pointers or Monotonic Stack
- "Sequential relationship" → Consider preprocessing or scanning

---

## **4. Breaking Down the Problem**

**Subproblems:**

**Part A: What makes a good candidate for `i`?**

- We want `i` as small as possible (leftmost position)
- We want `nums[i]` as small as possible (easier to find valid `j`)

**Part B: What makes a good candidate for `j`?**

- We want `j` as large as possible (rightmost position)
- We need `nums[j] ≥ nums[i]`

**Part C: The Tradeoff:**

- Smaller indices give larger widths
- But smaller indices might have larger values (harder to match)

**Key Realization:**
If we're at index `i` and looking for the best `j`, we don't need to check indices before `i` again. This suggests we can preprocess information.

---

## 5. Pattern Identification

**Primary Pattern:
Monotonic Stack + Two Pointers**

**Why This Pattern?**

1. **Monotonic Stack:** Build a stack of candidate indices for `i` where values are strictly decreasing
   - Why? If nums[a] ≤ nums[b] and a < b, then `a` is always a better candidate than `b` (same or better value, larger potential width)

2. **Two Pointers:** Scan from right to left for `j`, matching with stack candidates
   - Why? We want to maximize width, so check rightmost positions first

**Similar Problems Using This Pattern:**

- Trapping Rain Water (monotonic stack)
- Largest Rectangle in Histogram (monotonic stack)
- Container With Most Water (two pointers)

---

## 6. Step-by-Step Approach

**Strategy:
Monotonic Decreasing Stack + Backward Scan**

### Phase 1: Build Candidate Stack for `i`

```Javascript
Scan left to right:
- Only keep indices where values are strictly decreasing
- These are the only candidates that could give maximum width
```

**Why?** If nums[3] = 5 and nums[7] = 4, and we're looking for a match at j=10 where nums[10]=6:

- Both could form ramps, but index 3 gives width=7 vs index 7 gives width=3
- Since nums[3] > nums[7], index 7 dominates index 3

### **Phase 2: Scan for `j` from Right**

```Javascript
Scan right to left:
- For each potential j, find the leftmost i in stack where nums[i] ≤ nums[j]
- Pop from stack as we find matches (they can't give better results later)
- Track maximum width
```

**Why scan right to left?** We want to maximize `j` first, giving us the best chance at maximum width.

---

## **7. Code Implementation**

### **JavaScript Solution**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxWidthRamp = function(nums) {
    const n = nums.length;
    const stack = []; // Monotonic decreasing stack of indices
    
    // Phase 1: Build monotonic decreasing stack
    // Only keep indices where values strictly decrease
    for (let i = 0; i < n; i++) {
        // If stack is empty or current value is smaller, add to stack
        if (stack.length === 0 || nums[i] < nums[stack[stack.length - 1]]) {
            stack.push(i);
        }
    }
    
    let maxWidth = 0;
    
    // Phase 2: Scan from right to find maximum width
    // For each j, find the smallest i where nums[i] <= nums[j]
    for (let j = n - 1; j >= 0; j--) {
        // While we can form a valid ramp with top of stack
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
            const i = stack.pop();
            maxWidth = Math.max(maxWidth, j - i);
        }
    }
    
    return maxWidth;
};

// Test cases
console.log(maxWidthRamp([6,0,8,2,1,5])); // Output: 4
console.log(maxWidthRamp([9,8,1,0,1,9,4,0,4,1])); // Output: 7
```

### **Java Solution**

```java
class Solution {
    /**
     * Find maximum width ramp in array
     * @param nums input array
     * @return maximum width of ramp, or 0 if none exists
     */
    public int maxWidthRamp(int[] nums) {
        int n = nums.length;
        // Stack to store candidate indices for i (decreasing values)
        Stack<Integer> stack = new Stack<>();
        
        // Phase 1: Build monotonic decreasing stack
        // Only indices with strictly decreasing values are candidates
        for (int i = 0; i < n; i++) {
            if (stack.isEmpty() || nums[i] < nums[stack.peek()]) {
                stack.push(i);
            }
        }
        
        int maxWidth = 0;
        
        // Phase 2: Scan from right to left for j
        // Pop stack when we find valid ramps to maximize width
        for (int j = n - 1; j >= 0; j--) {
            // While current j can form ramp with top of stack
            while (!stack.isEmpty() && nums[stack.peek()] <= nums[j]) {
                int i = stack.pop();
                maxWidth = Math.max(maxWidth, j - i);
            }
        }
        
        return maxWidth;
    }
}
```

**Key Code Insights:**

1. **Stack Building (Phase 1):**
   - Only add index if value is smaller than stack top
   - This ensures monotonic decreasing property

2. **Width Calculation (Phase 2):**
   - Start from rightmost position (maximize j)
   - Pop stack when we find matches (they won't give better results later)
   - Once popped, an index is "used up" for maximum width

---

## **8. Complexity Analysis**

### *Time Complexity: **O(n)***

**Breakdown:**

- Phase 1 (Building stack): O(n) - scan array once
- Phase 2 (Finding max width): O(n) - each element pushed once, popped at most once
- Total: O(n) + O(n) = O(n)

**Why each element is processed once:**

- In Phase 1: Each index considered once for stack
- In Phase 2: Each index in stack popped at most once
- Amortized: Even with nested while loop, total operations = O(n)

### *Space Complexity: **O(n)***

**Breakdown:**

- Stack storage: O(n) in worst case (strictly decreasing array)
- No other significant data structures
- Example worst case: [9,8,7,6,5,4,3,2,1] → stack holds all indices

**Space Optimization:**

- Could reuse input array if allowed (not recommended)
- Stack size typically much smaller than n in practice

---

## **9. Alternative Solutions**

### *Alternative 1: Brute Force (Not Recommended)*

```javascript
// O(n²) time, O(1) space
var maxWidthRamp = function(nums) {
    let maxWidth = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] <= nums[j]) {
                maxWidth = Math.max(maxWidth, j - i);
            }
        }
    }
    return maxWidth;
};
```

**Pros:** Simple to understand
**Cons:** O(n²) - too slow for large inputs (50K elements)

### *Alternative 2: Sorting with Index Tracking*

```javascript
// O(n log n) time, O(n) space
var maxWidthRamp = function(nums) {
    const n = nums.length;
    // Create array of [value, index] pairs and sort by value
    const indexed = nums.map((val, idx) => [val, idx]);
    indexed.sort((a, b) => a[0] - b[0]);
    
    let minIndex = n; // Track minimum index seen so far
    let maxWidth = 0;
    
    // For each value in sorted order
    for (let i = 0; i < n; i++) {
        const [val, idx] = indexed[i];
        maxWidth = Math.max(maxWidth, idx - minIndex);
        minIndex = Math.min(minIndex, idx);
    }
    
    return maxWidth;
};
```

**Pros:** Different perspective on the problem
**Cons:** O(n log n) - slower than O(n) stack solution

### *Comparison Table*

| Approach        | Time       | Space | Best For             |
|-----------------|------------|-------|----------------------|
| Monotonic Stack | O(n)       | O(n)  | **Optimal**          |
| Sorting         | O(n log n) | O(n)  | Alternative thinking |
| Brute Force     | O(n²)      | O(1)  | Small inputs only    |

---

## **10. Practice Recommendations**

### *Similar Problems (Monotonic Stack Pattern)*

**Easy:**

1. **LeetCode 496** - Next Greater Element I
2. **LeetCode 1475** - Final Prices With a Special Discount

**Medium:**
3. **LeetCode 739** - Daily Temperatures (very similar concept)
4. **LeetCode 503** - Next Greater Element II
5. **LeetCode 901** - Online Stock Span
6. **LeetCode 1944** - Number of Visible People in a Queue

**Hard:**
7. **LeetCode 84** - Largest Rectangle in Histogram
8. **LeetCode 85** - Maximal Rectangle

### *Similar Problems (Two Pointers + Optimization)*

1. **LeetCode 11** - Container With Most Water
2. **LeetCode 42** - Trapping Rain Water

**Practice Strategy:**

1. Start with Daily Temperatures (739) - builds stack intuition
2. Then try Next Greater Element problems
3. Finally tackle harder histogram problems

---

## **11. Flowchart Design---**

## **Summary & Key Takeaways**

### **Core Concepts Mastered**

1. **Monotonic Stack Pattern:** Used when you need to find the next/previous greater/smaller element with optimal efficiency

2. **Greedy + Preprocessing:** Sometimes the best approach is to identify candidates first, then scan optimally

3. **Index vs Value Optimization:** Different problems optimize different things—here we optimize index distance while respecting value constraints

### *Problem-Solving Framework Applied*

✅ Identified the optimization goal (maximize width)  
✅ Found the constraint (value relationship)  
✅ Recognized the tradeoff (index position vs value)  
✅ Applied appropriate pattern (monotonic stack)  
✅ Achieved optimal complexity (O(n))

### *When You See Similar Problems*

**Look for these signals:**

- "Maximum/Minimum distance/width/height"
- "Next greater/smaller element"
- "Pairs with sequential and value constraints"
- Array size > 10^4 (need better than O(n²))

**Think: Monotonic Stack might help!**
