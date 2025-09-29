# **345. Reverse Vowels of a String**

## **Step-by-Step Solution in JavaScript:**

- The goal is to reverse only the vowels in the string while
  leaving the order of other characters unchanged.

---

## **Spotting the Pattern Using Constraints:**

### **Key Observations:**

1. **Reverse only vowels:**
   - A vowel is any of `a, e, i, o, u` (both uppercase and lowercase).  
     Thus, we need to check membership in a set of vowels.
2. **String length constraint (1 ≤ s.length ≤ 3 \* 10⁵):**
   - The solution must be efficient (linear time complexity),  
     and any approach with quadratic complexity (e.g., nested loops) would be too slow.
3. **In-place operations:**
   - While the string is immutable in JavaScript, we can convert it to an array of characters,  
     modify the array, and then join it back into a string.

### **Pattern:**

- The problem can be solved using the **two-pointer technique**, similar to reversing an array:

1. Use two pointers:
   - **Left pointer:** Start from the beginning of the string.
   - **Right pointer:** Start from the end of the string.
2. Move the pointers toward each other:
   - If the character at `left` is a vowel and the character at `right` is a vowel, swap them.
   - If the character at `left` is not a vowel, move the `left` pointer forward.
   - If the character at `right` is not a vowel, move the `right` pointer backward.
3. Stop when the pointers meet or cross each other.

---

### Algorithm

1. Create a set of vowels (`vowels`) for quick lookup.
2. Convert the string into an array of characters (`sArr`).
3. Initialize two pointers: `left` and `right`.
4. While `left < right`:
   - If both `sArr[left]` and `sArr[right]` are vowels, swap them and move both pointers.
   - If only one of them is a vowel, move the appropriate pointer.
5. Convert the array back to a string and return the result.

---

### Code Implementation

```javascript
function reverseVowels(s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const sArr = s.split(""); // Convert string to array
  let left = 0;
  let right = sArr.length - 1;

  while (left < right) {
    // Check if both characters are vowels
    if (vowels.has(sArr[left]) && vowels.has(sArr[right])) {
      // Swap the vowels
      [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
      left++;
      right--;
    } else if (!vowels.has(sArr[left])) {
      left++; // Move left pointer if not a vowel
    } else if (!vowels.has(sArr[right])) {
      right--; // Move right pointer if not a vowel
    }
  }

  return sArr.join(""); // Convert array back to string
}
```

---

### Example Walkthrough

#### Example 1: `s = "IceCreAm"`

