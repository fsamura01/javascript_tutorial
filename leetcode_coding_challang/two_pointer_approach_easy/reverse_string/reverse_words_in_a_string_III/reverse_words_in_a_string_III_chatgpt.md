# **557. Reverse Words in a String III**

## **Step-by-Step Solution in JavaScript**

### **We need to reverse the characters of each word in the given string `while keeping the word order unchanged`.**

---

## **Approach**

1. **Split the string** into an array of words using the space `" "` as a delimiter.
2. **Reverse each word individually**.
3. **Join the words back into a string**, maintaining spaces.

---

## **JavaScript Implementation**

```javascript
var reverseWords = function (s) {
  return s
    .split(" ") // Step 1: Split into words
    .map((word) => word.split("").reverse().join("")) // Step 2: Reverse each word
    .join(" "); // Step 3: Join words back with spaces
};
```

---

## **Complexity Analysis**

1. **Splitting the string** → `O(n)`, where `n` is the length of `s`.
2. **Reversing each word** → Each word is reversed in-place, taking `O(n)`.
3. **Joining words back** → Takes `O(n)`.
4. **Overall Complexity** → **O(n)** (since all operations are linear).

---

## **Example Walkthrough**

### **Example 1**

```js
reverseWords("Let's take LeetCode contest");
```

- **Split:** `["Let's", "take", "LeetCode", "contest"]`
- **Reverse Each Word:** `["s'teL", "ekat", "edoCteeL", "tsetnoc"]`
- **Join:** `"s'teL ekat edoCteeL tsetnoc"`

✔ **Output:** `"s'teL ekat edoCteeL tsetnoc"`

---

### **Example 2**

```js
reverseWords("Mr Ding");
```

- **Split:** `["Mr", "Ding"]`
- **Reverse Each Word:** `["rM", "gniD"]`
- **Join:** `"rM gniD"`

✔ **Output:** `"rM gniD"`

---

## **Edge Cases Considered**

1. **Single-word input** (`"Hello"`) → Should return `"olleH"`.
2. **Multiple spaces are not present** (Guaranteed by problem constraints).
3. **All characters are printable ASCII** (No need to handle special characters separately).
4. **Long string (`s.length = 50,000`)** → The solution runs in **O(n)**, making it efficient.

🚀 **Final Thoughts:** This is an optimal and clean solution for reversing words in a string! 🎯

## **Step-by-Step Solution Using Two-Pointer Approach**

Instead of using built-in methods like `.reverse()`, we'll manually reverse each word using a **two-pointer approach**.

---

### **Approach:**

1. **Convert the string into a character array** (since strings in JavaScript are immutable).
2. **Use two pointers (`left` and `right`) to reverse each word** in place:
   - Move `right` to find spaces (word boundaries).
   - Reverse the characters between `left` and `right - 1`.
   - Move `left` to the start of the next word.
3. **Convert the array back to a string**.

---

### **JavaScript Implementation (Two Pointer Approach)**

```javascript
var reverseWords = function (s) {
  let arr = s.split(""); // Convert string to character array
  let n = arr.length;
  let left = 0;

  for (let right = 0; right <= n; right++) {
    // When we find a space or reach the end, reverse the word
    if (right === n || arr[right] === " ") {
      reverse(arr, left, right - 1);
      left = right + 1; // Move left to start of next word
    }
  }

  return arr.join(""); // Convert array back to string
};

// Helper function to reverse characters in place
function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap characters
    left++;
    right--;
  }
}
```

---

### **Complexity Analysis for Two-Pointer Approach**

1. **Splitting string into an array** → `O(n)`
2. **Iterating through the string** → `O(n)`
3. **Reversing each word using two pointers** → `O(n)`
4. **Joining back into a string** → `O(n)`

💡 **Overall Complexity: `O(n)`**, making it very efficient!

---

### **Example Walkthrough for Two-Pointer Approach**

#### **Example 1 (Two-Pointer Approach)**

```js
reverseWords("Let's take LeetCode contest");
```

##### **Step-by-step Execution**

1. Convert `"Let's take LeetCode contest"` → `['L', 'e', 't', "'", 's', ' ', 't', 'a', 'k', 'e', ' ', ...]`
2. **Reverse `"Let's"` → `"s'teL"`**
   - `['s', "'", 't', 'e', 'L', ' ', ...]`
3. **Reverse `"take"` → `"ekat"`**
   - `['s', "'", 't', 'e', 'L', ' ', 'e', 'k', 'a', 't', ' ', ...]`
4. **Reverse `"LeetCode"` → `"edoCteeL"`**
5. **Reverse `"contest"` → `"tsetnoc"`**
6. Convert back to string:  
   **Output:** `"s'teL ekat edoCteeL tsetnoc"`

---

#### **Example 2 (Two-Pointer Approach)**

```js
reverseWords("Mr Ding");
```

##### **Execution**

1. Convert `"Mr Ding"` → `['M', 'r', ' ', 'D', 'i', 'n', 'g']`
2. **Reverse `"Mr"` → `"rM"`**
3. **Reverse `"Ding"` → `"gniD"`**
4. Convert back to string:  
   **Output:** `"rM gniD"`

---

### **Edge Cases Considered (Two-Pointer Approach)**

1. **Single word (`"Hello"`)**
   - `"Hello"` → `"olleH"`
2. **String with spaces (`"a b c"`)**
   - `"a"` remains `"a"`, `"b"` remains `"b"`, `"c"` remains `"c"`, so output is unchanged.
3. **Large string (`s.length = 50,000`)**
   - Solution runs in `O(n)`, handling large inputs efficiently.

🚀 **Final Thoughts:**  
The **two-pointer approach** provides an **efficient, in-place solution** without extra space, making it optimal for large inputs. 🎯
