# 680. Valid Palindrome II

Sure! Let's break this problem down step by step and implement it in JavaScript.

---

## **Step 1: Understanding the Problem**

We need to determine if a given string can become a palindrome by removing **at most** one character.

### **Definition of Palindrome**

A palindrome is a string that reads the same forward and backward.  
For example:

- `"racecar"` → palindrome ✅
- `"abba"` → palindrome ✅
- `"abcd"` → not a palindrome ❌

### **Key Observations**

1. If the string is already a palindrome, return `true`.
2. If removing one character can make it a palindrome, return `true`.
3. Otherwise, return `false`.

---

## **Step 2: Plan the Solution**

1. Use two pointers:
   - One at the **beginning** (`left`).
   - One at the **end** (`right`).
2. Move both pointers towards the center while checking if characters match.
3. If there's a mismatch:
   - Try skipping the left character (`left + 1`).
   - Try skipping the right character (`right - 1`).
   - If either of those results in a palindrome, return `true`.
4. If no mismatches are found, return `true` (it's already a palindrome).

---

## **Step 3: Implement the Solution in JavaScript**

```javascript
function isPalindrome(s, left, right) {
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

function validPalindrome(s) {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      // Check if removing either left or right character makes it a palindrome
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }

  return true; // Already a palindrome
}
```

---

## **Step 4: Complexity Analysis**

1. **`isPalindrome(s, left, right)` Function**
   - This runs in **O(N)** time in the worst case when checking for palindromic properties.
2. **`validPalindrome(s)` Function**
   - The main loop runs in **O(N)**.
   - In case of a mismatch, we call `isPalindrome`, which takes **O(N)**.
   - So the worst case is **O(N) + O(N) = O(N)**.

### **Final Complexity**

- **Time Complexity:** **O(N)** (Linear time)
- **Space Complexity:** **O(1)** (Constant space since we use only pointers)

---

## **Step 5: Test Cases**

```javascript
console.log(validPalindrome("aba")); // true
console.log(validPalindrome("abca")); // true (remove 'c')
console.log(validPalindrome("abc")); // false
console.log(validPalindrome("deeee")); // true (remove 'd' or last 'e')
console.log(validPalindrome("racecar")); // true (already a palindrome)
```

Let me know if you need further explanations! 🚀
