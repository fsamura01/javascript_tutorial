# **541. Reverse String II**

<!--Here’s a **step-by-step solution** in **JavaScript** for the **"Reverse String II"** problem,
along with a **complexity analysis**.-->

## **Approach:**

1. **Process the string in chunks of `2k`**:

   - Every `2k` characters, reverse the first `k` characters.
   - Keep the next `k` characters as they are.

2. **Handle edge cases**:

   - If there are **fewer than `k` characters** left at the end, reverse all of them.
   - If there are **between `k` and `2k` characters**, reverse the first `k` and keep the rest.

3. **Implementation using array manipulation**:
   - Convert the string to an array (since strings are immutable in JavaScript).
   - Iterate through the string in steps of `2k` and apply the reversal.

---

## **JavaScript Implementation:**

```javascript
var reverseStr = function (s, k) {
  let arr = s.split(""); // Convert string to array for easy manipulation
  let n = arr.length;

  for (let i = 0; i < n; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k - 1, n - 1); // Ensure we don't go out of bounds

    // Reverse the first k characters in this chunk
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap characters
      left++;
      right--;
    }
  }

  return arr.join(""); // Convert array back to string
};
```

---

## **Complexity Analysis:**

1. **Loop Iteration:**
   - The loop runs **O(n / (2k)) ≈ O(n/k)** times.
2. **Reversing k Characters:**

   - Each iteration reverses at most `k` characters, which takes **O(k)**.

3. **Overall Complexity:**
   - Since we iterate `O(n/k)` times and reverse `O(k)` characters in each iteration, the total complexity is **O(n)**.

---

## **Example Walkthrough**

### **Example 1:**

```js
reverseStr("abcdefg", 2);
```

**Processing:**

1. `"ab"` → reversed → `"ba"`
2. `"cd"` → kept as is
3. `"ef"` → reversed → `"fe"`
4. `"g"` → remains as is

**Output:**

```js
"bacdfeg";
```

---

### **Example 2:**

```js
reverseStr("abcd", 2);
```

**Processing:**

1. `"ab"` → reversed → `"ba"`
2. `"cd"` → remains as is

**Output:**

```js
"bacd";
```

---

## **Edge Cases Considered:**

1. **String with fewer than `k` characters (`s = "abc", k = 5`)**

   - Entire string is reversed.

2. **String length is exactly `2k` (`s = "abcdefgh", k = 2`)**

   - `"ab"` → reversed → `"ba"`
   - `"cd"` → remains as is
   - `"ef"` → reversed → `"fe"`
   - `"gh"` → remains as is
   - **Output:** `"bacdfegh"`

3. **`k = 1` (Every other character is reversed)**
   - `"abcdefg"` → `"abcdefg"` (No changes)

---

## **Summary:**

- **Iterate every `2k` characters**.
- **Reverse the first `k` characters** in each chunk.
- **Time Complexity: O(n)**.
- **Space Complexity: O(n) (due to array conversion)**.

- 🚀 **Optimized and efficient approach for large inputs!**

<!-- If there are **fewer than `k` characters** left at the end, reverse all of them. * If there are **between `k` and `2k` characters**, reverse the first `k` and keep the rest. -->

## **Clarification with More Examples**

Let's go through different cases to understand how the reversal works.

---

### **Case 1: `s.length < k`**

**Example:**

```js
reverseStr("abc", 5);
```

**Explanation:**

- Since the entire string is **less than `k`**, reverse all of it.
- `"abc"` → `"cba"`

**Output:**

```js
"cba";
```

---

### **Case 2: `k ≤ s.length < 2k`**

**Example:**

```js
reverseStr("abcdef", 3);
```

**Explanation:**

- The length of `s` is **between `k` and `2k`**, so we reverse the first `k` characters and leave the rest.
- `"abcdef"`
  - First `k = 3` characters `"abc"` → reversed → `"cba"`
  - Remaining `"def"` stays the same.

**Output:**

```js
"cbadef";
```

---

### **Case 3: `s.length >= 2k` (Multiple Chunks)**

**Example 1:**

```js
reverseStr("abcdefgh", 2);
```

**Explanation:**

