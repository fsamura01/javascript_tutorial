# **922. Sort Array By Parity II**

## 🔍 **Step 1: Problem Understanding**

The LeetCode problem **"922. Sort Array By Parity II"** states:

- Given an integer array `nums` of **even length**, rearrange it so that:
  - Every even index contains an **even** number.
  - Every odd index contains an **odd** number.
- Return any valid rearrangement.

### **Constraints & Edge Cases**

- `nums.length` is even.
- `nums[i]` can be positive or zero.
- **Edge cases to consider**:
  - Smallest input size, e.g., `[2,1]` (already sorted).
  - Cases where all evens and odds are mixed, e.g., `[3,6,1,4]`.
  - A large input size where an efficient solution is necessary.

---

## 🧩 **Step 2: Pattern Identification**

This problem falls into the **"Two Pointers"** pattern since:

- We need to place elements at correct indices without using extra space.
- A **two-pointer** approach allows in-place swaps, keeping the time complexity optimal.

---

## 🛠 **Step 3: Approach Discussion**

We'll use two pointers:

- **Even pointer (`i`)** starts at index `0`, looking for misplaced odd numbers.
- **Odd pointer (`j`)** starts at index `1`, looking for misplaced even numbers.
- If `nums[i]` is odd and `nums[j]` is even, we swap them.
- Move both pointers forward.
- Repeat until the array is correctly sorted.

### **Why this works?**

- Every misplaced number must have a corresponding opposite mismatch.
- The two-pointer technique ensures a single pass (`O(n)`) over the array.

---

## 💻 **Step 4: Code Implementation (JavaScript)**

```javascript
var sortArrayByParityII = function (nums) {
  let i = 0; // Even index pointer
  let j = 1; // Odd index pointer
  let n = nums.length;

  while (i < n && j < n) {
    // Find misplaced numbers
    while (i < n && nums[i] % 2 === 0) i += 2; // Find an odd number at even index
    while (j < n && nums[j] % 2 === 1) j += 2; // Find an even number at odd index

    // Swap to correct positions
    if (i < n && j < n) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  return nums;
};
```

## 🔍 **Step 5: Complexity Analysis**

- **Time Complexity:** `O(n)`
  - We traverse the array once and swap elements in constant time.
- **Space Complexity:** `O(1)`
  - We modify the array in-place, using only two extra pointers.

---

## 🔄 **Step 6: Alternative Solutions**

### ✅ Using Extra Space (Easier but Less Optimal)

- Create two separate lists: one for evens, one for odds.
- Merge them back in alternating order.
- **Time Complexity:** `O(n)`, **Space Complexity:** `O(n)`

```javascript
var sortArrayByParityII = function (nums) {
  let evens = [];
  let odds = [];
  let res = [];

  for (let num of nums) {
    if (num % 2 === 0) evens.push(num);
    else odds.push(num);
  }

  for (let i = 0; i < nums.length / 2; i++) {
    res.push(evens[i]);
    res.push(odds[i]);
  }

  return res;
};
```

✅ **Tradeoff:** Easier implementation but uses extra memory.

---

## 📚 **Step 7: Practice Recommendations**

If you want to master the **two-pointer** technique, try these:

1. **LeetCode 905:** Sort Array By Parity
2. **LeetCode 26:** Remove Duplicates from Sorted Array
3. **LeetCode 283:** Move Zeroes
4. **LeetCode 75:** Sort Colors

---

## 📊 **Step 8: Flowchart Design**

I'll generate a **flowchart** that visually explains how the two-pointer approach works.

Here's the flowchart that visually represents the **two-pointer** approach for solving the problem:

![Flowchart](sandbox:/mnt/data/sort_array_parity_ii_flowchart.png)

This should give you a clear step-by-step breakdown of the logic. Let me know if you have any questions! 🚀

In the **alternative solution** using extra space, the condition:

```javascript
for (let i = 0; i < nums.length / 2; i++) {
  res.push(evens[i]);
  res.push(odds[i]);
}
```

ensures that we correctly pair **even and odd numbers** in the result array.

### **Why `i < nums.length / 2`?**

- The array is **even-length** (i.e., `nums.length % 2 == 0`).
- Half of the numbers are **even**, and the other half are **odd**.
- We iterate `nums.length / 2` times because:
  - Each iteration **adds two elements** (one from `evens[]`, one from `odds[]`).
  - If `nums.length = 6`, then `i` runs from `0 to 2` (3 iterations), pushing all 6 numbers.

### **Example Walkthrough**

```javascript
nums = [4, 2, 5, 7];
evens = [4, 2];
odds = [5, 7];

res = []
i = 0 → res = [4, 5]
i = 1 → res = [4, 5, 2, 7]
```

Since `i` only goes up to `nums.length / 2`, it **prevents out-of-bounds errors** and ensures we place every number exactly once.

Let me know if you need further clarification! 🚀
