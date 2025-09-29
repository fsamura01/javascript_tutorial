# **1768. Merge Strings Alternately**

## **Understanding & Solving "1768. Merge Strings Alternately"**

🔹 **Problem Understanding**  
We are given two strings, `word1` and `word2`. Our goal is to merge them **alternately**, meaning:

- Take one character from `word1`, then one from `word2`, and repeat.
- If one string is longer than the other, append the remaining characters from the longer string at the end.

💡 **Example**:

```js
Input: (word1 = "abc"), (word2 = "pqr");
Output: "apbqcr";
```

```js
Input: (word1 = "ab"), (word2 = "pqrs");
Output: "apbqrs";
```

**Constraints:**

- `1 ≤ word1.length, word2.length ≤ 100`
- `word1` and `word2` contain only lowercase English letters.

✅ **Edge Cases:**

1. One string is empty (`word1 = "", word2 = "abc"`).
2. Strings of different lengths (`word1 = "abc", word2 = "pqrs"`).
3. Both strings are of equal length (`word1 = "ace", word2 = "bdf"`).

---

### **Pattern Identification**

This problem follows a **Two Pointers / Iterative Merge** pattern, commonly used in:

- **Merging two sorted arrays** (e.g., merging two linked lists).
- **Zipping two lists together** (like Python's `zip()` function).

The **key observation** is that we process each character **in order**, making it a **greedy** approach.

---

### **Approach Discussion (Step-by-Step)**

#### ✅ **Iterative Approach (Using a Loop)**

1. **Initialize two pointers (`i` for `word1`, `j` for `word2`).**
2. **Iterate while `i < word1.length` or `j < word2.length`**:
   - Add `word1[i]` to the result if `i` is valid.
   - Add `word2[j]` to the result if `j` is valid.
   - Increment both `i` and `j`.
3. **Return the merged string.**

---

### **Code Implementation (JavaScript)**

```javascript
var mergeAlternately = function (word1, word2) {
  let merged = ""; // Result string
  let i = 0,
    j = 0; // Two pointers

  while (i < word1.length || j < word2.length) {
    if (i < word1.length) merged += word1[i++];
    if (j < word2.length) merged += word2[j++];
  }

  return merged;
};

// Example Test Cases
console.log(mergeAlternately("abc", "pqr")); // Output: "apbqcr"
console.log(mergeAlternately("ab", "pqrs")); // Output: "apbqrs"
console.log(mergeAlternately("abcd", "pq")); // Output: "apbqcd"
```

---

### **Complexity Analysis**

| Aspect               | Complexity                                                              |
| -------------------- | ----------------------------------------------------------------------- |
| **Time Complexity**  | **O(N + M)** (where `N` and `M` are the lengths of `word1` and `word2`) |
| **Space Complexity** | **O(N + M)** (since we store the merged string)                         |

---

### **Alternative Approaches**

#### 1️⃣ **Using an Array (More Efficient in JavaScript)**

Instead of using string concatenation (`+=` which creates new strings each time), use an **array** and join at the end (faster in JS):

```javascript
var mergeAlternately = function (word1, word2) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < word1.length || j < word2.length) {
    if (i < word1.length) result.push(word1[i++]);
    if (j < word2.length) result.push(word2[j++]);
  }

  return result.join(""); // Efficient merging
};
```

✅ **Time Complexity:** `O(N + M)`  
✅ **Space Complexity:** `O(N + M)`, but `O(1)` if modifying in-place.

#### 2️⃣ **Using Recursion**

We can also solve this recursively:

```javascript
var mergeAlternately = function (word1, word2, i = 0, j = 0) {
  if (i === word1.length) return word2.slice(j);
  if (j === word2.length) return word1.slice(i);
  return word1[i] + word2[j] + mergeAlternately(word1, word2, i + 1, j + 1);
};
```

✅ **Time Complexity:** `O(N + M)`  
🚀 **Best used for educational purposes, as recursion has extra function calls (stack overhead).**

---

### **Practice Recommendations**

1️⃣ **Easy-Level**

- **LeetCode 21:** Merge Two Sorted Lists 🏆 (Similar merging technique)
- **LeetCode 844:** Backspace String Compare
- **LeetCode 67:** Add Binary

2️⃣ **Medium-Level**

- **LeetCode 92:** Reverse Linked List II
- **LeetCode 143:** Reorder List (Similar alternation concept)
- **LeetCode 11:** Container With Most Water

---

### **Flowchart Design**

I'll generate a flowchart to visualize the step-by-step execution.

Here’s a flowchart visualization of the **"Merge Strings Alternately"** algorithm! 📊 This diagram illustrates the step-by-step logic flow, making it easier to understand the iterative merging process.

---

### **Key Takeaways**

✅ **Pattern Used:** Two Pointers / Iterative Merge  
✅ **Time Complexity:** `O(N + M)`  
✅ **Space Complexity:** `O(N + M)` (Optimized using an array)  
✅ **Alternative Approaches:** Recursive and StringBuilder optimization

Now you’re well-equipped to tackle similar problems! Let me know if you’d like more clarification or a breakdown of another problem. 🚀💡