- Process in chunks of `2k = 4`:
  - `"ab"` → reversed → `"ba"`
  - `"cd"` → remains the same.
  - `"ef"` → reversed → `"fe"`
  - `"gh"` → remains the same.

**Output:**

```js
"bacdfegh";
```

---

**Example 2:**

```js
reverseStr("abcdefg", 2);
```

**Explanation:**

- Process in chunks of `2k = 4`:
  - `"ab"` → reversed → `"ba"`
  - `"cd"` → remains the same.
  - `"ef"` → reversed → `"fe"`
  - `"g"` → remains the same.

**Output:**

```js
"bacdfeg";
```

---

### **Case 4: `s.length` is exactly `2k`**

**Example:**

```js
reverseStr("abcdefgh", 4);
```

**Explanation:**

- `k = 4`, so we process every `2k = 8` characters at a time.
  - First 4 characters `"abcd"` → reversed → `"dcba"`
  - Next 4 characters `"efgh"` → remains as is.

**Output:**

```js
"dcbaefgh";
```

---

### **Summary of Rules**

| Condition           | Action                                               |
| ------------------- | ---------------------------------------------------- |
| `s.length < k`      | Reverse entire string                                |
| `k ≤ s.length < 2k` | Reverse the first `k` characters, keep the rest      |
| `s.length ≥ 2k`     | Reverse the first `k` characters in every `2k` chunk |

These cases cover all possible edge scenarios! 🚀

<!-- Please highlight the first 2k,  second 2k  character in the string below
"abcdefg", 2 -->

## **Let's break down the string **"abcdefg"** with **k = 2** and highlight the `2k = 4` character chunks.**

---

### **Step 1: Split into `2k` Chunks**

- Given `k = 2`, we process every **2k = 4** characters.
- The string `"abcdefg"` has **7 characters**, so we divide it as:

| **Chunk**   | **Characters**                   |
| ----------- | -------------------------------- |
| First `2k`  | `"abcd"`                         |
| Second `2k` | `"efg"` (only 3 characters left) |

---

### **Step 2: Highlight and Apply Reversal Rule**

- **First `2k = 4` characters → `"abcd"`**

  - Reverse the first `k = 2` characters → **"ba"**
  - Keep the next `k = 2` characters → **"cd"**
  - **Result after first chunk:** `"bacd"`

- **Second `2k` characters → `"efg"` (only 3 characters)**
  - Since `3 < 2k` but `≥ k`, we **reverse the first `k = 2` characters**.
  - `"efg"` → `"fe"` + `"g"`
  - **Result after second chunk:** `"fe"` + `"g"` = `"feg"`

---

### **Final Output**

```plaintext
Original:  "abcdefg"
Processed: "bacdfeg"
```

---

### **Visual Representation**

```plaintext
Original:   a  b  c  d  e  f  g
First 2k:  (reverse first 2) → "b  a  c  d"
Second 2k: (reverse first 2) → "f  e  g"
Final:      b  a  c  d  f  e  g
```

🚀 **Final Answer:** `"bacdfeg"`

## **Clarification of `let right = Math.min(i + k - 1, n - 1);`**

In the JavaScript function:

```javascript
var reverseStr = function (s, k) {
  let arr = s.split(""); // Convert string to array for easy manipulation
  let n = arr.length;

  for (let i = 0; i < n; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k - 1, n - 1); // Ensure we don't go out of bounds

    // Reverse the first k characters in this chunk
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap characters
      left++;
      right--;
    }
  }

  return arr.join(""); // Convert array back to string
};
```

---

### **What does this line do?**

```js
let right = Math.min(i + k - 1, n - 1);
```

This line determines the **right boundary** of the section we need to reverse.

#### **Breakdown of each part:**

- `i + k - 1`:
  - This finds the last index of the first `k` characters in the current `2k` chunk.
  - Example: If `i = 0` and `k = 2`, then `right = 0 + 2 - 1 = 1` (so we reverse index `0` to `1`).
- `Math.min(i + k - 1, n - 1)`:
  - This ensures that we **don’t go beyond the string’s last index**.
  - If `i + k - 1` goes beyond the length of `s`, we limit `right` to `n - 1` (the last character index).

