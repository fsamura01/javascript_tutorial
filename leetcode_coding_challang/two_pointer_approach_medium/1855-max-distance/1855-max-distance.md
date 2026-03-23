# LeetCode 1855 — Maximum Distance Between a Pair of Values

**Pattern:** Two Pointers (Same Direction, Different Arrays)  
**Difficulty:** Medium

---

## Problem

Given two non-increasing arrays `nums1` and `nums2`, return the maximum distance `j - i` of any valid pair `(i, j)`. A pair is valid if `i <= j` AND `nums1[i] <= nums2[j]`. Return `0` if no valid pairs exist.

***Example 1***

```javascript
Input:  nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
Output: 2

Explanation: Valid pairs: (0,0),(2,2),(2,3),(2,4),(3,3),(3,4),(4,4)
             Maximum distance = 2 with pair (2,4)
             nums1[2]=5 <= nums2[4]=5 ✅ and 2 <= 4 ✅
```

***Example 2***

```javascript
Input:  nums1 = [2,2,2], nums2 = [10,10,1]
Output: 1

Explanation: Valid pairs: (0,0),(0,1),(1,1)
             Maximum distance = 1 with pair (0,1)
```

***Example 3***

```javascript
Input:  nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]
Output: 2

Explanation: Valid pairs: (2,2),(2,3),(2,4),(3,3),(3,4)
             Maximum distance = 2 with pair (2,4)
```

***Constraints***

- `1 <= nums1.length, nums2.length <= 10⁵`
- `1 <= nums1[i], nums2[j] <= 10⁵`
- Both `nums1` and `nums2` are non-increasing

---

## Clarifying Questions & Answers

**Q: Why is pair (0,1) invalid in Example 1?**

```javascript
i=0, j=1
i <= j → 0 <= 1 ✅ satisfied!
nums1[0]=55 <= nums2[1]=20 → 55 <= 20 ❌ NOT satisfied!
Value condition fails → invalid pair!
```

**Q: What does non-increasing mean?**

```javascript
nums1 = [55, 30, 5, 4, 2]
         ↓    ↓  ↓  ↓
         each value <= previous value!
arr[i-1] >= arr[i] for every valid i
```

**Q: Why not just move `j` to maximize distance?**  
Moving `j` right makes `nums2[j]` smaller (non-increasing) — harder to satisfy `nums1[i] <= nums2[j]`. Moving `i` right makes `nums1[i]` smaller — easier to satisfy the condition!

---

## Key Concepts

**Two conditions for valid pair:**

```javascript
1. i <= j → index constraint
2. nums1[i] <= nums2[j] → value constraint
Both must be true!
```

**Pointer movement rules:**

```javascript
Valid pair → update maxDist, move j right (increase distance!)
Invalid pair → move i right (get smaller nums1[i]!)
               then j = Math.max(j, i) to ensure j >= i
```

**Why non-increasing property is crucial:**

```javascript
Without it: moving i or j could go either direction → O(n²) brute force
With it: moving i → nums1[i] always decreases → guaranteed improvement!
         moving j on invalid → nums2[j] gets smaller → even worse! ❌
         Clear decision at every step → O(n+m)! ✅
```

**Why `j = Math.max(j, i)`?**

```javascript
When i moves forward, i might overtake j!
max(j, i) guarantees i <= j at all times ✅
Without it: i > j → violates index constraint! ❌
```

---

## Brute Force vs Optimized

|        | Brute Force          | Two Pointers           |
|--------|----------------------|------------------------|
| Method | Try every pair (i,j) | Move pointers greedily |
| Time   | O(n²)                | O(n+m)                 |
| Space  | O(1)                 | O(1)                   |

**With max constraints (n = 10⁵):**

```javascript
Brute force: 10⁵ × 10⁵ = 10¹⁰ → too slow! ❌
Two pointers: 10⁵ + 10⁵ = 2×10⁵ → very fast! ✅
```

---

## Pseudocode

```javascript
function maxDistance(nums1, nums2):
  i = 0
  j = 0
  maxDist = 0

  while i < nums1.length AND j < nums2.length:

    if nums1[i] <= nums2[j]:       // valid pair!
      maxDist = max(maxDist, j-i)  // update max distance
      j++                          // try to increase distance
    else:                          // invalid pair!
      i++                          // get smaller nums1[i]
      j = max(j, i)                // ensure j never falls behind i

  return maxDist
```

---

## Solution

```javascript
function maxDistance(nums1, nums2) {
  let i = 0;
  let j = 0;
  let maxDist = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      maxDist = Math.max(maxDist, j - i);
      j++;
    } else {
      i++;
      j = Math.max(j, i);
    }
  }

  return maxDist;
}
```

---

## Dry Run

`nums1 = [55,30,5,4,2]`, `nums2 = [100,20,10,10,5]`

| Step | i | j | nums1[i] | nums2[j] | Valid? | maxDist | Action            |
|------|---|---|----------|----------|--------|---------|-------------------|
| 1    | 0 | 0 | 55       | 100      | ✅     | 0       | j=1               |
| 2    | 0 | 1 | 55       | 20       | ❌     | 0       | i=1, j=max(1,1)=1 |
| 3    | 1 | 1 | 30       | 20       | ❌     | 0       | i=2, j=max(1,2)=2 |
| 4    | 2 | 2 | 5        | 10       | ✅     | 0       | j=3               |
| 5    | 2 | 3 | 5        | 10       | ✅     | 1       | j=4               |
| 6    | 2 | 4 | 5        | 5        | ✅     | 2       | j=5 → STOP        |

`j=5 >= nums2.length=5` → loop exits → return `2` ✅

---

## Edge Cases

| Case                        | Behavior                                                          |
|-----------------------------|-------------------------------------------------------------------|
| No valid pairs              | `i` moves until end, `maxDist` never updated → return `0`         |
| Single element arrays       | `j - i = 0 - 0 = 0` → return `0`                                  |
| `nums1` longer than `nums2` | `j` reaches end of `nums2` first → loop exits naturally           |
| All elements equal          | Every pair valid, `j` moves to end → maxDist = `nums2.length - 1` |

---

## Complexity

|           | Value  | Reason                                           |
|-----------|--------|--------------------------------------------------|
| Time      | O(n+m) | i moves at most n steps, j moves at most m steps |
| Space     | O(1)   | Only i, j, maxDist variables                     |

---

## Reflection

**Why two pointers works here:**  
Both arrays are non-increasing — this gives us a clear decision at every step. Invalid pair → move `i` for guaranteed improvement. Valid pair → move `j` to increase distance. No backtracking needed!

**The tension in this problem:**

```javascript
Larger j → bigger distance ✅ but smaller nums2[j] ❌
Smaller i → smaller nums1[i] ✅ but smaller distance ❌
Two pointers balances both goals optimally!
```

**Common mistakes to avoid:**

- Moving `j` on invalid pairs — makes `nums2[j]` smaller, making things worse!
- Forgetting `j = Math.max(j, i)` — `i` can overtake `j` when moving forward!
- Starting `j` at `0` without handling `i > j` case — use `j = i` or `Math.max(j, i)`
- Checking `i <= j` separately — `Math.max(j, i)` handles this automatically!

---

## Related Problems

| #     | Title                                 | Pattern                        |
|-------|---------------------------------------|--------------------------------|
| 11    | Container With Most Water             | Two Pointers                   |
| 1679  | Max Number of K-Sum Pairs             | Two Pointers                   |
| 392   | Is Subsequence                        | Two Pointers (Same Direction)  |
| 1764  | Form Array by Concatenating Subarrays | Two Pointers + Greedy          |
