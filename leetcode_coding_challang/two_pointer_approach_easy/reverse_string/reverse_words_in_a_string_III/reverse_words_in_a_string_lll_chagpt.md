# 557. Reverse Words in a String III

## **Step-by-Step Solution in JavaScript**

---

### **1. Understanding the Problem**

- We need to reverse every word in the given string while keeping the words in their original order.
- Spaces should be preserved.
- We cannot reorder words, only reverse their characters.

---

### **2. Approach**

1. **Split the String:** Use `.split(" ")` to separate words into an array.
2. **Reverse Each Word:** Use `.map()` and `.split("").reverse().join("")` on each word.
3. **Join the Words Back:** Use `.join(" ")` to form the final string.

---

### **3. Implementation**

Here is the JavaScript solution:

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  return s
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
};

// Example Usage
console.log(reverseWords("Let's take LeetCode contest")); // Output: "s'teL ekat edoCteeL tsetnoc"
console.log(reverseWords("Mr Ding")); // Output: "rM gniD"
```

---

### **4. Complexity Analysis**

- **Splitting the string (`s.split(" ")`)** → \( O(n) \)
- **Reversing each word (using `map`, `split`, `reverse`, `join`)** → \( O(n) \) overall since each word operation is \( O(m) \) (where \( m \) is word length) but applied sequentially.
- **Joining the words (`join(" ")`)** → \( O(n) \)

Thus, the total **time complexity** is **\( O(n) \)** where \( n \) is the length of the string.

The **space complexity** is also **\( O(n) \)** due to the storage of intermediate arrays.

---

This is an efficient and clean solution! 🚀

## **Why does this approach work?**

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

This approach works because it **modifies the input string in-place**, efficiently reversing each word without requiring additional arrays for splitting and joining. Let's break it down step by step:

---

### **Step-by-Step Explanation**

1. **Convert the String into a Character Array**

   - Since JavaScript strings are immutable, `s.split("")` is used to create a mutable character array.
   - This allows us to reverse words in place without extra space.

2. **Initialize Pointers**

   - `left = 0` → Keeps track of the start of a word.
   - `right` → Iterates over the string, identifying word boundaries.

3. **Iterate Through the Array**

   - When `arr[right] === " "` (i.e., a space is found) or `right === n` (end of the string), the word is reversed using `reverse(arr, left, right - 1)`.
   - `left` is then updated to `right + 1`, moving to the start of the next word.

4. **Reverse Function (`reverse`)**

   - Uses two-pointer swapping (`left` and `right`) to reverse characters in place.

5. **Return the Final String**
   - After processing all words, `arr.join("")` reconstructs the modified string.

---

### **Time and Space Complexity Analysis**

- **Time Complexity: \( O(n) \)**

  - The `for` loop iterates through the string once (\( O(n) \)).
  - Each word is reversed in place using a two-pointer technique, which takes \( O(m) \) per word (where \( m \) is the word length).
  - Since all words are processed sequentially, the overall complexity remains **\( O(n) \)**.

- **Space Complexity: \( O(1) \)**
  - Since all modifications are done in place, we only use a few integer variables (`left`, `right`) and do not allocate extra space beyond the input array.
  - Unlike the `split-map-join` approach, this method avoids additional arrays, making it **more memory-efficient**.

---

### **Why Does This Approach Work?**

1. **In-Place Modification**

   - Avoids unnecessary memory allocation for word splitting and joining.

2. **Two-Pointer Reversal**

   - Efficiently reverses words without extra space.

3. **Single Pass Over Input**
   - The algorithm only scans the string once, making it optimal in terms of time complexity.

This approach is particularly useful when **memory constraints** are a concern, making it a more optimized solution for large input sizes! 🚀

## **What’s the key insight that simplifies the problem?**

### **Key Insight That Simplifies the Problem**

The **key insight** is recognizing that we only need to **reverse individual words in place** while keeping their original order in the sentence **intact**. This allows us to avoid unnecessary operations like splitting and rejoining the string.

Instead of using `.split(" ")`, `.map()`, `.reverse()`, and `.join(" ")` (which create multiple intermediate arrays), we can efficiently solve the problem by:

1. **Identifying word boundaries** (using spaces as delimiters).
2. **Reversing each word in place** using a two-pointer approach.
3. **Skipping the need for extra space** by modifying the input string directly.

- This **reduces space complexity from O(n) to O(1)** while maintaining a linear \( O(n) \) runtime, making it optimal for large inputs. 🚀
