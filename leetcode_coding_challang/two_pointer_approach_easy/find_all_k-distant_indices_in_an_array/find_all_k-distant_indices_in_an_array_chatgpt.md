# **2200. Find All K-Distant Indices in an Array**

Let's break this down step by step to fully understand and solve **LeetCode 2200: Find All K-Distant Indices in an Array** efficiently.

---

## **Step 1: Problem Understanding**

### **Problem Statement**

You are given:

- An integer array `nums` of length `n`.
- An integer `key`.
- An integer `k`.

You need to find all indices `i` such that there exists at least one index `j` where:

- `nums[j] == key`
- `|i - j| <= k` (i.e., `i` is at most `k` distance from `j`)

Return the list of all such indices in **increasing order**.

---

### **Constraints & Edge Cases**

- `1 ≤ nums.length ≤ 1000`
- `1 ≤ nums[i] ≤ 1000`
- `key` is guaranteed to be in `nums`
- `1 ≤ k ≤ nums.length - 1`

**Edge Cases:**

1. **Smallest possible array**: If `nums` has only one element, it must be the key.
2. **All elements are the key**: Every index is valid.
3. **Large `k` values**: If `k` is large enough, it could include the entire array.
4. **Sparse keys**: The `key` appears far apart, testing index range calculations.

---

## **Step 2: Pattern Identification**

The problem essentially involves **range expansion** based on key occurrences. This suggests:

- **Brute Force Approach**: Check each index and determine if it's within the `k` range of any `key` occurrence.
- **Optimized Approach**: Track key positions and expand ranges efficiently.

This problem can be solved with:

- **Iterating over `nums` to find `key` positions (O(n))**
- **Expanding the range for each found `key` and marking valid indices (O(n))**
- The pattern used here is **"Range Expansion"**.

---

## **Step 3: Approach Discussion**

### **Approach:**

1. **Find all indices `j` where `nums[j] == key`**.
2. **Expand the range `[j-k, j+k]` for each key occurrence** and mark valid indices.
3. **Use a `Set` to ensure uniqueness of indices.**
4. **Return the sorted list of indices.**

---

## **Step 4: Code Implementation (JavaScript)**

```javascript
/**
 * @param {number[]} nums
 * @param {number} key
 * @param {number} k
 * @return {number[]}
 */
var findKDistantIndices = function (nums, key, k) {
  let keyIndices = new Set();

  // Step 1: Find all positions of 'key' in nums
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] === key) {
      // Step 2: Expand range [j-k, j+k] and add to set
      for (
        let i = Math.max(0, j - k);
        i <= Math.min(nums.length - 1, j + k);
        i++
      ) {
        keyIndices.add(i);
      }
    }
  }

  // Step 3: Return sorted array of unique indices
  return Array.from(keyIndices).sort((a, b) => a - b);
};
```

---

## **Step 5: Complexity Analysis**

- **Finding key positions** → **O(n)**
- **Expanding range per key occurrence** → **O(n)** (each index is processed at most once)
- **Sorting the set** → **O(n log n)** (in worst case)
- **Overall Complexity** → **O(n log n)** (due to sorting, but in practical cases, it's close to **O(n)**).

---

## **Step 6: Alternative Solutions**

### **Using a Boolean Array (O(n))**

Instead of using a set, we use a boolean array to mark valid indices.

```javascript
var findKDistantIndices = function (nums, key, k) {
  let n = nums.length;
  let valid = new Array(n).fill(false);

  for (let j = 0; j < n; j++) {
    if (nums[j] === key) {
      for (let i = Math.max(0, j - k); i <= Math.min(n - 1, j + k); i++) {
        valid[i] = true;
      }
    }
  }

  let result = [];
  for (let i = 0; i < n; i++) {
    if (valid[i]) result.push(i);
  }
  return result;
};
```

**Complexity:**

- **No sorting needed**, just **O(n)** traversal.

---

## **Step 7: Practice Recommendations**

To reinforce this pattern, try:

1. [**LeetCode 1423: Maximum Points You Can Obtain from Cards**](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/) - Range/window-based problem.
2. [**LeetCode 485: Max Consecutive Ones**](https://leetcode.com/problems/max-consecutive-ones/) - Similar index marking strategy.
3. [**LeetCode 995: Minimum Number of K Consecutive Bit Flips**](https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/) - Another range expansion challenge.

---

## **Step 8: Flowchart Design**

Here's a visual representation of the solution:

**Steps in Flowchart:**

1. Iterate through `nums`
2. Identify indices where `nums[j] == key`
3. Expand `[j-k, j+k]` range
4. Store unique indices in a set/array
5. Sort & return

I'll generate a **flowchart** to make this clearer.

It seems like I can’t do more advanced data analysis right now. Please try again later. However, you can visualize the flowchart by following these steps:

1. **Start**
2. **Iterate through `nums`**
3. **Find indices where `nums[j] == key`**
4. **Expand the range `[j-k, j+k]`**
5. **Store unique indices in a set**
6. **Sort and return the indices**

### **Why Expanding the Range `[j-k, j+k]` is Crucial for the K-Distant Problem**

Expanding the range **ensures we correctly identify all valid indices** that satisfy the problem condition:

> An index `i` is valid if there exists a `j` such that `nums[j] == key` and `|i - j| ≤ k`.

#### **1️⃣ Ensures Coverage of All Affected Indices**

For every index `j` where `nums[j] == key`, **all indices within `k` distance must be included**. Expanding `[j-k, j+k]` guarantees this coverage.

#### **2️⃣ Prevents Double Counting and Unnecessary Checks**

- Using a **set or boolean array** prevents adding duplicate indices.
- Once we mark indices in the range, we **don't need to check them again**, improving efficiency.

#### **3️⃣ Handles Edge Cases Correctly**

- If `j-k < 0`, we adjust to `0` (valid array index).
- If `j+k ≥ nums.length`, we adjust to `nums.length - 1`.

Without these adjustments, we could get **out-of-bounds errors**.

#### **4️⃣ Optimizes the Approach**

- Instead of checking every `i` against all `j` values separately (`O(n²)` brute force),
- We **expand in one pass per `key` occurrence**, leading to **O(n)** efficiency.

### **Example Walkthrough**

#### **Input**

```js
(nums = [2, 3, 3, 2, 3, 3, 2]), (key = 3), (k = 2);
```

#### **Key Occurrences**

| `j` (where `nums[j] == key`) | Expanded Range `[j-k, j+k]`        |
| ---------------------------- | ---------------------------------- |
| `j = 1`                      | `[max(0,1-2), min(6,1+2)] → [0,3]` |
| `j = 2`                      | `[0,4]`                            |
| `j = 4`                      | `[2,6]`                            |
| `j = 5`                      | `[3,6]`                            |

#### **Final Set of Indices**

The union of all ranges gives us `{0,1,2,3,4,5,6}` → **All indices in the array!**

**This demonstrates why expanding the range `[j-k, j+k]` is essential**—it **guarantees full coverage of valid indices** while keeping our approach efficient.

Let me know if you need more clarification! 🚀