1. Initial state: `sArr = ['I', 'c', 'e', 'C', 'r', 'e', 'A', 'm']`, `left = 0`, `right = 7`.
2. Iteration:
   - `sArr[left] = 'I'` and `sArr[right] = 'm'`. `m` is not a vowel → Move `right` to `6`.
   - `sArr[left] = 'I'` and `sArr[right] = 'A'`. Both are vowels → Swap → `sArr = ['A', 'c', 'e', 'C', 'r', 'e', 'I', 'm']`.
   - `left = 1`, `right = 5`.
   - `sArr[left] = 'c'`. Not a vowel → Move `left` to `2`.
   - `sArr[left] = 'e'` and `sArr[right] = 'e'`. Both are vowels → Swap → `sArr = ['A', 'c', 'e', 'C', 'r', 'e', 'I', 'm']` (no change, as they're the same).
   - `left = 3`, `right = 4`.
   - `sArr[left] = 'C'`. Not a vowel → Move `left` to `4`.
3. Final state: `sArr = ['A', 'c', 'e', 'C', 'r', 'e', 'I', 'm']`.
4. Result: `"AceCreIm"`.

---

#### Example 2: `s = "leetcode"`

1. Initial state: `sArr = ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e']`, `left = 0`, `right = 7`.
2. Iteration:
   - `sArr[left] = 'l'`. Not a vowel → Move `left` to `1`.
   - `sArr[left] = 'e'` and `sArr[right] = 'e'`. Both are vowels → Swap → `sArr = ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e']` (no change, as they're the same).
   - `left = 2`, `right = 6`.
   - `sArr[right] = 'd'`. Not a vowel → Move `right` to `5`.
   - `sArr[left] = 'e'` and `sArr[right] = 'o'`. Both are vowels → Swap → `sArr = ['l', 'o', 'e', 't', 'c', 'e', 'd', 'e']`.
   - `left = 3`, `right = 4`.
3. Final state: `sArr = ['l', 'o', 'e', 't', 'c', 'e', 'd', 'e']`.
4. Result: `"leotcede"`.

---

### Complexity Analysis

#### Time Complexity

1. **O(n)** where `n` is the length of the string:
   - Each character is visited at most once by either the `left` or `right` pointer.
2. Membership check in the set (`vowels.has`) is O(1).

#### Space Complexity

1. **O(1)** extra space:
   - The `vowels` set is constant and does not depend on the input size.
   - Modifications are done in-place.

---

### Final Notes

- The two-pointer technique ensures that the solution is both time-efficient and space-efficient.
- The use of a `Set` for vowels allows quick membership checks, optimizing the performance.

### **Why Strings are Immutable in JavaScript**

- In JavaScript, **strings are immutable** because they are designed that way in the language  
  specification. This means that once a string is created, its content cannot be changed.  
  Any operation that seems to modify a string actually creates a **new string** instead of altering the original one.

---

### Reasons for Immutability

1. **Performance Optimization:**

   - Strings are often used heavily in programming, and making them immutable allows for various performance optimizations.
   - For example, if multiple variables reference the same string, there is no risk of one variable accidentally modifying the string and affecting other variables. This eliminates the need for constant deep copies of strings.

2. **Memory Management:**

   - Immutability allows JavaScript engines to safely reuse strings in memory, reducing memory usage.
   - For example, if two variables reference the same string value (`let a = "hello"; let b = "hello";`), they can point to the same location in memory instead of duplicating the string.

3. **Ease of Debugging:**

   - Immutable strings simplify debugging because developers don’t have to track down unexpected modifications. The value of a string will remain the same unless explicitly reassigned.

4. **Security:**
   - Immutability enhances security in cases where strings are passed between different parts of an application. For instance, if a string is used as a key or an identifier, you can be sure that it won't change unexpectedly.

---

### Practical Implications

1. **Concatenation Creates a New String:**

   ```javascript
   let str = "Hello";
   str += " World"; // Creates a new string "Hello World"
   console.log(str); // "Hello World"
   ```

   The original string `"Hello"` remains unchanged, and `"Hello World"` is a new string.

2. **String Methods Create New Strings:**

   ```javascript
   let str = "abc";
   let upperStr = str.toUpperCase();
   console.log(str); // "abc" (unchanged)
   console.log(upperStr); // "ABC" (new string)
   ```

3. **Immutability in Function Arguments:**

   - When a string is passed to a function, the original string cannot be modified by the function.

   ```javascript
   function modifyString(s) {
     s = "Modified!";
   }
   let str = "Original";
   modifyString(str);
   console.log(str); // "Original" (unchanged)
   ```

---

### How to "Modify" Strings (Workaround)

If you need to "modify" a string, you can achieve this by creating a new string using string operations or by converting it to an array of characters (mutable) and then joining it back into a string.

#### Example 1: String Replacement

```javascript
let str = "Hello";
str = str.replace("l", "x");
console.log(str); // "Hexlo" (new string)
```

#### Example 2: Using Arrays

```javascript
let str = "Hello";
let arr = str.split(""); // Convert to array
arr[0] = "J"; // Modify the array
str = arr.join(""); // Convert back to string
console.log(str); // "Jello"
```

---

### Summary

JavaScript strings are immutable because it leads to:

- **Better performance** due to reuse of string instances in memory.
- **Simpler debugging** and safer code.
- **Efficiency in memory management** for frequently used string operations.

### **Conclusion**

- When you "modify" a string in JavaScript, you're actually creating
  a new string instance rather than altering the original one.
  This behavior aligns with how strings are handled in many programming languages.
