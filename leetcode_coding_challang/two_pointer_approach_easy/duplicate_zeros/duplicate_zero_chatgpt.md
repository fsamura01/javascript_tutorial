# **1089. Duplicate Zeros**

## **Problem Understanding**

The problem "1089. Duplicate Zeros" requires us to modify an array in-place. The key requirements are:

- If an element is `0`, we need to duplicate it (shift the remaining elements to the right).
- The modification should be done **in-place** without using extra space.
- The final array should have the same length as the original.

### **Constraints & Edge Cases**

- The array length is `1 ≤ arr.length ≤ 10^4`, so we need an **efficient** approach.
- If duplicating a `0` exceeds the array length, we **truncate** extra elements.
- Arrays without `0`s remain unchanged.
- Consecutive `0`s should both be duplicated.

---

### **Pattern Identification**

This problem follows the **"Two-Pointer Technique"**, commonly used for **in-place modifications**.

- Instead of shifting elements multiple times (which is inefficient), we can use a **two-pass approach**:
  1. **First pass**: Count how many elements will be in the final modified array.
  2. **Second pass**: Fill the array backward (starting from the end) to avoid unnecessary shifts.

This pattern appears in problems like **merging sorted arrays**, **removing duplicates**, and **modifying strings in-place**.

---

### **Approach Discussion**

#### **Intuition & Step-by-Step Plan**

We avoid costly element shifts by processing the array **from right to left**.

#### **Steps:**

1. **Find the final length**:
   - Traverse the array to count how many elements would fit if we duplicated every `0`.
   - Maintain a `count` of how many valid elements would fit in the array.
2. **Modify the array in reverse**:
   - Use a **two-pointer** approach. One pointer (`i`) iterates over the original elements, and the second (`j`) places them in the final array.
   - If `arr[i]` is `0`, write `0` twice (if space allows). Otherwise, copy `arr[i]` once.
   - Move both pointers accordingly.

---

### **Code Implementation (JavaScript)**

```javascript
var duplicateZeros = function (arr) {
  let n = arr.length;
  let count = 0,
    i = 0;

  // First pass: Count how many elements can fit in the final array
  while (i + count < n) {
    if (arr[i] === 0) count++; // Each zero increases count
    i++;
  }

  // Second pass: Fill the array from the end
  let j = n - 1;
  i--; // Move back to last valid element in original array

  while (j >= 0) {
    if (arr[i] === 0) {
      if (j < n) arr[j] = 0; // Place the duplicated zero
      j--;
    }
    if (j < n) arr[j] = arr[i]; // Place the current element
    i--;
    j--;
  }
};
```

---

### **Complexity Analysis**

- **Time Complexity**: \( O(N) \)

  - The first pass takes \( O(N) \) to determine the effective size.
  - The second pass takes \( O(N) \) as we process each element once.
  - Overall, it's **linear time**.

- **Space Complexity**: \( O(1) \)
  - We modify the array in-place without extra storage.

---

### **Alternative Solutions**

#### **1. Naïve Approach (Shift Elements Manually) – \( O(N^2) \)**

- Traverse the array, and for every `0`, shift all elements right.
- This approach is inefficient due to excessive shifts.

#### **2. Using an Auxiliary List – \( O(N) \) Time, \( O(N) \) Space**

- Create a new list, copy elements while duplicating zeros, and overwrite the original.
- This uses extra space, which is **not allowed** in the problem constraints.

---

### **Practice Recommendations**

To strengthen the **two-pointer technique** and **in-place modifications**, try:

1. **LeetCode 88** – Merge Sorted Array (`Two Pointers, In-Place`)
2. **LeetCode 26** – Remove Duplicates from Sorted Array
3. **LeetCode 283** – Move Zeroes
4. **LeetCode 443** – String Compression

---

### **Flowchart Representation**

I'll generate a flowchart to visualize the solution process. Stay tuned! 🚀

I've generated a flowchart that visually illustrates the solution's key process steps. You can download and view it here:

[**Download Flowchart**](sandbox:/mnt/data/duplicate_zeros_flowchart.png)

This should help solidify your understanding of the **two-pass approach** for in-place array modification. Let me know if you have any questions! 🚀
