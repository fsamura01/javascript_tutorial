# **392. Is Subsequence**

## **Problem Analysis**

- The problem is to determine whether string `s` is a subsequence of string `t`.
  A **subsequence** retains the relative order of characters but doesn't require contiguity.

---

## **Constraints**

- `0 <= s.length <= 100` and `0 <= t.length <= 10^4`
  means the algorithm should handle relatively small `s` and larger `t`.
- **Key observations**:
  - We can solve this problem efficiently using a two-pointer technique.
  - To solve the follow-up with many incoming strings `s`, we can preprocess `t` for efficient multiple queries.

---

## **Approach 1: Two-Pointer Technique**

### **Step-by-Step Solution**

1. **Initialize Two Pointers**:

   - `i` for `s` (index tracking characters in `s`).
   - `j` for `t` (index tracking characters in `t`).

2. **Iterate Through `t`**:

   - If `s[i] === t[j]`, move both pointers forward (indicating a match for the current character in `s`).
   - Otherwise, move only `j` forward (skipping unmatched characters in `t`).

3. **Check Completion**:
   - If we reach the end of `s` (`i === s.length`), all characters in `s` have been matched in `t` in the correct order → return `true`.
   - If we exhaust `t` (`j === t.length`) before matching all of `s`, return `false`.

---

### **Implementation**

```javascript
function isSubsequence(s, t) {
  let i = 0,
    j = 0;

  // Iterate through string t
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++; // Move to the next character in s
    }
    j++; // Always move to the next character in t
  }

  // If all characters in s are matched, return true
  return i === s.length;
}
```

---

### **Example Execution**

#### Example 1: `s = "abc", t = "ahbgdc"`

1. Initialize `i = 0`, `j = 0`.
2. Compare:
   - `s[0] = "a"`, `t[0] = "a"` → Match → Increment `i = 1`, `j = 1`.
3. Compare:
   - `s[1] = "b"`, `t[1] = "h"` → No match → Increment `j = 2`.
4. Compare:
   - `s[1] = "b"`, `t[2] = "b"` → Match → Increment `i = 2`, `j = 3`.
5. Compare:
   - `s[2] = "c"`, `t[3] = "g"` → No match → Increment `j = 4`.
6. Compare:
   - `s[2] = "c"`, `t[4] = "d"` → No match → Increment `j = 5`.
7. Compare:
   - `s[2] = "c"`, `t[5] = "c"` → Match → Increment `i = 3`, `j = 6`.
8. `i === s.length` → Return `true`.

#### Example 2: `s = "axc", t = "ahbgdc"`

1. Initialize `i = 0`, `j = 0`.
2. Compare:
   - `s[0] = "a"`, `t[0] = "a"` → Match → Increment `i = 1`, `j = 1`.
3. Compare:
   - `s[1] = "x"`, `t[1] = "h"` → No match → Increment `j = 2`.
4. Compare:
   - `s[1] = "x"`, `t[2] = "b"` → No match → Increment `j = 3`.
5. Compare:
   - `s[1] = "x"`, `t[3] = "g"` → No match → Increment `j = 4`.
6. Compare:
   - `s[1] = "x"`, `t[4] = "d"` → No match → Increment `j = 5`.
7. Compare:
   - `s[1] = "x"`, `t[5] = "c"` → No match → Increment `j = 6`.
8. `j === t.length` but `i < s.length` → Return `false`.

---

### **Complexity Analysis**

1. **Time Complexity**:

   - In the worst case, we iterate through all characters in `t` while comparing to `s`.
   - \(O(t.length)\).

2. **Space Complexity**:
   - Only pointers are used, so the space complexity is \(O(1)\).

---

## **Follow-Up: Efficient Querying with Many `s`**

If there are many `s` strings to check against the same `t`, we can preprocess `t` to optimize multiple queries.

### **Approach: Preprocessing with Index Map**

1. **Preprocessing**:

   - Build a dictionary (map) where each character in `t` points to a list of indices where it appears.
   - Example:

     - For `t = "ahbgdc"`, create:

       ```javascript
       {
           a: [0],
           h: [1],
           b: [2],
           g: [3],
           d: [4],
           c: [5]
       }
       ```

2. **Querying**:
   - Use binary search to efficiently find the next valid position of each character in `s` (using the index map).

---

### **Preprocessed Solution**

```javascript
function isSubsequencePreprocessed(s, t) {
  // Step 1: Preprocess t into an index map
  const indexMap = {};
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    if (!indexMap[char]) indexMap[char] = [];
    indexMap[char].push(i);
  }

  // Step 2: Check each character of s against the index map
  let currentIndex = -1; // Start before the first character
  for (const char of s) {
    if (!indexMap[char]) return false; // Character not in t

    // Binary search for the next index greater than currentIndex
    const indices = indexMap[char];
    let left = 0,
      right = indices.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (indices[mid] > currentIndex) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // If no valid index is found, return false
    if (left >= indices.length) return false;

    // Move to the next valid index
    currentIndex = indices[left];
  }

  return true;
}
```

---

### **Complexity**

1. **Preprocessing**:

   - Building the index map: \(O(t.length)\).

2. **Querying**:
   - For each `s`, each character requires \(O(\log n)\) binary search over the indices.
   - For `s.length = m`, total: \(O(m \cdot \log t.length)\).

---

### **Comparison**

| Approach                 | Time Complexity                         | Use Case                         |
| ------------------------ | --------------------------------------- | -------------------------------- |
| Two-pointer              | \(O(t.length)\)                         | Single query, moderate `t` size. |
| Preprocessed (Index Map) | \(O(t.length + m \cdot \log t.length)\) | Many queries, large `t`.         |

This makes the preprocessed solution ideal for the follow-up scenario.
