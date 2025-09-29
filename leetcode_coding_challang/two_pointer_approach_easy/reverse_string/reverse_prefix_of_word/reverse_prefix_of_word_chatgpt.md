# **2000. Reverse Prefix of Word**

## **Step 1: Problem Understanding**

**Problem Statement (Simplified)**  
Given a string `word` and a character `ch`, find the **first occurrence** of `ch` in `word`. Then, reverse the prefix of `word` up to and including `ch`. Return the modified string.

**Constraints:**

- `word` consists of lowercase English letters (`a-z`).
- `word` has a length of `1` to `250`.
- `ch` is a lowercase English letter.

**Edge Cases to Consider:**  
✅ `ch` is at the beginning (trivial case, no change).  
✅ `ch` is at the end (entire string is reversed).  
✅ `ch` appears multiple times (reverse only up to the first occurrence).  
✅ `ch` is not present (return `word` unchanged).

---

### **Step 2: Pattern Identification**

The problem can be solved using the **String Manipulation + Two-Pointer Reversal** pattern.

- **Finding the character's first occurrence →** Use **index lookup** (`word.indexOf(ch)`).
- **Reversing the substring →** Use **two-pointer swapping** or the built-in `split().reverse().join()`.

Since the string is small (`≤ 250`), an **O(n) solution** is optimal.

---

### **Step 3: Approach Discussion**

1. **Find the index** of `ch` in `word`. If `ch` is not found, return `word` as-is.
2. **Extract the prefix** from index `0` to `index(ch)`, reverse it, and concatenate it with the remaining part of the string.
3. **Return the new string.**

---

### **Step 4: Code Implementation (JavaScript)**

Here’s a **clean and efficient implementation**:

```javascript
/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
  let index = word.indexOf(ch);

  // If ch is not found, return word unchanged
  if (index === -1) return word;

  // Reverse the prefix using built-in functions
  let prefix = word
    .slice(0, index + 1)
    .split("")
    .reverse()
    .join("");

  // Append the remaining part of the word
  return prefix + word.slice(index + 1);
};
```

---

### **Step 5: Complexity Analysis**

- **Finding `ch` in `word` →** `O(n)`
- **Reversing the prefix →** `O(k)`, where `k` is the length of the prefix
- **Slicing and joining →** `O(n)`

✅ **Overall Time Complexity:** `O(n)`, since we traverse `word` at most twice.  
✅ **Space Complexity:** `O(n)`, since `split('')` creates an array of characters.

---

### **Step 6: Alternative Approaches**

#### **Two-Pointer Reversal (In-place Modification)**

Instead of using `split().reverse().join()`, we can **reverse the prefix manually** using two pointers.

```javascript
var reversePrefix = function (word, ch) {
  let index = word.indexOf(ch);
  if (index === -1) return word;

  let arr = word.split(""); // Convert string to array
  let left = 0,
    right = index;

  // Reverse in-place using two-pointer swap
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join(""); // Convert array back to string
};
```

✅ **Same O(n) time complexity, but saves extra function calls.**  
✅ **Improves efficiency by avoiding unnecessary array creation.**

---

### **Step 7: Practice Recommendations**

Here are **related problems** to reinforce this pattern:

1. **Easy:**

   - [344. Reverse String](https://leetcode.com/problems/reverse-string/) (Two-pointer reversal)
   - [917. Reverse Only Letters](https://leetcode.com/problems/reverse-only-letters/) (String manipulation)

2. **Medium:**
   - [151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) (Splitting and reversing parts)
   - [557. Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/) (Word-by-word reversal)

---

### **Step 8: Flowchart Representation**

I'll now generate a **flowchart** that visually explains the logical flow of our solution. Stay tuned! 🎨📌

Here's the **flowchart** that visually represents the logical flow of our solution:

![Flowchart](sandbox:/mnt/data/reverse_prefix_flowchart.png)

This diagram outlines each step clearly, helping you visualize the decision-making process. 🚀

Would you like me to clarify any part further? 😊
