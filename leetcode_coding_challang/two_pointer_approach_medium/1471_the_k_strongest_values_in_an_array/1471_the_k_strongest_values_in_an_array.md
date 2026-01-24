# LeetCode 1471: The k Strongest Values in an Array

Let me guide you through this problem using first-principles thinking to build deep understanding.

---

## 1. Problem Understanding 🎯

**In Simple Terms:**

We need to find the `k` "strongest" values from an array. But what makes a value "strong"?

1. **Find the median (center)**: Sort the array and pick the middle element using the formula `(n-1)/2`
2. **Measure strength**: A value's strength is determined by its distance from this center
3. **Tiebreaker rule**: If two values have equal distance, the larger value wins
4. **Return top k**: Give back the k strongest values in any order

**Edge Cases to Consider:**

- Array with duplicate values (Example 2: `[1,1,3,5,5]`)
- k equals array length (return everything)
- All elements equidistant from center (use tiebreaker)
- Negative numbers in the array

**Example Walkthrough:**

```Javascript
arr = [1,2,3,4,5], k = 2

Step 1: Sort → [1,2,3,4,5]
Step 2: Find center → index (5-1)/2 = 2 → center = 3
Step 3: Calculate distances:
  |1-3| = 2
  |2-3| = 1
  |3-3| = 0
  |4-3| = 1
  |5-3| = 2

Step 4: Compare strengths:
  5 and 1 both have distance 2, but 5 > 1, so 5 is strongest
  Then 1 (distance 2)
  Then 4 (distance 1)
  Then 2 (distance 1)
  Then 3 (distance 0)

Step 5: Return top 2 → [5,1]
```

---

## 2. Constraints Analysis 📊

Let's analyze what the constraints tell us:

```Javascript
1 ≤ arr.length ≤ 10⁵     → Medium-sized array, O(n log n) is acceptable
-10⁵ ≤ arr[i] ≤ 10⁵      → Need to handle negative numbers
1 ≤ k ≤ arr.length        → Always valid k, no error handling needed
```

**Key Insights:**

- **10⁵ elements**: We can afford O(n log n) sorting operations
- **Negative numbers**: Our distance calculation `|arr[i] - m|` handles this naturally
- **k is always valid**: No need to check if k > array length
- **Return "any order"**: We don't need to maintain sorted output (saves time!)

---

## 3. Keyword Highlighting 🔑

| Keyword                     | Significance             | Pattern Hint                    |
|-----------------------------|--------------------------|---------------------------------|
| **"median/center"**         | Need sorted array        | Sorting required                |
| **"strongest"**             | Custom comparison        | Custom comparator               |
| **"top k"**                 | Partial selection        | Heap/QuickSelect or Sort+Select |
| **"any order"**             | No output sorting needed | Optimization opportunity        |
| **"\|arr[i] - m\|"**        | Distance metric          | Absolute value comparison       |
| **"if equal, larger wins"** | Tiebreaker rule          | Two-level comparison            |

**Pattern Recognition Keywords:**

- "Top K" → Think: Heap, QuickSelect, or Sorting
- "Custom ordering" → Think: Custom comparator
- "Distance from center" → Think: Median finding

---

## 4. Breaking Down The Problem 🧩

Let's decompose this into atomic operations:

### **Part 1: Find the Center**

```Javascript
Input: [6, -3, 7, 2, 11]
↓ Sort
[-3, 2, 6, 7, 11]
↓ Calculate index: (5-1)/2 = 2
↓ Get center
center = 6
```

### **Part 2: Define "Strength"**

```javascript
strength(value) = {
  primary: |value - center|,    // Distance from center
  secondary: value              // Tiebreaker: larger is stronger
}
```

### **Part 3: Sort by Strength**

```Javascript
Values: [6, -3, 7, 2, 11]
Center: 6

Strengths:
  11: |11-6|=5, value=11  → (5, 11) ← STRONGEST
  -3: |-3-6|=9, value=-3  → (9, -3) ← Wait, 9 > 5!
  7:  |7-6|=1,  value=7   → (1, 7)
  2:  |2-6|=4,  value=2   → (4, 2)
  6:  |6-6|=0,  value=6   → (0, 6)  ← WEAKEST

Sorted: [-3, 11, 2, 7, 6]
```

### **Part 4: Select Top k**

```Javascript
If k = 3, return first 3 from sorted list
```

---

## 5. Pattern Identification 🎨

This problem combines **two classic patterns**:

### **Primary Pattern: Top-K Elements**

Three approaches:

1. **Full Sort** → O(n log n)
2. **Heap** → O(n log k)
3. **QuickSelect** → O(n) average

### **Secondary Pattern: Custom Comparator**

We need to define custom ordering rules:

- Primary key: Distance from median
- Secondary key: Original value (for tiebreaker)

**Best Approach for This Problem:**
Given constraints (n ≤ 10⁵) and simplicity, **full sorting with custom comparator** is optimal:

- Clean and readable
- O(n log n) is acceptable
- No need to maintain heap

---

## 6. Step-by-Step Approach 🚀

### **Algorithm:**