---

### **Example 1: Normal Case**

```js
reverseStr("abcdefg", 2);
```

#### **Iteration 1 (`i = 0`):**

- `right = Math.min(0 + 2 - 1, 6) = Math.min(1, 6) = 1`
- Reverse indices **0 to 1** (`"ab"` → `"ba"`)
- String becomes: `"bacdefg"`

#### **Iteration 2 (`i = 4`):**

- `right = Math.min(4 + 2 - 1, 6) = Math.min(5, 6) = 5`
- Reverse indices **4 to 5** (`"ef"` → `"fe"`)
- String becomes: `"bacdfeg"`

✔ **Final Output: `"bacdfeg"`**

---

### **Example 2: Edge Case (`s.length < k`)**

```js
reverseStr("abc", 5);
```

- `right = Math.min(0 + 5 - 1, 2) = Math.min(4, 2) = 2`
- Reverse entire string `"abc"` → `"cba"`

✔ **Final Output: `"cba"`**

---

### **Summary**

✅ `right = Math.min(i + k - 1, n - 1)` ensures:

1. We **reverse only `k` characters** in a `2k` chunk.
2. We **don’t go out of bounds** if fewer than `k` characters are left.

## **Why Use `Math.min(i + k - 1, n - 1);` Instead of Directly Accessing `i + k - 1`?**

### **The key reason for using **`Math.min(i + k - 1, n - 1)`** is to **prevent out-of-bounds errors** when handling the last part of the string.**

---

### **Understanding the Problem**

1. We are reversing the first `k` characters in every `2k` window.
2. The formula `i + k - 1` calculates the last index in the `k`-sized segment.

- Normally, this works fine if the remaining characters are at least `k`.
- However, **if there are fewer than `k` characters left**, then `i + k - 1` **could go past the end of the string**, leading to an invalid index access.

---

### **Example Without `Math.min()` (Incorrect Approach)**

#### **Let's consider:**

```js
s = "abcdefg";
k = 3;
```

#### **Expected behavior:**

1. Reverse the first `k = 3` characters → `"abc"` → `"cba"`

2. Skip the next `k = 3` (`"def"`)
3. Reverse the last part (`"g"`) → No issue

If we use **`i + k - 1` directly**, then:

- `i = 6`, `i + k - 1 = 6 + 3 - 1 = 8`  
  **⚠️ But `s.length - 1 = 6`, meaning index `8` is out of bounds!**

---

### **Correct Approach Using `Math.min()`**

#### **By applying:**

```js
let right = Math.min(i + k - 1, n - 1);
- If `i + k - 1` **goes beyond the string’s length**, `Math.min()` **caps it at the last valid index (`n - 1`)**.
- This ensures we **never try to access an index that doesn't exist**.
```

---

### **Example with `Math.min()` (Correct Approach)**

#### **Example 1: Standard Case**

```js
reverseStr("abcdefg", 2);
```

#### **Iteration 1 (`i = 0`)**

- `right = Math.min(0 + 2 - 1, 6) = Math.min(1, 6) = 1`
- Reverse `"ab"` → `"ba"`
- String: `"bacdefg"`

#### **Iteration 2 (`i = 4`)**

- `right = Math.min(4 + 2 - 1, 6) = Math.min(5, 6) = 5`
- Reverse `"ef"` → `"fe"`
- String: `"bacdfeg"`

✔ **Final Output: `"bacdfeg"`**

---

#### **Example 2: Edge Case (`s.length < k`)1**

```js
reverseStr("abc", 5);
```

- `right = Math.min(0 + 5 - 1, 2) = Math.min(4, 2) = 2`
- Reverse entire string `"abc"` → `"cba"`

✔ **Final Output: `"cba"`**

---

### **Why Not Just Use `i + k - 1`?**

If we used `i + k - 1` directly:

- It **works fine when `s.length` is a multiple of `2k`**.
- **But when `s.length` < `k`, it would cause an "out-of-bounds" error** by trying to access indices that don't exist.

Using **`Math.min()` ensures safety** by never exceeding the last valid index (`n - 1`). 🚀
