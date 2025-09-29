# **2108. Find First Palindromic String in the Array**

## **Step 1: Problem Understanding**

### **Problem Statement (Simplified)**

You are given an array of strings `words`. Your task is to **find the first palindromic string** in the array and return it. If no palindrome is found, return an **empty string** `""`.

#### **Constraints**

- Each word consists only of lowercase English letters (`a-z`).
- The array length is between `1` and `100`.
- Each word's length is between `1` and `100`.

#### **Edge Cases to Consider:**

✅ The first word is a palindrome (trivial case).  
✅ No words are palindromes (should return `""`).  
✅ Multiple palindromes exist (return the **first** one).  
✅ Words of length `1` (single-letter words are always palindromes).

---

### **Step 2: Pattern Identification**

This problem follows the **"Brute Force + String Manipulation"** pattern.

- **Checking if a word is a palindrome →** Can be done using a **two-pointer approach** or built-in string reversal.
- **Iterating over the words →** A simple **linear scan (O(n))** is enough.

Since the input size is relatively small (`≤ 100 * 100 = 10,000` characters in total), an **O(n \* m) solution** (where `m` is the length of each word) is feasible.

---

### **Step 3: Approach Discussion**

1. **Iterate through the `words` array** from left to right.
2. **Check if each word is a palindrome** using one of two methods:
   - **Built-in string reversal** (`word === word.split('').reverse().join('')`).
   - **Two-pointer technique** (comparing characters from both ends).
3. **Return the first palindrome found**. If none are found, return `""`.

---

### **Step 4: Code Implementation (JavaScript)**

#### **Approach 1: Using Built-in String Reversal**

```javascript
/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  for (let word of words) {
    if (word === word.split("").reverse().join("")) {
      return word; // Return first palindrome found
    }
  }
  return ""; // No palindrome found
};
```

✅ **Simple and readable**  
✅ **Time Complexity:** `O(n * m)` (n = number of words, m = average word length)  
✅ **Space Complexity:** `O(m)` (due to `split('').reverse().join('')`)

---

#### **Approach 2: Using Two-Pointer Technique**

```javascript
/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  function isPalindrome(word) {
    let left = 0,
      right = word.length - 1;
    while (left < right) {
      if (word[left] !== word[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  for (let word of words) {
    if (isPalindrome(word)) return word;
  }
  return "";
};
```

✅ **More efficient in terms of space (`O(1)`)**  
✅ **Better performance for long words**  
✅ **Time Complexity:** `O(n * m)` (same as Approach 1)  
✅ **Space Complexity:** `O(1)` (constant space, no extra array creation)

---

### **Step 5: Complexity Analysis**

For both approaches:

- **Iterating over `n` words →** `O(n)`.
- **Checking if a word is a palindrome →** `O(m)`.
- **Overall Time Complexity:** `O(n * m)`.
- **Space Complexity:**
  - Approach 1: `O(m)` (due to `split('').reverse().join('')`).
  - Approach 2: `O(1)` (in-place checks, no extra storage).

Thus, the **two-pointer approach is preferred** for efficiency.

---

### **Step 6: Alternative Solutions**

#### **Using Regular Expressions (Not Recommended)**

A regex solution is possible, but it’s less efficient:

```javascript
var firstPalindrome = function (words) {
  for (let word of words) {
    if (word === [...word].reverse().join("")) return word;
  }
  return "";
};
```

🚫 **Downsides:**

- **Less readable** for beginners.
- **Uses unnecessary spread operator (`[...]`)**, which increases memory usage.

---

### **Step 7: Practice Recommendations**

Here are **similar problems** to reinforce this pattern:

1. **Easy:**

   - [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) (Ignore non-alphanumeric characters)
   - [344. Reverse String](https://leetcode.com/problems/reverse-string/) (Basic string reversal)

2. **Medium:**
   - [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) (Count all palindromic substrings)
   - [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) (Finding the longest palindrome in a string)

---

### **Step 8: Flowchart Representation**

I'll now generate a **flowchart** to visually explain the solution. Stay tuned! 🎨📌

Here's the **flowchart** that visually represents the logical flow of our solution:

![Flowchart](sandbox:/mnt/data/first_palindrome_flowchart.png)

This helps in understanding how the function iterates through the list and determines the first palindrome. 🚀

Would you like me to clarify any part further? 😊
