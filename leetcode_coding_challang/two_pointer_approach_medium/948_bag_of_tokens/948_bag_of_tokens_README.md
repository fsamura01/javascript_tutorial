# LeetCode 948: Bag of Tokens - Complete Tutorial

Let me guide you through this problem using first-principles thinking!

---

## 1. Problem Understanding

**In Simple Terms:**

You're playing a strategic game with tokens. Think of it like this:

- You have a **power meter** (starts at some value)
- You have a **score counter** (starts at 0)
- You have tokens with different values

**Two Actions You Can Take:**

1. **Face-up (Buy Score)**: Spend power to gain 1 point
   - Cost: token value in power
   - Gain: +1 score

2. **Face-down (Buy Power)**: Spend score to gain power
   - Cost: 1 score
   - Gain: token value in power

**Goal:** Maximize your final score!

**Key Insights:**

- You can only play each token once
- You choose the order to play tokens
- You want to END with the highest score possible
- Playing face-down reduces score (use strategically!)

---

## 2. Constraints of The Problem

Let's understand what these constraints tell us:

```Javascript
0 <= tokens.length <= 1000
0 <= tokens[i], power < 10^4
```

**What These Mean:**

1. **Empty array is possible** (`tokens.length = 0`): Return 0 immediately
2. **Small token values** (`< 10,000`): No overflow concerns, simple arithmetic
3. **Reasonable size** (≤ 1000 tokens): O(n log n) or O(n) solutions will work fine
4. **Non-negative values**: No need to handle negative numbers

**Edge Cases to Consider:**

- Empty tokens array → score = 0
- Single token you can't afford → score = 0
- Power is 0 → can't play any face-up initially
- All tokens too expensive → score = 0

---

## 3. Highlight Keywords

These keywords help you recognize similar problems:

🔑 **"Maximize"** → Optimization problem (greedy or DP)

🔑 **"Strategically playing"** → Order matters, need a strategy

🔑 **"Two ways to play"** → Trade-off decision making

🔑 **"Any number of tokens"** → Don't have to use all tokens

🔑 **"Unplayed token"** → Each token used at most once

**Pattern Recognition Signals:**

- **Exchange/Trade mechanics** → Often greedy with sorting
- **Maximize something by making choices** → Greedy algorithm candidate
- **Can operate from both ends** → Two-pointer technique

---

## 4. Break Down The Problem Into Manageable Parts

Let's decompose this step by step:

### Part 1: Understanding the Trade-offs

**Face-up Trade:**

- You lose power, gain score
- You want to use CHEAP tokens (lose less power)

**Face-down Trade:**

- You lose score, gain power
- You want to use EXPENSIVE tokens (gain more power)

### Part 2: The Strategy Emerges

**Key Realization:**

- To gain score efficiently → use smallest tokens face-up
- To regain power efficiently → use largest tokens face-down

**This suggests sorting!**

### Part 3: The Game Plan

1. Sort tokens (smallest to largest)
2. Use two pointers (left = smallest, right = largest)
3. Greedily take cheap tokens face-up (from left)
4. When stuck, trade expensive token face-down (from right) to continue
5. Track maximum score achieved

---

## 5. Pattern Identification

**Primary Pattern:** **Greedy Algorithm with Two Pointers**

**Why Greedy Works Here:**

1. **Optimal substructure**: Best way to play n tokens includes best way to play n-1 tokens
2. **Greedy choice property**: Always best to buy score with cheapest token available
3. **No future consequences**: Taking the cheapest token now doesn't hurt future decisions

**Why Two Pointers:**

- We want access to BOTH smallest (left) and largest (right) tokens
- After sorting, we can process from both ends simultaneously
- This gives us O(n) processing after O(n log n) sort

**Similar to:**

- Container With Most Water (two pointers after sorting)
- Trapping Rain Water (greedy decisions from both ends)

---

## 6. Approach Discussion

### Step-by-Step Strategy

***Step 1: Sort the tokens**

```Javascript
[100, 200, 300, 400] → Already sorted
```

*Rationale:* Access cheapest for buying score, most expensive for buying power

***Step 2: Initialize pointers and variables**

```Javascript
left = 0 (points to cheapest unplayed token)
right = tokens.length - 1 (points to most expensive unplayed token)
score = 0
maxScore = 0
```

***Step 3: Main loop (while left ≤ right)**

**Decision Tree at each step:**

```Javascript
Can I afford tokens[left]? (power >= tokens[left])
├─ YES → Play face-up (gain score)
│         power -= tokens[left]
│         score++
│         left++
│         maxScore = max(maxScore, score)
│
└─ NO → Do I have score to trade? (score >= 1)
          ├─ YES → Play face-down (gain power)
          │         power += tokens[right]
          │         score--
          │         right--
          │
          └─ NO → STUCK! Break out of loop
```