```Javascript
STEP 1: Sort the array
  Purpose: Find the median
  Time: O(n log n)

STEP 2: Calculate median
  Formula: sorted_array[(n-1)/2]
  Time: O(1)

STEP 3: Create comparison function
  For two elements a and b:
    - Calculate distA = |a - median|
    - Calculate distB = |b - median|
    - If distA ≠ distB: return element with larger distance
    - If distA = distB: return larger element
  
STEP 4: Sort original array using this comparator
  Time: O(n log n)

STEP 5: Return first k elements
  Time: O(k)

TOTAL TIME: O(n log n)
```

### **Rationale:**

- **Why sort twice?** First sort finds median, second sort ranks by strength
- **Why not use a heap?** Array is small (≤10⁵), and sorting is simpler
- **Why keep original array?** We need original values in output, not just sorted ones

---

## 7. Code Implementation 💻

### **JavaScript Solution**

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getStrongest = function(arr, k) {
    // STEP 1: Sort to find the median
    // We need a copy to avoid mutating original during median calculation
    const sorted = [...arr].sort((a, b) => a - b);
    
    // STEP 2: Calculate median using the given formula
    const n = arr.length;
    const medianIndex = Math.floor((n - 1) / 2);
    const median = sorted[medianIndex];
    
    // STEP 3 & 4: Sort by strength using custom comparator
    arr.sort((a, b) => {
        // Calculate distances from median
        const distA = Math.abs(a - median);
        const distB = Math.abs(b - median);
        
        // Primary comparison: larger distance is stronger
        if (distA !== distB) {
            return distB - distA;  // Descending order (strongest first)
        }
        
        // Tiebreaker: larger value is stronger
        return b - a;  // Descending order
    });
    
    // STEP 5: Return first k elements
    return arr.slice(0, k);
};

// Test cases
console.log(getStrongest([1,2,3,4,5], 2));        // [5,1] or [1,5]
console.log(getStrongest([1,1,3,5,5], 2));        // [5,5]
console.log(getStrongest([6,7,11,7,6,8], 5));     // [11,8,6,6,7]
```

### **Java Solution**

```java
class Solution {
    /**
     * Find k strongest values in array based on distance from median
     * @param arr input array
     * @param k number of strongest values to return
     * @return array of k strongest values
     */
    public int[] getStrongest(int[] arr, int k) {
        // STEP 1: Sort to find median (must sort original array)
        Arrays.sort(arr);
        
        // STEP 2: Calculate median using formula (n-1)/2
        int n = arr.length;
        int median = arr[(n - 1) / 2];
        
        // STEP 3 & 4: Sort by strength using custom comparator
        // We need to use Integer[] for custom comparator
        Integer[] boxedArr = new Integer[n];
        for (int i = 0; i < n; i++) {
            boxedArr[i] = arr[i];
        }
        
        Arrays.sort(boxedArr, (a, b) -> {
            // Calculate absolute distances from median
            int distA = Math.abs(a - median);
            int distB = Math.abs(b - median);
            
            // Primary: compare by distance (larger is stronger)
            if (distA != distB) {
                return distB - distA;  // Descending
            }
            
            // Tiebreaker: compare by value (larger is stronger)
            return b - a;  // Descending
        });
        
        // STEP 5: Extract first k elements and convert back to int[]
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = boxedArr[i];
        }
        
        return result;
    }
}
```

**Key Code Comments:**

1. **Median Calculation**: `(n-1)/2` using integer division automatically floors
2. **Custom Comparator**: Two-level comparison (distance, then value)
3. **Java Boxing**: Need `Integer[]` for custom comparator (primitive `int[]` doesn't support it)
4. **Descending Order**: `b - a` puts larger values first

---

## 8. Complexity Analysis ⚡

### **Time Complexity: O(n log n)**

| Step| Operation          | Time       | Explanation                        |
|-----|--------------------|------------|------------------------------------|
| 1   | Sort for median    | O(n log n) | QuickSort/MergeSort                |
| 2   | Find median        | O(1)       | Index access                       |
| 3   | Custom comparator  | O(1)       | Per comparison                     |
| 4   | Sort by strength   | O(n log n) | n elements, log n comparisons each |
| 5   | Slice/extract k    | O(k)       | Linear extraction                  |

**Total**: O(n log n) + O(n log n) + O(k) = **O(n log n)**

### **Space Complexity: O(n)**

| Component          | Space    | Reason               |
|--------------------|----------|----------------------|
| Sorted copy (JS)   | O(n)     | Need copy for median |
| Boxed array (Java) | O(n)     | Integer[] wrapper    |
| Sorting space      | O(log n) | Recursion stack      |
| Result array       | O(k)     | Output space         |

**Total**: **O(n)** (dominated by array copies)

**Note**: If we modify the array in-place, we could achieve O(log n) space, but the problem allows mutation so O(n) is acceptable.

---

## 9. Alternative Solutions 🔄

### **Approach 1: Min-Heap (K elements)**

```javascript
// Use a min-heap of size k to track strongest elements
var getStrongestHeap = function(arr, k) {
    const sorted = [...arr].sort((a, b) => a - b);
    const median = sorted[Math.floor((arr.length - 1) / 2)];
    
    // Min-heap with custom comparator
    const heap = new MinPriorityQueue({
        compare: (a, b) => {
            const distA = Math.abs(a - median);
            const distB = Math.abs(b - median);
            if (distA !== distB) return distA - distB;
            return a - b;
        }
    });
    
    // Maintain heap of size k
    for (let num of arr) {
        heap.enqueue(num);
        if (heap.size() > k) heap.dequeue();
    }
    
    return heap.toArray();
};
```

**Complexity**: O(n log k)  
**When to use**: When k << n (k is much smaller than n)

---

### **Approach 2: QuickSelect (Optimal)**

```javascript
// Use QuickSelect for O(n) average time
var getStrongestQuickSelect = function(arr, k) {
    const sorted = [...arr].sort((a, b) => a - b);
    const median = sorted[Math.floor((arr.length - 1) / 2)];
    
    // Custom comparator
    const isStronger = (a, b) => {
        const distA = Math.abs(a - median);
        const distB = Math.abs(b - median);
        if (distA !== distB) return distA > distB;
        return a > b;
    };
    
    // QuickSelect to partition k strongest to the left
    quickSelect(arr, 0, arr.length - 1, k, isStronger);
    
    return arr.slice(0, k);
};

