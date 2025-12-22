# LeetCode 923: 3Sum With Multiplicity - Complete Tutorial

Let me guide you through this problem using first-principles thinking!

---

## 1. **Problem Understanding** 🎯

**In Simple Terms:**
Given an array and a target sum, we need to count how many ways we can pick **three elements** (at positions i, j, k where i < j < k) such that they add up to the target.

**Key Difference from Classic 3Sum:**

- Classic 3Sum: Find unique triplets
- This problem: Count **ALL** possible ways (combinations), considering duplicates

**Example Walkthrough:**

```Javascript
arr = [1,1,2,2,3,3,4,4,5,5], target = 8

Triplet (1,2,5): 
- We have 2 ones, 2 twos, 2 fives
- Total ways = 2 × 2 × 2 = 8 combinations
```

## Example 2 Walker through

Let me work through Example 2 step by step to help the user understand how the algorithm works.
Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
First, let's build the frequency map and then go through the algorithm systematically.
Frequency map:

1 appears 2 times
2 appears 4 times

Now, we need to find all triplets (i, j, k) where i < j < k and arr[i] + arr[j] + arr[k] = 5.
Let me think about what values can sum to 5:

1 + 1 + 3 = 5 (but we don't have 3)
1 + 2 + 2 = 5 (we have this!)
0 + 0 + 5 = 5 (we don't have these)
etc.

So the only valid combination is (1, 2, 2).
Now let me trace through the algorithm:
For x = 0: freq[0] = 0, skip
For x = 1: freq[1] = 2
For y = 1:
z = 5 - 1 - 1 = 3
Check: z = 3, is it in range 0-100? Yes. Is z >= y? 3 >= 1? Yes. freq[3] = 0? Yes, so skip.
For y = 2:
z = 5 - 1 - 2 = 2
Check: z = 2, is it in range 0-100? Yes. Is z >= y? 2 >= 2? Yes. freq[2] = 4? Yes!
Now which case: x = 1, y = 2, z = 2
Is x == y == z? No (1 != 2)
Is x == y? No (1 != 2)
Is y == z? Yes! (2 == 2)

I'm dealing with Case 2b: (x, y, y) where x < y. This requires at least 2 of value y (which is 2).
I confirm freq[y] = freq[2] = 4, which meets the requirement.

I'll calculate the count using the formula: freq[x] × freq[y] × (freq[y] - 1) / 2
Plugging in the numbers: 2 × 4 × 3 / 2 = 24 / 2 = 12

To verify, I'll break down the combinations:

- 2 ones available
- 4 twos to choose from
- Each one can pair with two unique twos
- Total combinations: 6 ways per one, matching the calculation

The answer is 12 distinct triplets.

## 📝 Step-by-Step Walkthrough: Example 2

Let me walk you through this example in detail!

```Javascript
Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
```

---

## **Step 1: Build the Frequency Map** 🗂️

First, let's count how many times each value appears:

```javascript
arr = [1, 1, 2, 2, 2, 2]

freq[0] = 0
freq[1] = 2  ← Two 1's
freq[2] = 4  ← Four 2's
freq[3] = 0
... (all others are 0)
```

**Visual representation:**

```Javascript
Value:     1    2
Count:    [●●] [●●●●]
```

---

## **Step 2: Find Valid Triplets** 🎯

We need three numbers that sum to 5. Let's think about what combinations work:

```Javascript
Possible combinations:
1 + 1 + 3 = 5  ✗ (no 3's in our array)
1 + 2 + 2 = 5  ✓ (we have 1's and 2's!)
0 + 0 + 5 = 5  ✗ (no 0's or 5's)
```

***So the only valid triplet is: (1, 2, 2)**

---

## **Step 3: Trace Through the Algorithm** 🔍

Let's follow our nested loops:

### Loop: x = 0

```Javascript
freq[0] = 0 → Skip (no zeros in array)
```

### Loop: x = 1

```Javascript
freq[1] = 2 ✓ (we have 1's)
```

#### Inner Loop: y = 1

```Javascript
z = target - x - y = 5 - 1 - 1 = 3
Check z validity:
  - Is z in range [0, 100]? ✓ (3 is valid)
  - Is z >= y? ✓ (3 >= 1)
  - Does freq[3] > 0? ✗ (we have no 3's)
→ Skip this combination
```

#### Inner Loop: y = 2

```Javascript
z = target - x - y = 5 - 1 - 2 = 2
Check z validity:
  - Is z in range [0, 100]? ✓ (2 is valid)
  - Is z >= y? ✓ (2 >= 2)
  - Does freq[2] > 0? ✓ (we have 4 twos!)
→ This is a VALID combination!
```

Now determine which case this is:

```Javascript
x = 1, y = 2, z = 2

Is x == y == z?  → 1 == 2 == 2?  → NO
Is x == y?       → 1 == 2?       → NO
Is y == z?       → 2 == 2?       → YES! ✓
```

***This is Case 2b: (x, y, y) - One different, two same**

---

## **Step 4: Calculate the Count** 🧮

For Case 2b where `x < y == z`:

**Formula:** `freq[x] × freq[y] × (freq[y] - 1) / 2`

Let's break this down:

```javascript
freq[x] = freq[1] = 2  (we have 2 ones)
freq[y] = freq[2] = 4  (we have 4 twos)

Count = 2 × 4 × (4 - 1) / 2
Count = 2 × 4 × 3 / 2
Count = 2 × 12 / 2
Count = 24 / 2
Count = 12
```

---

## **Step 5: Understanding WHY It's 12** 💡

Let's visualize this with labels:

```Javascript
Ones: [1₁, 1₂]
Twos: [2₁, 2₂, 2₃, 2₄]
```

We need triplets of form: **(one 1, two 2's)** where the indices satisfy i < j < k.

### For each 1, count how many ways to pick 2 twos

**Using 1₁:** Choose 2 from {2₁, 2₂, 2₃, 2₄}

```Javascript
(1₁, 2₁, 2₂)
(1₁, 2₁, 2₃)
(1₁, 2₁, 2₄)
(1₁, 2₂, 2₃)
(1₁, 2₂, 2₄)
(1₁, 2₃, 2₄)
```

That's **C(4, 2) = 4 × 3 / 2 = 6 ways**

**Using 1₂:** Choose 2 from {2₁, 2₂, 2₃, 2₄}

```Javascript
(1₂, 2₁, 2₂)
(1₂, 2₁, 2₃)
(1₂, 2₁, 2₄)
(1₂, 2₂, 2₃)
(1₂, 2₂, 2₄)
(1₂, 2₃, 2₄)
```

That's **C(4, 2) = 6 ways** again

**Total: 2 × 6 = 12** ✓

---

## **Visual Formula Breakdown** 📊---

## **Key Formula Explained** 📐

For **Case 2b** where we have pattern `(x, y, y)`:

```Javascript
Number of ways = (Ways to pick x) × (Ways to pick 2 y's)
                = freq[x] × C(freq[y], 2)
                = freq[x] × (freq[y] × (freq[y] - 1) / 2)
```

**In our example:**

- `freq[1] = 2` → 2 ways to pick one "1"
- `C(freq[2], 2) = C(4, 2) = 6` → 6 ways to pick two "2"s from four
- Total: `2 × 6 = 12`

---

## **Why Use Combinations?** 🤔

**Important:** We use combinations (not permutations) because:

1. **Order doesn't matter** in combinations: Picking (2₁, 2₃) is the same as (2₃, 2₁)
2. **But position does matter**: The indices must satisfy i < j < k
3. **Our frequency approach automatically handles position** by only considering values, not indices

When we pick:

- 1₁ at some position i
- 2₁ at some position j > i  
- 2₃ at some position k > j

The constraint i < j < k is naturally satisfied because we're iterating through the array!

---

## **Quick Verification** ✅

Let's verify with the problem's explanation:

> **"arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:**
> **We choose one 1 from [1,1] in 2 ways,**
> **and two 2s from [2,2,2,2] in 6 ways."**

- ✓ Choose one 1: **2 ways** (either 1₁ or 1₂)
- ✓ Choose two 2s: **C(4,2) = 6 ways**
- ✓ Total: **2 × 6 = 12** ✓

Perfect match! 🎯

---

Does this walkthrough make sense? Would you like me to trace through Example 1 as well, or work through any specific part in more detail?

---

## 2. **Constraints of the Problem** 📋

Let's analyze what these constraints tell us:

| Constraint | Value | Implication |
|------------|-------|-------------|
| **Array Length** | 3 ≤ n ≤ 3000 | O(n²) or O(n³) solutions are acceptable |
| **Element Range** | 0 ≤ arr[i] ≤ 100 | **🔑 KEY INSIGHT**: Only 101 possible values! Use frequency counting |
| **Target Range** | 0 ≤ target ≤ 300 | Maximum sum of three elements = 300 |
| **Positional** | i < j < k | Must respect order (but frequency approach handles this!) |
| **Output** | mod 10⁹ + 7 | Result can be very large |

**Critical Insight:** The limited value range (0-100) is a **massive hint** that we should use counting/frequency approach instead of index-based iteration!

---

## 3. **Highlight Keywords** 🔍

**Problem Keywords to Remember:**

1. **"Number of tuples"** → Counting problem (not finding problem)
2. **"i < j < k"** → Positional constraint (but can be handled via combinations)
3. **"0 ≤ arr[i] ≤ 100"** → 🌟 **GOLDEN CONSTRAINT** - Use frequency map!
4. **"modulo 10⁹ + 7"** → Handle large numbers, apply mod to prevent overflow
5. **"Enumerating by values"** → The example shows us to think in terms of VALUES not INDICES

**Pattern Recognition Triggers:**

- "3Sum" → Think two-pointer or hash map
- Limited value range → Frequency counting
- Counting combinations with duplicates → Combinatorics (nCr)

---

## 4. **Break Down Into Manageable Parts** 🧩

Let's decompose this problem:

***Step 1: Frequency Counting**

```Javascript
arr = [1,1,2,2,3,3,4,4,5,5]
→ freq = {1:2, 2:2, 3:2, 4:2, 5:2}
```

***Step 2: Consider Three Cases**

For three numbers summing to target, we have:

***Case A: All three values are the same (x, x, x)**

- Example: (2, 2, 2) where target = 6
- Need at least 3 of the same value
- Count = C(freq[x], 3) = freq[x] *(freq[x]-1)* (freq[x]-2) / 6

***Case B: Two values are the same (x, x, y)**

- Example: (2, 2, 4) where target = 8
- Need at least 2 of value x, at least 1 of value y
- Count = C(freq[x], 2) × freq[y] = freq[x] *(freq[x]-1) / 2* freq[y]

***Case C: All three values are different (x, y, z)**

- Example: (1, 3, 4) where target = 8
- Need at least 1 of each
- Count = freq[x] × freq[y] × freq[z]

***Step 3: Iterate Through Valid Combinations**

- Only check values that could form valid triplets
- Ensure x ≤ y ≤ z to avoid counting duplicates

---

## 5. **Pattern Identification** 🎨

***Primary Pattern: Frequency Counting + Combinatorics**

**Why This Pattern?**

1. Limited value range → Perfect for frequency map
2. Need to count combinations → Combinatorics formulas
3. Duplicates matter → Frequency-based counting naturally handles this

**Related Patterns:**

- **Two-pointer technique** (less efficient here due to counting requirement)
- **Hash Map** (for frequency storage)
- **Combinatorics** (nCr formulas for counting)

---

## 6. **Approach Discussion** 📝

**Step-by-Step Solution Strategy:**

***Step 1: Build Frequency Map**

```Javascript
Count occurrences of each value (0-100)
```

***Step 2: Iterate Through All Possible Triplets**

```Javascript
For each valid (x, y, z) where x ≤ y ≤ z:
  - Check if x + y + z == target
  - Count combinations based on the case
```

***Step 3: Handle Three Cases**

```javascript
Case 1: x == y == z
  → Need ≥3 occurrences of x
  → Count = C(freq[x], 3)

Case 2: x == y < z  OR  x < y == z
  → Need ≥2 of the repeated value, ≥1 of the other
  → Count = C(freq[repeated], 2) × freq[other]

Case 3: x < y < z
  → Need ≥1 of each
  → Count = freq[x] × freq[y] × freq[z]
```

***Step 4: Apply Modulo***

```Javascript
Add counts with mod 10^9 + 7 to prevent overflow
```

---

## 7. **Code Implementation** 💻

### JavaScript Implementation

```javascript
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function(arr, target) {
    const MOD = 1_000_000_007;
    
    // Step 1: Build frequency map
    const freq = new Array(101).fill(0);
    for (let num of arr) {
        freq[num]++;
    }
    
    let result = 0;
    
    // Step 2: Iterate through all possible triplets (x, y, z) where x <= y <= z
    for (let x = 0; x <= 100; x++) {
        if (freq[x] === 0) continue;
        
        for (let y = x; y <= 100; y++) {
            if (freq[y] === 0) continue;
            
            let z = target - x - y;
            
            // z must be valid and maintain x <= y <= z
            if (z < 0 || z > 100 || z < y) continue;
            if (freq[z] === 0) continue;
            
            // Count combinations based on cases
            if (x === y && y === z) {
                // Case 1: All three same (x, x, x)
                // Need at least 3 occurrences: C(n, 3) = n*(n-1)*(n-2)/6
                if (freq[x] >= 3) {
                    result += freq[x] * (freq[x] - 1) * (freq[x] - 2) / 6;
                }
            } else if (x === y) {
                // Case 2a: Two same, one different (x, x, z)
                // Need at least 2 of x: C(n, 2) = n*(n-1)/2
                if (freq[x] >= 2) {
                    result += freq[x] * (freq[x] - 1) / 2 * freq[z];
                }
            } else if (y === z) {
                // Case 2b: One different, two same (x, y, y)
                // Need at least 2 of y: C(n, 2) = n*(n-1)/2
                if (freq[y] >= 2) {
                    result += freq[x] * freq[y] * (freq[y] - 1) / 2;
                }
            } else {
                // Case 3: All different (x, y, z)
                result += freq[x] * freq[y] * freq[z];
            }
            
            // Apply modulo
            result %= MOD;
        }
    }
    
    return result;
};
```

### Java Implementation

```java
class Solution {
    public int threeSumMulti(int[] arr, int target) {
        final int MOD = 1_000_000_007;
        
        // Step 1: Build frequency array
        long[] freq = new long[101];
        for (int num : arr) {
            freq[num]++;
        }
        
        long result = 0;
        
        // Step 2: Iterate through all possible triplets (x, y, z) where x <= y <= z
        for (int x = 0; x <= 100; x++) {
            if (freq[x] == 0) continue;
            
            for (int y = x; y <= 100; y++) {
                if (freq[y] == 0) continue;
                
                int z = target - x - y;
                
                // z must be valid and maintain x <= y <= z
                if (z < 0 || z > 100 || z < y) continue;
                if (freq[z] == 0) continue;
                
                // Count combinations based on cases
                if (x == y && y == z) {
                    // Case 1: All three same (x, x, x)
                    // C(n, 3) = n*(n-1)*(n-2)/6
                    if (freq[x] >= 3) {
                        result += freq[x] * (freq[x] - 1) * (freq[x] - 2) / 6;
                    }
                } else if (x == y) {
                    // Case 2a: Two same, one different (x, x, z)
                    // C(n, 2) * freq[z]
                    if (freq[x] >= 2) {
                        result += freq[x] * (freq[x] - 1) / 2 * freq[z];
                    }
                } else if (y == z) {
                    // Case 2b: One different, two same (x, y, y)
                    // freq[x] * C(n, 2)
                    if (freq[y] >= 2) {
                        result += freq[x] * freq[y] * (freq[y] - 1) / 2;
                    }
                } else {
                    // Case 3: All different (x, y, z)
                    result += freq[x] * freq[y] * freq[z];
                }
                
                // Apply modulo
                result %= MOD;
            }
        }
        
        return (int) result;
    }
}
```

---

## 8. **Complexity Analysis** ⚡

### Time Complexity: **O(n + 101²)** = **O(n)**

**Breakdown:**

- Building frequency map: **O(n)** where n = arr.length
- Nested loops: **O(101 × 101)** = **O(10,201)** = **O(1)** (constant!)
- Overall: **O(n + 1) = O(n)**

**Key Insight:** Even though we have nested loops, they iterate over a fixed range (0-100), making it constant time!

### Space Complexity: **O(101)** = **O(1)**

**Breakdown:**

- Frequency array of size 101: **O(101)** = **O(1)** (constant space!)
- A few variables: **O(1)**

**Key Insight:** Space complexity is constant because the frequency array size is bounded by the constraint (0-100).

---

## 9. **Alternative Solutions** 🔄

### Alternative 1: Three-Pointer Approach (Less Efficient)

## Javascript

```javascript
var threeSumMulti_Alt1 = function(arr, target) {
    const MOD = 1_000_000_007;
    arr.sort((a, b) => a - b);
    let result = 0;
    
    for (let i = 0; i < arr.length - 2; i++) {
        let left = i + 1;
        let right = arr.length - 1;
        
        while (left < right) {
            let sum = arr[i] + arr[left] + arr[right];
            
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                // Count duplicates
                if (arr[left] === arr[right]) {
                    let count = right - left + 1;
                    result += count * (count - 1) / 2;
                    break;
                } else {
                    let leftCount = 1, rightCount = 1;
                    while (left + 1 < right && arr[left] === arr[left + 1]) {
                        leftCount++;
                        left++;
                    }
                    while (right - 1 > left && arr[right] === arr[right - 1]) {
                        rightCount++;
                        right--;
                    }
                    result += leftCount * rightCount;
                    left++;
                    right--;
                }
                result %= MOD;
            }
        }
    }
    
    return result;
};
```

**Time Complexity:** O(n² + n log n) = **O(n²)**
**Space Complexity:** O(1)

**When to Use:** When value range is large (> 1000) and sorting is acceptable.

### Alternative 2: HashMap with Index Tracking (Most Intuitive but Least Efficient)

```javascript
var threeSumMulti_Alt2 = function(arr, target) {
    const MOD = 1_000_000_007;
    let result = 0;
    
    for (let i = 0; i < arr.length - 2; i++) {
        const map = new Map();
        
        for (let j = i + 1; j < arr.length; j++) {
            let complement = target - arr[i] - arr[j];
            if (map.has(complement)) {
                result = (result + map.get(complement)) % MOD;
            }
            map.set(arr[j], (map.get(arr[j]) || 0) + 1);
        }
    }
    
    return result;
};
```

**Time Complexity:** **O(n²)**
**Space Complexity:** O(n)

**When to Use:** When you want a more straightforward implementation and value range is unknown.

### Comparison Table

| Approach | Time | Space | Best When |
|----------|------|-------|-----------|
| **Frequency Counting** | O(n) | O(1) | Value range ≤ 1000 ✅ |
| Three-Pointer | O(n²) | O(1) | Large value range |
| HashMap | O(n²) | O(n) | Unknown constraints |

---

## 10. **Practice Recommendations** 📚

### Similar Problems (Ordered by Difficulty)

**Beginner Level:**

1. **LeetCode 1. Two Sum** - Foundation for sum problems
2. **LeetCode 167. Two Sum II** - Two pointers on sorted array

**Intermediate Level:**
3. **LeetCode 15. 3Sum** - Classic 3Sum (find unique triplets)
4. **LeetCode 18. 4Sum** - Extension to four numbers
5. **LeetCode 454. 4Sum II** - Using hash maps for counting

**Advanced Level:**
6. **LeetCode 1477. Find Two Non-overlapping Sub-arrays** - Similar counting pattern
7. **LeetCode 982. Triples with Bitwise AND Equal To Zero** - Frequency counting pattern

**Pattern Practice:**
8. **LeetCode 525. Contiguous Array** - Frequency/prefix sum
9. **LeetCode 560. Subarray Sum Equals K** - Frequency map + counting

### Study Path

```Javascript
Two Sum → 3Sum → 3Sum Multiplicity → 4Sum → 4Sum II
   ↓
Frequency Counting Pattern
   ↓
Combinatorics Problems
```

---

## 11. **Flowchart Design** 📊---

## 🎓 **Key Takeaways & Learning Summary**

### Core Concepts Mastered

1. **Pattern Recognition**
   - Small value range (0-100) → Use frequency counting
   - Counting combinations → Apply combinatorics formulas
   - Duplicates matter → Frequency-based approach naturally handles this

2. **Combinatorics Formulas**
   - C(n, 2) = n × (n-1) / 2 → Choose 2 from n
   - C(n, 3) = n × (n-1) × (n-2) / 6 → Choose 3 from n

3. **Case Analysis**
   - Always consider: all same, two same, all different
   - Use sorted iteration (x ≤ y ≤ z) to avoid duplicate counting

4. **Optimization Technique**
   - Convert O(n³) brute force → O(n) using frequency counting
   - Trade space (frequency array) for time efficiency

### Interview Tips

✅ **DO:**

- Recognize constraint hints (limited value range = frequency counting)
- Explain your case analysis clearly
- Handle edge cases (need ≥3 for all same, ≥2 for two same)
- Apply modulo consistently

❌ **DON'T:**

- Jump to sorting without checking constraints
- Forget about the i < j < k constraint (our approach handles it!)
- Miss the combinatorics formulas for counting

---

**Practice Next:** Start with LeetCode 15 (3Sum) to understand the basic pattern, then try LeetCode 454 (4Sum II) for similar frequency counting technique!

---
Excellent question! You've identified a **critical point of confusion**. Let me clarify the difference between **indices** and **values**! 🎯

---

## **🔑 KEY DISTINCTION: Indices vs Values**

### The Confusion

```Javascript
x, y, z are NOT indices!
x, y, z are VALUES (the actual numbers in the array)
```

Let me break this down:

| Symbol | What it represents | Example |
|--------|-------------------|---------|
| **i, j, k** | **Positions/Indices** in array | 0, 1, 2, 3, 4, 5 |
| **arr[i], arr[j], arr[k]** | **Values** at those positions | 1, 2, 2 |
| **x, y, z** | **Values** we're looking for | 1, 2, 2 |

---

## **📊 Visual Example with Indices AND Values**---

## **🤔 Addressing Your Second Question: "Need at least 2 of y"**

You asked about this comment in the code:

```javascript
// Case 2b: One different, two same (x, y, y)
// Need at least 2 of y: C(n, 2) = n*(n-1)/2
```

Let me explain **why** we need at least 2 of value `y`:

### **The Pattern is (x, y, y)**

We're trying to form a triplet with:

- **ONE** occurrence of value x
- **TWO** occurrences of value y

**Example:** Pattern (1, 2, 2)

- We need 1 copy of the value "1"
- We need 2 copies of the value "2"

If `freq[2] = 1` (only one "2" in the array), can we pick TWO "2"s? **NO!** ❌

That's why we need `freq[y] ≥ 2` to form this pattern.

---

## **📐 The Formula Breakdown**

```javascript
if (freq[y] >= 2) {  // ← Check: Do we have at least 2 of value y?
    result += freq[x] * freq[y] * (freq[y] - 1) / 2;
}
```

**What each part means:**

| Part | Meaning | Example (freq[1]=2, freq[2]=4) |
|------|---------|-------------------------------|
| `freq[x]` | How many ways to pick ONE x | 2 ways (pick from index 0 or 1) |
| `freq[y] * (freq[y]-1) / 2` | How many ways to pick TWO y's | C(4,2) = 4×3/2 = 6 ways |
| **Total** | Multiply them together | 2 × 6 = 12 |

---

## **🧮 Combinatorics: Why C(n, 2) = n×(n-1)/2?**

When we pick 2 items from n items:

**Formula:** C(n, 2) = n! / (2! × (n-2)!)

**Simplified:**

```Javascript
C(n, 2) = n! / (2! × (n-2)!)
        = n × (n-1) × (n-2)! / (2 × 1 × (n-2)!)
        = n × (n-1) / 2
```

**Example:** Pick 2 from {2₁, 2₂, 2₃, 2₄}

Using the formula:

```Javascript
C(4, 2) = 4 × 3 / 2 = 12 / 2 = 6
```

The 6 combinations are:

1. (2₁, 2₂)
2. (2₁, 2₃)
3. (2₁, 2₄)
4. (2₂, 2₃)
5. (2₂, 2₄)
6. (2₃, 2₄)

**Why divide by 2?** Because (2₁, 2₂) is the same as (2₂, 2₁) - order doesn't matter in combinations!

---

## **🎯 Putting It All Together**

```javascript
// For pattern (x, y, y) where x=1, y=2
// arr = [1, 1, 2, 2, 2, 2]
// freq[1] = 2, freq[2] = 4

// Step 1: Check if we CAN form this pattern
if (freq[2] >= 2) {  // ✓ We have 4 twos, which is ≥ 2
    
    // Step 2: Count combinations
    count = freq[1] × freq[2] × (freq[2] - 1) / 2
    count = 2 × 4 × 3 / 2
    count = 2 × 6
    count = 12
}
```

---

## **💡 Key Takeaways**

1. **i, j, k** = INDICES (positions 0, 1, 2, 3, 4, 5)
2. **x, y, z** = VALUES (the numbers 1, 2, 2)
3. **Frequency counting** implicitly handles the i < j < k constraint
4. **"Need at least 2 of y"** means we need `freq[y] ≥ 2` to pick two y's
5. **C(n, 2)** = combinations formula for picking 2 items from n items

---

Does this clear up the confusion? The key insight is that **our algorithm works with values, but it correctly counts all valid index combinations**! 🎉

---
Great question! Let me clarify this with concrete examples. This is actually simpler than it might seem! 🎯

---

## **🔍 Understanding "Picking Two 2's"**

### **Scenario 1: freq[2] = 1** (Only ONE "2" exists)

```javascript
arr = [1, 1, 2]  // Only one "2" in the entire array
                  // Position: 0, 1, 2

freq[1] = 2  // Two 1's exist
freq[2] = 1  // Only ONE 2 exists ⚠️
```

**Question:** Can we form the pattern (1, 2, 2)?

- We need: ONE "1" ✓ (we have 2, so we can pick 1)
- We need: TWO "2"s ❌ (we only have 1, cannot pick 2!)

**Why not?** To form a triplet, we need **THREE positions** (i, j, k):

```Javascript
Pattern needed: (1, 2, 2)
                 ↑  ↑  ↑
             index i, j, k (three different positions)
```

We need a "2" at position j AND a "2" at position k, but there's only one "2" in the entire array at position 2!

---

## **Scenario 2: freq[2] = 4** (FOUR "2"s exist) ✅

```javascript
arr = [1, 1, 2, 2, 2, 2]  // Four 2's in the array
                           // Positions: 0, 1, 2, 3, 4, 5

freq[1] = 2  // Two 1's exist
freq[2] = 4  // FOUR 2's exist ✓
```

**Question:** Can we form the pattern (1, 2, 2)?

- We need: ONE "1" ✓ (we have 2)
- We need: TWO "2"s ✓ (we have 4, so we can pick any 2 of them!)

**Example combinations:**

```Javascript
Triplet 1: indices (0, 2, 3) → values (1, 2, 2) ✓
Triplet 2: indices (0, 2, 4) → values (1, 2, 2) ✓
Triplet 3: indices (0, 3, 4) → values (1, 2, 2) ✓
... and so on
```

---

## **📊 Visual Comparison**---

## **🔑 The Core Concept**

Think of it this way:

**A triplet needs THREE POSITIONS:**

```Javascript
Triplet = (position i, position j, position k) where i < j < k
```

**For the pattern (1, 2, 2):**

- Position i needs a "1"
- Position j needs a "2"
- Position k needs a "2" (a DIFFERENT position from j!)

**If freq[2] = 1:**

```Javascript
arr = [1, 1, 2]
            ↑
       Only ONE "2" at position 2
```

- I can put a "2" at position j ✓
- But I need ANOTHER "2" at position k ❌
- There's no other "2" in the array!

**It's like trying to be in two places at once!** The single "2" can only fill ONE position in our triplet, but we need it to fill TWO positions.

---

## **🎲 Another Way to Think About It**

Imagine you have a bag of marbles:

```Javascript
Bag = [🔴1, 🔴1, 🔵2]
```

**Task:** Pick 3 marbles to form (1, 2, 2)

**Step 1:** Pick a red marble (1) → ✓ Success! Bag now has [🔴1, 🔵2]

**Step 2:** Pick a blue marble (2) → ✓ Success! Bag now has [🔴1]

**Step 3:** Pick another blue marble (2) → ❌ **FAIL!** No blue marbles left!

**You can't pick something that isn't there!**

---

## **✅ With freq[2] = 4**

```Javascript
Bag = [🔴1, 🔴1, 🔵2, 🔵2, 🔵2, 🔵2]
```

**Step 1:** Pick a red marble (1) → ✓ Bag now has [🔴1, 🔵2, 🔵2, 🔵2, 🔵2]

**Step 2:** Pick a blue marble (2) → ✓ Bag now has [🔴1, 🔵2, 🔵2, 🔵2]

**Step 3:** Pick another blue marble (2) → ✓ **SUCCESS!** Bag now has [🔴1, 🔵2, 🔵2]

**We have enough blue marbles to pick two!**

---

## **📝 Summary**

| Requirement | Meaning | Check |
|------------|---------|-------|
| Need pattern (x, y, y) | Need 1 copy of x and 2 copies of y | |
| freq[x] ≥ 1 | At least 1 occurrence of value x exists | Can pick 1 ✓ |
| freq[y] ≥ 2 | At least 2 occurrences of value y exist | Can pick 2 ✓ |

**Bottom line:** You can only use what you have! If you need 2 of something, you must have at least 2 of it available.

Does this make it crystal clear? 😊

---

## 📝 Complete Walkthrough: Example 1

Let me walk you through this step-by-step!

```Javascript
Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
```

---

## **Step 1: Build the Frequency Map** 🗂️---

## **Detailed Trace Through Algorithm** 🔍

Let me show you EXACTLY what happens as we iterate through our nested loops:

```javascript
// Initial state
freq[1] = 2, freq[2] = 2, freq[3] = 2, freq[4] = 2, freq[5] = 2
target = 8
result = 0
```

### **Outer Loop: x = 1**

| y | z = 8-1-y | Valid? | Pattern | Formula | Count | Running Total |
|---|-----------|--------|---------|---------|-------|---------------|
| 1 | 6 | ❌ freq[6] = 0 | - | - | - | 0 |
| 2 | 5 | ✅ | (1,2,5) all diff | 2×2×2 | **8** | 8 |
| 3 | 4 | ✅ | (1,3,4) all diff | 2×2×2 | **8** | 16 |
| 4 | 3 | ❌ z < y (3 < 4) | - | - | - | 16 |
| 5 | 2 | ❌ z < y (2 < 5) | - | - | - | 16 |

### **Outer Loop: x = 2**

| y | z = 8-2-y | Valid? | Pattern | Formula | Count | Running Total |
|---|-----------|--------|---------|---------|-------|---------------|
| 2 | 4 | ✅ | (2,2,4) two same | 2×1/2 × 2 | **2** | 18 |
| 3 | 3 | ✅ | (2,3,3) two same | 2 × 2×1/2 | **2** | 20 |
| 4 | 2 | ❌ z < y (2 < 4) | - | - | - | 20 |
| 5 | 1 | ❌ z < y (1 < 5) | - | - | - | 20 |

### **Outer Loop: x = 3**

| y | z = 8-3-y | Valid? | Pattern | Formula | Count | Running Total |
|---|-----------|--------|---------|---------|-------|---------------|
| 3 | 2 | ❌ z < y (2 < 3) | - | - | - | 20 |
| 4 | 1 | ❌ z < y (1 < 4) | - | - | - | 20 |
| 5 | 0 | ❌ z < y (0 < 5) | - | - | - | 20 |

### **Outer Loop: x = 4, 5, ...**

All remaining combinations have z < y, so they're all skipped.

---

## **Deep Dive: Pattern (2, 2, 4)** 🔬

Let's understand why this gives us exactly 2 combinations:

```Javascript
arr = [1₁, 1₂, 2₁, 2₂, 3₁, 3₂, 4₁, 4₂, 5₁, 5₂]
       i=0 i=1 i=2 i=3 i=4 i=5 i=6 i=7 i=8 i=9
```

**Pattern: (2, 2, 4)** - Need two "2"s and one "4"

**Step 1: How many ways to pick TWO "2"s from {2₁, 2₂}?**

```Javascript
C(2, 2) = 1 way
Only combination: (2₁, 2₂)
```

**Step 2: How many ways to pick ONE "4" from {4₁, 4₂}?**

```Javascript
2 ways
Options: either 4₁ or 4₂
```

***Step 3: Combine them**

```Javascript
Total combinations = 1 × 2 = 2

Combination 1: (2₁, 2₂, 4₁) at indices (2, 3, 6)
Combination 2: (2₁, 2₂, 4₂) at indices (2, 3, 7)
```

---

## **Deep Dive: Pattern (1, 2, 5)** 🔬

**Pattern: (1, 2, 5)** - All different values

***Step 1: Pick ONE "1" from {1₁, 1₂}**

```Javascript
2 ways: either 1₁ or 1₂
```

***Step 2: Pick ONE "2" from {2₁, 2₂}**

```Javascript
2 ways: either 2₁ or 2₂
```

***Step 3: Pick ONE "5" from {5₁, 5₂}**

```Javascript
2 ways: either 5₁ or 5₂
```

***Step 4: Combine all choices**

```Javascript
Total = 2 × 2 × 2 = 8

All 8 combinations:
1. (1₁, 2₁, 5₁) - indices (0, 2, 8)
2. (1₁, 2₁, 5₂) - indices (0, 2, 9)
3. (1₁, 2₂, 5₁) - indices (0, 3, 8)
4. (1₁, 2₂, 5₂) - indices (0, 3, 9)
5. (1₂, 2₁, 5₁) - indices (1, 2, 8)
6. (1₂, 2₁, 5₂) - indices (1, 2, 9)
7. (1₂, 2₂, 5₁) - indices (1, 3, 8)
8. (1₂, 2₂, 5₂) - indices (1, 3, 9)
```

All these satisfy i < j < k! ✓

---

## **🎯 Why We Get Different Counts**

| Pattern | Type | Formula | Reason |
|---------|------|---------|---------|
| (1,2,5) | All different | 2×2×2 = 8 | Independent choices for each value |
| (1,3,4) | All different | 2×2×2 = 8 | Independent choices for each value |
| (2,2,4) | Two same | C(2,2)×2 = 2 | **Must pick BOTH "2"s**, then pick a "4" |
| (2,3,3) | Two same | 2×C(2,2) = 2 | Pick a "2", then **must pick BOTH "3"s** |

**Key Insight:** When you need to pick the same value twice, you're choosing a combination, not making independent selections. This reduces the count!

---

## **📊 Visual Summary**

```Javascript
Pattern (1, 2, 5): 8 triplets
  ├─ Pick 1: [1₁ or 1₂] → 2 choices
  ├─ Pick 2: [2₁ or 2₂] → 2 choices  
  └─ Pick 5: [5₁ or 5₂] → 2 choices
  Total: 2 × 2 × 2 = 8

Pattern (1, 3, 4): 8 triplets
  ├─ Pick 1: [1₁ or 1₂] → 2 choices
  ├─ Pick 3: [3₁ or 3₂] → 2 choices
  └─ Pick 4: [4₁ or 4₂] → 2 choices
  Total: 2 × 2 × 2 = 8

Pattern (2, 2, 4): 2 triplets
  ├─ Pick two 2's: [2₁, 2₂] → 1 way (C(2,2) = 1)
  └─ Pick 4: [4₁ or 4₂] → 2 choices
  Total: 1 × 2 = 2

Pattern (2, 3, 3): 2 triplets
  ├─ Pick 2: [2₁ or 2₂] → 2 choices
  └─ Pick two 3's: [3₁, 3₂] → 1 way (C(2,2) = 1)
  Total: 2 × 1 = 2

GRAND TOTAL: 8 + 8 + 2 + 2 = 20 ✓
```

---

## **🎓 Key Takeaways**

1. **Each value pattern** contributes a different count based on its structure
2. **All different values** → Multiply all frequencies (gives larger counts)
3. **Repeated values** → Use combination formula C(n, k) (gives smaller counts)
4. **Order constraint x ≤ y ≤ z** prevents duplicate counting
5. **Index constraint i < j < k** is automatically satisfied by our frequency approach

Does this complete walkthrough make sense? Would you like me to trace through any specific pattern in even more detail? 🎯

---

## 🔢 Case 1: All Three Same (x, x, x) - Complete Breakdown

Let me walk you through this with concrete examples!

---

## **📋 The Scenario**

**Case 1:** All three values are the same: **(x, x, x)**

**Example:** Pattern (2, 2, 2) where target = 6

**Formula:**

```Javascript
Count = C(freq[x], 3) = freq[x] × (freq[x] - 1) × (freq[x] - 2) / 6
```

---

## **🎯 Concrete Example**---

## **🔍 Detailed Explanation: Why C(n, 3)?**

### **The Core Question:**

When we have **n copies** of the same value, how many ways can we **choose 3 of them**?

**Answer:** C(n, 3) = "n choose 3"

---

## **📐 Deriving the Formula**

### **Step 1: Start with Permutations (Order Matters)**

If order mattered, we'd have:

```Javascript
First position:  n choices
Second position: (n-1) choices (one already used)
Third position:  (n-2) choices (two already used)

Total: n × (n-1) × (n-2)
```

**Example with n=4:**

```Javascript
4 × 3 × 2 = 24 ordered ways
```

### **Step 2: Remove Duplicates (Order Doesn't Matter)**

But we don't care about order! The triplet (2₁, 2₂, 2₃) is the **same** as:

- (2₁, 2₃, 2₂)
- (2₂, 2₁, 2₃)
- (2₂, 2₃, 2₁)
- (2₃, 2₁, 2₂)
- (2₃, 2₂, 2₁)

That's **6 different orderings** of the same combination!

**Why 6?** Because 3 items can be arranged in **3! = 3 × 2 × 1 = 6** ways.

### **Step 3: Divide by Duplicates**

```Javascript
Combinations = Permutations / Arrangements
C(n, 3) = n × (n-1) × (n-2) / 6
```

---

## **💡 Real-World Examples**

### **Example 1: freq[2] = 3** (Minimum case)

```javascript
arr = [2, 2, 2]  // Exactly three 2's

Pattern: (2, 2, 2)
Count = C(3, 3) = 3 × 2 × 1 / 6 = 6 / 6 = 1
```

**The ONE combination:**

```Javascript
(2₁, 2₂, 2₃) at indices (0, 1, 2)
```

**Explanation:** With exactly 3 copies, there's only **one way** to pick all three!

---

### **Example 2: freq[2] = 5**

```javascript
arr = [2, 2, 2, 2, 2]  // Five 2's

Pattern: (2, 2, 2)
Count = C(5, 3) = 5 × 4 × 3 / 6 = 60 / 6 = 10
```

**All 10 combinations:**

```Javascript
1.  (2₁, 2₂, 2₃)  →  indices (0, 1, 2)
2.  (2₁, 2₂, 2₄)  →  indices (0, 1, 3)
3.  (2₁, 2₂, 2₅)  →  indices (0, 1, 4)
4.  (2₁, 2₃, 2₄)  →  indices (0, 2, 3)
5.  (2₁, 2₃, 2₅)  →  indices (0, 2, 4)
6.  (2₁, 2₄, 2₅)  →  indices (0, 3, 4)
7.  (2₂, 2₃, 2₄)  →  indices (1, 2, 3)
8.  (2₂, 2₃, 2₅)  →  indices (1, 2, 4)
9.  (2₂, 2₄, 2₅)  →  indices (1, 3, 4)
10. (2₃, 2₄, 2₅)  →  indices (2, 3, 4)
```

---

## **🎓 Code Implementation**

Here's how it looks in the actual code:

```javascript
// Case 1: All three same (x, x, x)
if (x === y && y === z) {
    // Check if we have at least 3 of this value
    if (freq[x] >= 3) {
        // Calculate C(freq[x], 3)
        let count = freq[x] * (freq[x] - 1) * (freq[x] - 2) / 6;
        result += count;
    }
}
```

**Example trace:**

```javascript
// When x = 2, y = 2, z = 2, freq[2] = 4

if (2 === 2 && 2 === 2) {  // ✓ true
    if (4 >= 3) {  // ✓ true
        count = 4 * 3 * 2 / 6;  // = 24 / 6 = 4
        result += 4;
    }
}
```

---

## **📊 Comparison Table: All Cases**

| Case | Pattern | Picks | Divide by | Formula | Example (n=4) |
|------|---------|-------|-----------|---------|---------------|
| **1** | (x, x, x) | 3 from same | 6 (3!) | n×(n-1)×(n-2)/6 | 4×3×2/6 = **4** |
| **2a** | (x, x, y) | 2 from x | 2 (2!) | n×(n-1)/2 × m | 4×3/2 × 2 = **12** |
| **2b** | (x, y, y) | 2 from y | 2 (2!) | n × m×(m-1)/2 | 2 × 4×3/2 = **12** |
| **3** | (x, y, z) | 1 from each | 1 (1!) | n × m × p | 2 × 2 × 2 = **8** |

---

## **🎯 Key Takeaways**

1. **C(n, 3)** counts how many ways to pick 3 items from n items
2. Formula: **n × (n-1) × (n-2) / 6**
3. **Requirement:** freq[x] must be **≥ 3** to form (x, x, x)
4. **Why divide by 6?** To remove duplicate orderings (3! = 6 arrangements)
5. **Larger freq[x]** → More combinations exponentially!

---

## **🧪 Quick Test Your Understanding**

**Question:** If freq[3] = 6, how many ways to form (3, 3, 3)?

<details>

<summary>Click to see answer</summary>

```Javascript
C(6, 3) = 6 × 5 × 4 / 6
        = 120 / 6
        = 20 ways
```

</details>

---

Does this complete explanation make Case 1 crystal clear? The key is understanding that we're **choosing combinations, not permutations**, which is why we divide by 6! 🎯

---

## 🎯 C(n, 3) - Super Simplified

Let me break this down into the **simplest possible terms**!

---

## **🔢 The Formula**

```Javascript
C(n, 3) = n × (n-1) × (n-2) / 6
```

---

## **📝 In Plain English**

***"How many ways can I pick 3 items from n items?"**

---

## **🎨 Visual Breakdown**---

## **🎯 The 2-Step Process**

### **Step 1: Count with Order** ✏️

```Javascript
n × (n-1) × (n-2)
```

- **First pick:** n choices
- **Second pick:** (n-1) choices (one is gone)
- **Third pick:** (n-2) choices (two are gone)

### **Step 2: Remove Duplicates** 🗑️

```Javascript
Divide by 6
```

- Because any 3 items can be arranged in **6 different orders**
- But all 6 orders represent the **same group**

---

## **🍎 Real-World Example: 3 Fruits**

You have 5 fruits: 🍎 🍊 🍌 🍇 🍓

**How many ways to pick 3?**

```Javascript
Step 1: 5 × 4 × 3 = 60 (with order)
Step 2: 60 ÷ 6 = 10 (unique groups)
```

**The 10 groups:**

1. 🍎🍊🍌
2. 🍎🍊🍇
3. 🍎🍊🍓
4. 🍎🍌🍇
5. 🍎🍌🍓
6. 🍎🍇🍓
7. 🍊🍌🍇
8. 🍊🍌🍓
9. 🍊🍇🍓
10. 🍌🍇🍓

---

## **💡 Why Always Divide by 6?**

Because **3 items = 6 arrangements:**

```Javascript
ABC  →  All 6 are the same group!
ACB
BAC
BCA
CAB
CBA
```

That's why: **3! = 3 × 2 × 1 = 6**

---

## **🎓 Summary Card**

```Javascript
╔═══════════════════════════════════╗
║   C(n, 3) = n×(n-1)×(n-2) / 6    ║
║                                   ║
║   "Pick 3 from n items"           ║
║                                   ║
║   Example: n = 4                  ║
║   4 × 3 × 2 / 6 = 24/6 = 4       ║
╚═══════════════════════════════════╝
```

---

## **⚡ Quick Mental Math Trick**

For small numbers, calculate like this:

**n = 4:**

- Top: 4 × 3 × 2 = 24
- Bottom: 6
- Answer: 24 ÷ 6 = **4** ✓

**n = 5:**

- Top: 5 × 4 × 3 = 60
- Bottom: 6
- Answer: 60 ÷ 6 = **10** ✓

**n = 6:**

- Top: 6 × 5 × 4 = 120
- Bottom: 6
- Answer: 120 ÷ 6 = **20** ✓

---

## **🔥 One-Sentence Summary**

> **"Multiply the top 3 numbers counting down from n, then divide by 6."**

That's it! Does this make it crystal clear? 🎯

---

## **C(n, 3) Formula Derivation**

## **Simplified:**

```Javascript
C(n, 3) = n! / (3! × (n-3)!)

C(n, 3) = n × (n-1) × (n-2) × (n-3)! / (3 × 2 × 1 × (n-3)!)

C(n, 3) = n × (n-1) × (n-2) / 6
```

---

## **Step-by-Step Breakdown:**

### **Step 1: Start with the combination formula**

```Javascript
C(n, 3) = n! / (3! × (n-3)!)
```

### **Step 2: Expand n! in the numerator**

```Javascript
C(n, 3) = [n × (n-1) × (n-2) × (n-3)!] / (3! × (n-3)!)
```

### **Step 3: Expand 3! in the denominator**

```Javascript
C(n, 3) = [n × (n-1) × (n-2) × (n-3)!] / (3 × 2 × 1 × (n-3)!)

C(n, 3) = [n × (n-1) × (n-2) × (n-3)!] / (6 × (n-3)!)
```

### **Step 4: Cancel (n-3)! from numerator and denominator**

```Javascript
C(n, 3) = n × (n-1) × (n-2) / 6
```

---

## **Final Formula:**

```Javascript
C(n, 3) = n × (n-1) × (n-2) / 6
```

**Where:**

- **n** = total number of items
- **3** = number of items to choose
- **6** = 3! (the number of ways to arrange 3 items)

---

## **Examples:**

**C(4, 3):**

```Javascript
= 4 × 3 × 2 / 6
= 24 / 6
= 4
```

**C(5, 3):**

```Javascript
= 5 × 4 × 3 / 6
= 60 / 6
= 10
```

**C(6, 3):**

```Javascript
= 6 × 5 × 4 / 6
= 120 / 6
= 20
```

---

## 🐛 Code Review: Bug Found

There's a **critical bug** in your code! Let me show you:

---

## **❌ The Problem**

Your code is **missing Case 3: All Different (x < y < z)**

Look at your conditional structure:

```javascript
if (x === y && y === z) {
  // Case 1: All same
} else if (x === y) {
  // Case 2a: Two same (x, x, z)
} else if (y === z) {
  // Case 2b: Two same (x, y, y)
  if (freq[y] >= 2) {
    result += (freq[x] * freq[y] * (freq[y] - 1)) / 2;
  } else {
    result += freq[x] * freq[y] * freq[z];  // ❌ WRONG LOCATION!
  }
}
// ❌ MISSING: What if x < y < z (all different)?
```

---

## **🔍 The Issue**

**What happens when x = 1, y = 2, z = 5 (all different)?**

1. `x === y && y === z` → **false** (1 ≠ 2 ≠ 5)
2. `x === y` → **false** (1 ≠ 2)
3. `y === z` → **false** (2 ≠ 5)
4. **No code executes!** ❌

The pattern **(1, 2, 5)** is completely skipped!

---

## **🤔 About That `else` Clause**

```javascript
else if (y === z) {
  if (freq[y] >= 2) {
    result += (freq[x] * freq[y] * (freq[y] - 1)) / 2;
  } else {
    result += freq[x] * freq[y] * freq[z];  // ❌ This makes no sense here!
  }
}
```

**Why this is wrong:**

- You're inside `y === z` block, meaning y and z are the **same value**
- The `else` executes when `freq[y] < 2`
- But if `freq[y] < 2` and you need two y's, you **can't form the triplet at all!**
- You should **skip** it, not calculate `freq[x] * freq[y] * freq[z]`

---

## **✅ Corrected Code**

```javascript
var threeSumMulti = function(arr, target) {
    const MOD = 10 ** 9 + 7;
    
    const freq = new Array(101).fill(0);
    for (const num of arr) {
        freq[num]++;
    }
    
    let result = 0;
    
    for (let x = 0; x <= 100; x++) {
        if (freq[x] === 0) continue;
        
        for (let y = x; y <= 100; y++) {
            if (freq[y] === 0) continue;
            
            let z = target - x - y;
            
            if (z < 0 || z > 100 || z < y) continue;
            if (freq[z] === 0) continue;
            
            // Case 1: All three same (x, x, x)
            if (x === y && y === z) {
                if (freq[x] >= 3) {
                    result += freq[x] * (freq[x] - 1) * (freq[x] - 2) / 6;
                }
            } 
            // Case 2a: Two same x, one different z (x, x, z)
            else if (x === y) {
                if (freq[x] >= 2) {
                    result += freq[x] * (freq[x] - 1) / 2 * freq[z];
                }
            } 
            // Case 2b: One different x, two same y (x, y, y)
            else if (y === z) {
                if (freq[y] >= 2) {
                    result += freq[x] * freq[y] * (freq[y] - 1) / 2;
                }
            } 
            // Case 3: All different (x, y, z)  ← THIS WAS MISSING!
            else {
                result += freq[x] * freq[y] * freq[z];
            }
            
            result %= MOD;
        }
    }
    
    return result;
};
```

---

## **🔄 What Changed**

### **Before (Your Code):**

```javascript
else if (y === z) {
  if (freq[y] >= 2) {
    result += (freq[x] * freq[y] * (freq[y] - 1)) / 2;
  } else {
    result += freq[x] * freq[y] * freq[z];  // ❌ Wrong place!
  }
}
// Missing case for all different!
```

### **After (Fixed):**

```javascript
else if (y === z) {
  if (freq[y] >= 2) {
    result += freq[x] * freq[y] * (freq[y] - 1) / 2;
  }
  // If freq[y] < 2, we skip (can't form the pattern)
} 
else {  // ✅ New: Handle all different
  result += freq[x] * freq[y] * freq[z];
}
```

---

## **📊 Test Case to Prove the Bug**

```javascript
arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
target = 8
```

**Expected Output:** 20

**With your buggy code:**

- Pattern (1, 2, 5): **SKIPPED** ❌ (should be 8)
- Pattern (1, 3, 4): **SKIPPED** ❌ (should be 8)
- Pattern (2, 2, 4): ✓ Counted (2)
- Pattern (2, 3, 3): ✓ Counted (2)
- **Your result: 4** (Wrong! Should be 20)

**With fixed code:**

- Pattern (1, 2, 5): ✓ 8
- Pattern (1, 3, 4): ✓ 8
- Pattern (2, 2, 4): ✓ 2
- Pattern (2, 3, 3): ✓ 2
- **Correct result: 20** ✓

---

## **🎯 Key Takeaway**

**The four cases structure must be:**

```javascript
if (x === y && y === z) {
    // Case 1: (x, x, x)
} else if (x === y) {
    // Case 2a: (x, x, z)
} else if (y === z) {
    // Case 2b: (x, y, y)
} else {
    // Case 3: (x, y, z) ← MUST have this!
}
```

Every possible triplet pattern **must** fall into exactly one of these four cases! 🎯