**Step 4:
Return maxScore**

### Why This Works

1. **Always try to gain score first** (face-up with cheapest)
2. **Only trade score for power when necessary** (face-down with most expensive)
3. **Track maximum because score fluctuates** (goes up with face-up, down with face-down)
4. **Stop when can't make progress** (can't afford cheapest and no score to trade)

---

## 7. Code Implementation

### JavaScript Solution

```javascript
/**
 * @param {number[]} tokens
 * @param {number} power
 * @return {number}
 */
var bagOfTokensScore = function(tokens, power) {
    // Edge case: empty tokens array
    if (tokens.length === 0) return 0;
    
    // Step 1: Sort tokens to access cheapest and most expensive easily
    tokens.sort((a, b) => a - b);
    
    // Step 2: Initialize two pointers and tracking variables
    let left = 0;                    // Points to cheapest token
    let right = tokens.length - 1;   // Points to most expensive token
    let score = 0;                   // Current score
    let maxScore = 0;                // Maximum score achieved
    
    // Step 3: Process tokens from both ends
    while (left <= right) {
        // Strategy A: Try to gain score with cheapest token
        if (power >= tokens[left]) {
            power -= tokens[left];   // Pay power
            score++;                 // Gain score
            left++;                  // Move to next cheapest
            maxScore = Math.max(maxScore, score); // Update max
        }
        // Strategy B: Trade score for power with most expensive token
        else if (score >= 1) {
            power += tokens[right];  // Gain power
            score--;                 // Pay score
            right--;                 // Move to next most expensive
            // Note: No maxScore update here (score decreased)
        }
        // Can't make any move - stuck!
        else {
            break;
        }
    }
    
    return maxScore;
};

// Test cases
console.log(bagOfTokensScore([100], 50));                    // 0
console.log(bagOfTokensScore([200, 100], 150));              // 1
console.log(bagOfTokensScore([100, 200, 300, 400], 200));   // 2
```

### Java Solution

```java
import java.util.Arrays;

class Solution {
    /**
     * Calculates maximum score achievable by playing tokens optimally
     * @param tokens Array of token values
     * @param power Initial power available
     * @return Maximum score achievable
     */
    public int bagOfTokensScore(int[] tokens, int power) {
        // Edge case: empty tokens array
        if (tokens.length == 0) return 0;
        
        // Step 1: Sort tokens for greedy approach
        Arrays.sort(tokens);
        
        // Step 2: Initialize pointers and tracking variables
        int left = 0;                      // Pointer to cheapest token
        int right = tokens.length - 1;     // Pointer to most expensive token
        int score = 0;                     // Current score
        int maxScore = 0;                  // Maximum score achieved
        
        // Step 3: Greedy two-pointer approach
        while (left <= right) {
            // Try to gain score by playing cheapest token face-up
            if (power >= tokens[left]) {
                power -= tokens[left];     // Spend power
                score++;                   // Gain score
                left++;                    // Move to next cheapest
                maxScore = Math.max(maxScore, score); // Track maximum
            }
            // If stuck, trade score for power using most expensive token
            else if (score >= 1) {
                power += tokens[right];    // Gain power
                score--;                   // Spend score
                right--;                   // Move to next most expensive
                // Don't update maxScore (score just decreased)
            }
            // Can't afford cheapest and no score to trade - stuck!
            else {
                break;
            }
        }
        
        return maxScore;
    }
    
    // Test method
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.bagOfTokensScore(new int[]{100}, 50));                   // 0
        System.out.println(solution.bagOfTokensScore(new int[]{200, 100}, 150));             // 1
        System.out.println(solution.bagOfTokensScore(new int[]{100, 200, 300, 400}, 200));  // 2
    }
}
```

### Key Code Insights

1. **Why `maxScore` separate from `score`?**
   - Score fluctuates (increases with face-up, decreases with face-down)
   - We want the PEAK score, not the final score

2. **Why `left <= right`?**
   - Ensures we don't process same token twice
   - When they cross, all tokens processed

