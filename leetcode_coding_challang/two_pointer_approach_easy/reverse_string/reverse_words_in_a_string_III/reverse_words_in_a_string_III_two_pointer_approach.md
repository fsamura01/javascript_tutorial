# **Two-pointer Approach**

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

## **Clarification of `right <= n` in the Two-Pointer Approach**

In the loop:

```javascript
for (let right = 0; right <= n; right++) {
```

we use `right <= n` instead of `right < n`. Let's break down why this is necessary.

---

### **1. Understanding the Condition**

- `right` iterates through each character in the string.
- The condition `right <= n` ensures that **we handle the last word properly**.
- `n` is the length of the array (`arr.length`), so `right == n` means it **goes one step beyond** the last character.

---

### **2. Why `right <= n`?**

- **Words are separated by spaces**.
- A word should be reversed **when we find a space or reach the end of the string**.
- If we only use `right < n`, we would **never process the last word**, because it won’t be followed by a space.

#### **Example Without `right <= n`**

```javascript
s = "Mr Ding";
arr = ["M", "r", " ", "D", "i", "n", "g"]; // n = 7

for (let right = 0; right < n; right++) {
  if (arr[right] === " ") reverse(arr, left, right - 1);
  // Last word "Ding" never gets reversed
}
```

🔴 **Issue:** The last word `"Ding"` is **never reversed** because there’s no space after it.

#### **Example With `right <= n`**

```javascript
s = "Mr Ding";
arr = ["M", "r", " ", "D", "i", "n", "g"]; // n = 7

for (let right = 0; right <= n; right++) {
  if (right === n || arr[right] === " ") reverse(arr, left, right - 1);
}
```

✅ **Fix:** When `right === n`, the last word `"Ding"` is processed correctly.

---

### **3. Key Takeaway**

✅ **`right < n` skips the last word** if there’s no space after it.  
✅ **`right <= n` ensures all words get reversed**, including the last one.  
✅ This is a common **boundary condition trick** when working with words or substrings.

This approach works because it **modifies the input string in-place**, efficiently reversing each word without requiring additional arrays for splitting and joining. Let's break it down step by step:

---

## **Step-by-Step Explanation**

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

## **Key Insight That Simplifies the Problem**

The **key insight** is recognizing that we only need to **reverse individual words in place** while keeping their original order in the sentence **intact**. This allows us to avoid unnecessary operations like splitting and rejoining the string.

Instead of using `.split(" ")`, `.map()`, `.reverse()`, and `.join(" ")` (which create multiple intermediate arrays), we can efficiently solve the problem by:

1. **Identifying word boundaries** (using spaces as delimiters).
2. **Reversing each word in place** using a two-pointer approach.
3. **Skipping the need for extra space** by modifying the input string directly.

This **reduces space complexity from \( O(n) \) to \( O(1) \)** while maintaining a linear \( O(n) \) runtime, making it optimal for large inputs. 🚀

## **Applying This Approach to Similar Problems**

The **core insight**—processing the string **in-place** and using **two-pointer reversal**—can be applied to many other string manipulation problems. Here’s a general approach to adapting it:

---

### **1. Identify the Core Operations**

- **If the problem involves reversing elements** → Use **two pointers**.
- **If the problem involves working on words** → Identify **word boundaries** (spaces or punctuation).
- **If the problem requires in-place modification** → Convert the string into an **array of characters**.

---

### **2. Similar Problems and How to Solve Them**

Here are some problems where you can apply this approach:

#### **🔹 Reverse Words in a Sentence (LC 151)**

👉 _Reverse the order of words in a sentence while removing extra spaces._  
📌 **Solution:**

1. **Trim leading/trailing spaces**.
2. **Split words manually** (instead of using `.split(" ")`).
3. **Reverse the entire array** and then **reverse each word individually**.

```javascript
var reverseWords = function (s) {
  let arr = s.trim().split(""); // Remove extra spaces and convert to array
  reverse(arr, 0, arr.length - 1); // Reverse entire sentence

  let left = 0,
    n = arr.length;
  for (let right = 0; right <= n; right++) {
    if (right === n || arr[right] === " ") {
      reverse(arr, left, right - 1);
      left = right + 1;
    }
  }

  return arr.join("").replace(/\s+/g, " "); // Remove extra spaces
};
```

---

#### **🔹 Reverse String (LC 344)**

👉 _Reverse an entire string in-place._  
📌 **Solution:**

- **Use two pointers** (`left`, `right`) and swap characters.

```javascript
var reverseString = function (s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};
```

---

#### **🔹 Reverse Vowels of a String (LC 345)**

👉 _Reverse only the vowels in a string._  
📌 **Solution:**

1. **Use two pointers** (`left`, `right`).
2. **Swap only vowel characters** when found.

```javascript
var reverseVowels = function (s) {
  let vowels = new Set("aeiouAEIOU");
  let arr = s.split("");
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    while (left < right && !vowels.has(arr[left])) left++;
    while (left < right && !vowels.has(arr[right])) right--;
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join("");
};
```

---

### **3. Generalizing the Approach**

Whenever you encounter a string-related problem:
✅ **Ask if in-place modifications can be used** (reducing space complexity).  
✅ **Check if two-pointer technique applies** (for efficient swaps).  
✅ **Look for word or character boundaries** (e.g., spaces, vowels, digits).  
✅ **Try to avoid unnecessary `.split()`, `.join()`, and extra arrays**.

By mastering this technique, you can solve many **string transformation and reversal problems efficiently**! 🚀
