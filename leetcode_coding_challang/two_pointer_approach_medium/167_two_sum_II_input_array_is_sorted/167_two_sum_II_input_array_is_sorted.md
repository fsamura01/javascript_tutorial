# LeetCode 167: Two Sum II - Input Array Is Sorted

Let me guide you through this problem using first-principles thinking and help you build a strong foundation for solving similar problems.

---

## 1. Problem Understanding

**In Simple Terms:**
You have a sorted list of numbers (like `[2, 7, 11, 15]`) and a target sum (like `9`). Your job is to find two numbers in this list that add up to the target. Instead of returning the numbers themselves, you return their positions (1-indexed, meaning counting starts from 1, not 0).

**Key Points:**

- The array is **already sorted** (this is crucial!)
- There's **exactly one solution** (no need to handle multiple answers or "no solution" cases)
- You **cannot use the same element twice** (different indices required)
- Must use **constant extra space** (can't create large auxiliary data structures)
- Return **1-indexed positions**, not 0-indexed

**Edge Cases to Consider:**

- Negative numbers (Example 3 shows this)
- Two-element array (minimum size)
- Target could be negative, zero, or positive
- Numbers at the beginning or end of array

---

## 2. Constraints Analysis

Let's understand what each constraint tells us:

| Constraint                        | What It Means                                 | How It Helps                                                      |
|-----------------------------------|-----------------------------------------------|-------------------------------------------------------------------|
| `2 <= numbers.length <= 3 * 10^4` | Array has at least 2 elements, at most 30,000 | Need efficient solution; O(n²) might be too slow for large inputs |
| `-1000 <= numbers[i] <= 1000`     | Numbers are bounded                           | Can have negative, zero, or positive numbers                      |
| `numbers is sorted`               | **CRITICAL**: Array is in non-decreasing order| Enables efficient search strategies (binary search, two pointers) |
| `exactly one solution`            | Guaranteed to find an answer                  | No need to handle "not found" cases; simplifies logic             |
| `constant extra space`            | O(1) space complexity                         | Can't use hash maps or additional arrays that grow with input     |

**The sorted constraint is the game-changer here!** It transforms this from a brute-force problem into an elegant two-pointer problem.

---

## 3. Keyword Highlighting

🔑 **Critical Keywords to Recognize:**

1. **"sorted"** / **"non-decreasing order"**
   - **Pattern Signal**: Two pointers, binary search
   - When you see "sorted," think: "Can I use the order to my advantage?"

2. **"constant extra space"** / **"O(1) space"**
   - **Pattern Signal**: Eliminates hash map approach
   - Must work with pointers/indices, not auxiliary structures

3. **"two numbers"** / **"pair"**
   - **Pattern Signal**: Two pointers technique
   - Looking for a pair means we can use left and right pointers

4. **"exactly one solution"**
   - **Simplification**: No need for edge case handling or multiple answers
   - Can return immediately when found

**Pattern Recognition Formula:**

```Javascript
Sorted Array + Find Pair + Constant Space = Two Pointers Pattern
```

---

## 4. Breaking Down the Problem

Let's decompose this into smaller parts:

### Part 1: What are we searching for?

- Two indices `i` and `j` where `i < j`
- Such that `numbers[i] + numbers[j] = target`

### Part 2: What property can we exploit?

- The array is sorted, so:
  - Smaller values are on the left
  - Larger values are on the right
  - If sum is too small → move left pointer right (increase sum)
  - If sum is too large → move right pointer left (decrease sum)

### Part 3: How do we search efficiently?

- Start with widest possible range: leftmost and rightmost elements
- Calculate their sum
- Adjust pointers based on comparison with target

### Part 4: When do we stop?

- When we find the exact sum (guaranteed to happen)

---

## 5. Pattern Identification

**Primary Pattern:
Two Pointers (Opposite Direction)**

**Why This Pattern?**

1. We need to find a **pair** of elements → Two pointers
2. Array is **sorted** → Can make intelligent decisions about pointer movement
3. Need **O(1) space** → Pointers don't use extra space
4. Looking for **sum relationship** → Compare current sum with target

**Two Pointers Strategy:**

```Javascript
Left Pointer (L)                Right Pointer (R)
     ↓                                 ↓
[2, 7, 11, 15]  target = 9

Calculate: numbers[L] + numbers[R]
- If sum < target → L++ (need larger sum)
- If sum > target → R-- (need smaller sum)
- If sum = target → Found! Return [L+1, R+1]
```

**Why Not Other Patterns?**

- ❌ **Hash Map**: Would work but violates O(1) space constraint
- ❌ **Brute Force**: O(n²) time, inefficient for large inputs
- ❌ **Binary Search**: Could work but two pointers is simpler and equally efficient

---

## 6. Step-by-Step Approach

**Algorithm Walkthrough:**

**Step 1:
Initialize Two Pointers**

- `left = 0` (start of array, 0-indexed)
- `right = numbers.length - 1` (end of array)

**Step 2:
Loop Until Solution Found**

```Javascript
While left < right:
    Calculate sum = numbers[left] + numbers[right]
    
    If sum == target:
        Return [left + 1, right + 1]  // Convert to 1-indexed
    
    Else if sum < target:
        left++  // Need larger value, move left pointer right
    
    Else:  // sum > target
        right--  // Need smaller value, move right pointer left
```

**Step 3:
Return Result**

- Since exactly one solution exists, we'll always find it in the loop

**Rationale Behind Each Step:**

1. **Why start at opposite ends?**
   - Covers the maximum range initially
   - Allows us to adjust up or down based on comparison

2. **Why move left pointer right when sum is too small?**
   - Moving left pointer right increases the sum (array is sorted)
   - Moving right pointer left would decrease the sum further (wrong direction)

3. **Why move right pointer left when sum is too large?**
   - Moving right pointer left decreases the sum
   - Moving left pointer right would increase the sum further (wrong direction)

**Example Trace:**

```Javascript
numbers = [2, 7, 11, 15], target = 9

Iteration 1:
  L=0, R=3 → numbers[0]=2, numbers[3]=15
  sum = 2 + 15 = 17 > 9 → R--

Iteration 2:
  L=0, R=2 → numbers[0]=2, numbers[2]=11
  sum = 2 + 11 = 13 > 9 → R--

Iteration 3:
  L=0, R=1 → numbers[0]=2, numbers[1]=7
  sum = 2 + 7 = 9 == 9 → Found! Return [1, 2]
```

---

## 7. Code Implementation

### JavaScript Implementation

```javascript
/**
 * Two Pointers Approach for Two Sum II
 * @param {number[]} numbers - Sorted array of integers (1-indexed for return)
 * @param {number} target - Target sum we're looking for
 * @return {number[]} - 1-indexed positions of the two numbers
 */
function twoSum(numbers, target) {
    // Initialize two pointers at opposite ends
    let left = 0;                    // Start pointer (0-indexed)
    let right = numbers.length - 1;   // End pointer (0-indexed)
    
    // Continue until pointers meet (guaranteed to find solution before this)
    while (left < right) {
        // Calculate current sum of elements at both pointers
        const currentSum = numbers[left] + numbers[right];
        
        // Check if we found the target sum
        if (currentSum === target) {
            // Return 1-indexed positions (add 1 to convert from 0-indexed)
            return [left + 1, right + 1];
        } 
        // If sum is too small, we need a larger value
        else if (currentSum < target) {
            left++;  // Move left pointer right to get larger number
        } 
        // If sum is too large, we need a smaller value
        else {
            right--; // Move right pointer left to get smaller number
        }
    }
    
    // This line should never be reached given problem constraints
    // (exactly one solution guaranteed)
    return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9));  // Output: [1, 2]
console.log(twoSum([2, 3, 4], 6));       // Output: [1, 3]
console.log(twoSum([-1, 0], -1));        // Output: [1, 2]
```

### Java Implementation

```java
/**
 * Two Pointers Approach for Two Sum II
 */
class Solution {
    /**
     * Finds two numbers in sorted array that sum to target
     * @param numbers Sorted array of integers
     * @param target Target sum
     * @return Array containing 1-indexed positions of the two numbers
     */
    public int[] twoSum(int[] numbers, int target) {
        // Initialize two pointers at opposite ends
        int left = 0;                      // Start pointer (0-indexed)
        int right = numbers.length - 1;    // End pointer (0-indexed)
        
        // Continue until pointers meet (guaranteed to find solution)
        while (left < right) {
            // Calculate current sum of elements at both pointers
            int currentSum = numbers[left] + numbers[right];
            
            // Check if we found the target sum
            if (currentSum == target) {
                // Return 1-indexed positions (add 1 to convert)
                return new int[]{left + 1, right + 1};
            } 
            // If sum is too small, we need a larger value
            else if (currentSum < target) {
                left++;  // Move left pointer right for larger number
            } 
            // If sum is too large, we need a smaller value
            else {
                right--; // Move right pointer left for smaller number
            }
        }
        
        // This should never be reached (exactly one solution guaranteed)
        return new int[]{};
    }
    
    // Test method
    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Test case 1
        int[] result1 = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println("[" + result1[0] + ", " + result1[1] + "]"); // [1, 2]
        
        // Test case 2
        int[] result2 = sol.twoSum(new int[]{2, 3, 4}, 6);
        System.out.println("[" + result2[0] + ", " + result2[1] + "]"); // [1, 3]
        
        // Test case 3
        int[] result3 = sol.twoSum(new int[]{-1, 0}, -1);
        System.out.println("[" + result3[0] + ", " + result3[1] + "]"); // [1, 2]
    }
}
```

---

## 8. Complexity Analysis

### Time Complexity: **O(n)**

**Why?**

- We traverse the array at most once
- In the worst case, `left` and `right` pointers meet in the middle
- Each iteration processes one comparison and moves one pointer
- Total iterations ≤ n (where n = array length)

**Best Case:** O(1) - When the first and last elements sum to target  
**Average Case:** O(n/2) ≈ O(n)  
**Worst Case:** O(n) - When solution is in the middle

### Space Complexity: **O(1)**

**Why?**

- We only use two integer variables (`left`, `right`)
- No additional data structures that scale with input size
- The result array is fixed size (2 elements) and doesn't count toward space complexity
- Satisfies the "constant extra space" constraint

**Space Used:**

- 2 integer pointers
- 1 integer for sum calculation
- 1 integer array of size 2 for result
- Total: O(1) constant space

### Comparison with Alternative Approaches

| Approach        | Time       | Space| Notes                                     |
|-----------------|------------|------|-------------------------------------------|
| **Two Pointers**| O(n)       | O(1) | ✅ Optimal - meets all constraints        |
| Brute Force     | O(n²)      | O(1) | Too slow for large inputs                 |
| Hash Map        | O(n)       | O(n) | ❌ Violates constant space constraint     |
| Binary Search   | O(n log n) | O(1) | Works but less efficient than two pointers|

---

## 9. Alternative Solutions

### Alternative 1: Binary Search Approach

**Concept:** For each element, binary search for its complement.

```javascript
function twoSumBinarySearch(numbers, target) {
    for (let i = 0; i < numbers.length - 1; i++) {
        const complement = target - numbers[i];
        
        // Binary search for complement in remaining array
        let left = i + 1;
        let right = numbers.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (numbers[mid] === complement) {
                return [i + 1, mid + 1];
            } else if (numbers[mid] < complement) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return [];
}
```

**Complexity:**

- Time: O(n log n) - n iterations × log n binary search
- Space: O(1)

**Trade-off:** Slightly worse time complexity than two pointers, but demonstrates alternative thinking.

---

### Alternative 2: Hash Map (If Space Wasn't Constrained)

**Concept:** Store seen numbers and their indices in a map.

```javascript
function twoSumHashMap(numbers, target) {
    const map = new Map();
    
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        
        if (map.has(complement)) {
            return [map.get(complement) + 1, i + 1];
        }
        
        map.set(numbers[i], i);
    }
    return [];
}
```

**Complexity:**

- Time: O(n)
- Space: O(n) - ❌ Violates constraint

**Note:** This is actually the standard approach for the unsorted version (LeetCode 1: Two Sum), but violates the constant space requirement here.

---

### Why Two Pointers is Optimal Here

1. ✅ **Leverages sorted property** maximally
2. ✅ **O(n) time** - linear and efficient
3. ✅ **O(1) space** - meets constraint
4. ✅ **Simple and intuitive** - easy to implement and understand
5. ✅ **One pass** - no need to revisit elements

---

## 10. Practice Recommendations

Master the **Two Pointers Pattern** with these similar problems:

### Beginner Level (Similar Difficulty)

1. **LeetCode 15: 3Sum** - Extend two pointers to find triplets
2. **LeetCode 125: Valid Palindrome** - Two pointers from opposite ends
3. **LeetCode 344: Reverse String** - Basic two pointers practice

### Intermediate Level

1. **LeetCode 11: Container With Most Water** - Two pointers with optimization
2. **LeetCode 16: 3Sum Closest** - Variant of 3Sum
3. **LeetCode 18: 4Sum** - Further extension of sum problems
4. **LeetCode 75: Sort Colors** - Dutch National Flag (two pointers variant)

### Advanced Level

1. **LeetCode 42: Trapping Rain Water** - Complex two pointers logic
2. **LeetCode 845: Longest Mountain in Array** - Two pointers with conditions
3. **LeetCode 925: Long Pressed Name** - Two pointers on different arrays

### Related Patterns to Learn

- **Fast & Slow Pointers** (LeetCode 141: Linked List Cycle)
- **Sliding Window** (LeetCode 3: Longest Substring Without Repeating)
- **Binary Search on Sorted Array** (LeetCode 704: Binary Search)

**Practice Strategy:**

1. Start with similar two-pointer problems (problems 1-3)
2. Progress to variants (problems 4-7)
3. Challenge yourself with complex scenarios (problems 8-10)
4. Focus on recognizing when to use two pointers vs. other patterns

---

## 11. Flowchart Design---

## Key Takeaways

🎯 **Core Lessons:**

1. **Sorted arrays enable efficient two-pointer techniques** - The sorted property is your biggest hint!

2. **Two pointers pattern recognition:**
   - Finding pairs/triplets in sorted arrays
   - When you need O(1) space
   - When comparing elements from different positions

3. **Pointer movement logic:**
   - If sum is too small → increase it (move left pointer right)
   - If sum is too large → decrease it (move right pointer left)
   - This only works because the array is sorted!

4. **Index conversion:** Remember to convert between 0-indexed (code) and 1-indexed (problem requirements)

5. **Constraints guide solutions:** The "constant space" requirement eliminates hash map approaches

---

## Your Learning Checklist

✅ Can you explain why two pointers works for this problem?  
✅ Can you trace through the algorithm with a custom example?  
✅ Can you identify when to use two pointers vs. hash map?  
✅ Can you code this from memory in both JavaScript and Java?  
✅ Do you understand the time and space complexity?  
✅ Can you recognize similar problems that use this pattern?

---

Now you have a comprehensive understanding of LeetCode 167! The two-pointer technique is one of the most elegant patterns in competitive programming. Practice the recommended problems to solidify your understanding, and you'll start recognizing this pattern instantly in interviews. Good luck! 🚀
