function strStr(haystack, needle) {
  // Edge case: empty needle
  if (needle === "") return 0;

  // Iterate through haystack
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;

    // Check substring starting at current index
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }

    // Return first match found
    if (match) return i;
  }

  return -1;
}

function strStr(haystack, needle) {
  // Step 1: Handle edge case where needle is longer than haystack
  if (needle.length > haystack.length) return -1;

  //! Step 2: Iterate through haystack with a sliding window

  /* This JavaScript block:

```javascript
haystack.substring(i, i + needle.length) === needle
```

is used to check whether the substring of the string `haystack` 
starting at index `i` and ending just before `i + needle.length` 
is equal to the string `needle`. Here's a step-by-step explanation:

---

### **1. What Does `substring()` Do?**

The `substring(start, end)` method in JavaScript extracts a portion of a string:
- `start`: The index of the first character to include in the substring.
- `end`: The index where the extraction stops (not included in the substring).

For example:
```javascript
const str = "hello";
console.log(str.substring(1, 4)); // Output: "ell"
```

---

### **2. Purpose of `i` and `i + needle.length`**

In the block:
```javascript
haystack.substring(i, i + needle.length)
```
- `i`: The current index in the `haystack` string where we start extracting a substring.
- `i + needle.length`: The index where the substring ends, 
    which ensures the length of the extracted substring matches the length of `needle`.

For instance, if:
- `haystack = "hello"`, `needle = "ell"`, and `i = 1`:
  - `haystack.substring(i, i + needle.length)` → `haystack.substring(1, 4)` → `"ell"`.

---

### **3. Comparing Substrings with `===`**

The code then compares the extracted substring with the `needle` 
string using the strict equality operator (`===`). This ensures that:
1. The two strings have the same content.
2. The comparison is case-sensitive.

Example:
```javascript
const haystack = "hello";
const needle = "ell";
console.log(haystack.substring(1, 4) === needle); // Output: true
```

---

### **4. Use Case in a Sliding Window**

This block of code is commonly used in a sliding window technique to find a substring in a string. Here's how it works:
- Iterate through `haystack` using a sliding window of size `needle.length`.
- At each step (`i`), extract the substring using `substring(i, i + needle.length)` and compare it to `needle`.
- If the two are equal, you’ve found the first occurrence of `needle` in `haystack`.

---

### **Step-by-Step Example**

Given:
```javascript
const haystack = "sadbutsad";
const needle = "sad";
```

1. **First Iteration (`i = 0`)**:
   - Extract substring: `haystack.substring(0, 3) = "sad"`.
   - Compare with `needle`: `"sad" === "sad"` → Match found.

2. **Second Iteration (`i = 1`)**:
   - Extract substring: `haystack.substring(1, 4) = "adb"`.
   - Compare with `needle`: `"adb" === "sad"` → No match.

3. **Continue Sliding**:
   - For `i = 6`, extract substring: `haystack.substring(6, 9) = "sad"`.
   - Compare with `needle`: `"sad" === "sad"` → Match found.

---

### **In Summary**
The block:
```javascript
haystack.substring(i, i + needle.length) === needle
```
1. Extracts a substring from `haystack` starting at index `i` with the same length as `needle`.
2. Compares this substring to `needle` to check for equality.
3. Is typically used in a loop to locate the first occurrence of `needle` in `haystack`. */

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    // Step 3: Compare substring with needle
    if (haystack.substring(i, i + needle.length) === needle) {
      return i; // Found the first occurrence
    }
  }

  // Step 4: If no match is found, return -1
  return -1;
}

// Test cases
console.log(strStr("sadbutsad", "sad")); // Output: 0
console.log(strStr("leetcode", "leeto")); // Output: -1