function quickSelect(arr, left, right, k, comparator) {
    if (left >= right) return;
    
    const pivotIndex = partition(arr, left, right, comparator);
    
    if (pivotIndex === k - 1) return;
    else if (pivotIndex < k - 1) quickSelect(arr, pivotIndex + 1, right, k, comparator);
    else quickSelect(arr, left, pivotIndex - 1, k, comparator);
}

function partition(arr, left, right, comparator) {
    const pivot = arr[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
        if (comparator(arr[j], pivot)) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}
```

**Complexity**: O(n) average, O(n²) worst  
**When to use**: When you need optimal average-case performance

---

### **Comparison Table**

| Approach        | Time       | Space | Pros              | Cons                        |
|-----------------|------------|-------|-------------------|-----------------------------|
| **Full Sort**   | O(n log n) | O(n)  | Simple, clean     | Slightly slower for small k |
| **Heap**        | O(n log k) | O(k)  | Better for k << n | More complex code           |
| **QuickSelect** | O(n) avg   | O(1)  | Optimal average   | Worst case O(n²), complex   |

**Recommendation**: Use **Full Sort** for interviews—it's simple, clear, and the performance difference is negligible for n ≤ 10⁵.

---

## 10. Practice Recommendations 📚

Master the **Top-K Pattern** with these problems:

### **Similar Problems (Same Pattern)**

| #   | Problem                      | Difficulty | Key Similarity                |
|-----|------------------------------|------------|-------------------------------|
| 215 | Kth Largest Element in Array | Medium     | Top-K with heap/quickselect   |
| 347 | Top K Frequent Elements      | Medium     | Top-K with frequency counting |
| 973 | K Closest Points to Origin   | Medium     | Distance-based Top-K          |
| 692 | Top K Frequent Words         | Medium     | Top-K with custom comparator  |

### **Custom Comparator Practice**

| #    | Problem                           | Difficulty | Focus                |
|------|-----------------------------------|------------|----------------------|
| 1337 | K Weakest Rows in Matrix          | Easy       | Two-level comparison |
| 912  | Sort an Array                     | Medium     | Sorting fundamentals |
| 1636 | Sort Array by Increasing Frequency| Easy       | Custom sort logic    |

### **Learning Path**

```Javascript
Week 1: Master Top-K basics
  → Problem 215 (Kth Largest Element)
  → Problem 973 (K Closest Points)

Week 2: Custom comparators
  → Problem 1337 (K Weakest Rows)
  → Problem 1471 (This problem!)

Week 3: Advanced Top-K
  → Problem 347 (Top K Frequent)
  → Problem 692 (Top K Frequent Words)
```

---

## 11. Flowchart 📊---

## Summary & Key Takeaways 🎓

### **Core Concepts Mastered:**

1. **Top-K Pattern**: Recognize when to use sorting vs heap vs quickselect
2. **Custom Comparator**: Design two-level comparison logic
3. **Median Finding**: Use sorted array and formula-based indexing
4. **Distance Metrics**: Apply absolute value for strength calculation

### **Problem-Solving Template:**

```Javascript
Top-K Problems → Ask:
  1. What defines "top"? (distance, frequency, value)
  2. Do I need sorted output? (No → saves time)
  3. Is k << n? (Yes → consider heap)
  4. Is code simplicity important? (Yes → use sort)
```

### **Interview Tips:**

- **Start with brute force**: "I'd sort by strength and take k elements"
- **Discuss tradeoffs**: Mention heap for k << n
- **Clarify tiebreaker**: Always confirm custom comparison rules
- **Test edge cases**: Equal distances, negative numbers, k = n

You're now equipped to tackle Top-K problems with confidence! Practice the recommended problems to solidify these patterns. Good luck! 🚀