3. **Why update `maxScore` only on face-up?**
   - Face-up increases score (potential new maximum)
   - Face-down decreases score (can't be new maximum)

---

## 8. Complexity Analysis

### Time Complexity: **O(n log n)**

**Breakdown:**

- Sorting: O(n log n)
- Two-pointer traversal: O(n) - each element visited once
- **Dominant term:** O(n log n) from sorting

### Space Complexity: **O(1)** or **O(log n)**

**Breakdown:**

- Variables (left, right, score, maxScore): O(1)
- Sorting space:
  - JavaScript: O(log n) - Timsort with recursion stack
  - Java: O(log n) - Dual-pivot quicksort with recursion
  
**In-place:** Yes, we sort the input array directly (can modify this if needed)

### Why This is Efficient

- **Optimal for this problem:** Can't do better than O(n log n) because we need sorted order
- **Single pass:** After sorting, only one traversal needed
- **No extra data structures:** Just pointers and counters

---

## 9. Alternative Solutions

### Alternative 1: Simulation (Brute Force)

**Idea:** Try all possible orderings and sequences of plays

```javascript
// Pseudocode - NOT RECOMMENDED
function bruteForce(tokens, power) {
    // Try all permutations of tokens
    // For each permutation, try all combinations of face-up/face-down
    // Track maximum score
}
```

**Complexity:** O(n! × 2^n) - exponential, way too slow

**Why it doesn't work:**

- 1000! permutations is astronomical
- Completely infeasible

### Alternative 2: Dynamic Programming

**Idea:** `dp[i][p][s]` = is it possible to reach token i with power p and score s?

```javascript
// Pseudocode
function dpSolution(tokens, power) {
    // dp[token_index][remaining_power][current_score]
    // Try face-up and face-down for each state
}
```

**Complexity:** O(n × P × S) where P = max power, S = max score

**Why greedy is better:**

- Greedy is simpler and more intuitive
- Greedy is faster (O(n log n) vs O(n × P × S))
- DP has large space requirements

### Alternative 3: Priority Queue (Heap)

**Idea:** Use min-heap for cheap tokens, max-heap for expensive tokens

```javascript
function heapSolution(tokens, power) {
    let minHeap = new MinPriorityQueue();
    let maxHeap = new MaxPriorityQueue();
    // Add all tokens to both heaps
    // Process similarly to two-pointer approach
}
```

**Complexity:** O(n log n) - same as sorting approach

**Why two-pointer is better:**

- Simpler implementation
- No extra data structures needed
- Same time complexity

### **Recommendation:** Stick with the greedy two-pointer solution

---

## 10. Practice Recommendations

Master this pattern with these similar problems:

### Same Pattern (Greedy + Two Pointers + Sorting)

1. **LeetCode 881: Boats to Save People** ⭐ Very Similar!
   - Sort + two pointers
   - Pair heaviest with lightest optimally

2. **LeetCode 455: Assign Cookies**
   - Greedy matching after sorting
   - Similar optimization strategy

3. **LeetCode 870: Advantage Shuffle** (Harder)
   - Sort + greedy assignment
   - Two-pointer strategy

### Related Greedy Problems

1. **LeetCode 435: Non-overlapping Intervals**
   - Greedy interval selection
   - Sorting + greedy choices

2. **LeetCode 452: Minimum Number of Arrows to Burst Balloons**
   - Similar greedy optimization

### Two-Pointer Practice

1. **LeetCode 11: Container With Most Water**
   - Classic two-pointer
   - Greedy decision from both ends

2. **LeetCode 167: Two Sum II - Input Array Is Sorted**
   - Two pointers on sorted array

### Difficulty Progression

**Easy Start:**

- 455: Assign Cookies
- 167: Two Sum II

**Medium (Target Level):**

- 948: Bag of Tokens (this problem!)
- 881: Boats to Save People
- 11: Container With Most Water

**Hard Challenge:**

- 870: Advantage Shuffle

---

## 11. Flowchart Design---

## Summary: Key Takeaways

### The Core Strategy

1. **Sort first** to access extremes efficiently
2. **Be greedy** - always try to gain score with cheapest token
3. **Trade strategically** - only sacrifice score for power when stuck
4. **Track the peak** - maxScore might occur mid-process

### Pattern Recognition

When you see:

- ✅ Optimization ("maximize" or "minimize")
- ✅ Trade-off decisions (two ways to use resources)
- ✅ Can choose order of operations
- ✅ Want to use cheap/expensive items differently

**Think:** Greedy + Sorting + Two Pointers

### Common Mistakes to Avoid

1. ❌ Forgetting to track `maxScore` separately from `score`
2. ❌ Not sorting the array first
3. ❌ Using face-down too early (be greedy about gaining score first!)
4. ❌ Updating maxScore after face-down plays (score decreased!)

### Practice Path

1. Master this problem first ✓
2. Do "Boats to Save People" (very similar)
3. Try other greedy + two-pointer problems
4. Look for this pattern in new problems

---

You now have a complete understanding of this problem! The key insight is recognizing that **greedy + two pointers on sorted data** is optimal here. Practice similar problems to solidify this pattern recognition. Good luck! 🚀
