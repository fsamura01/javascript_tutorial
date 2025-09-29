# **88. Merge Sorted Array**

## Step-by-Step Solution in JavaScript

<!--We need to merge two sorted arrays (`nums1` and `nums2`)
    into a single sorted array stored in `nums1`.
    The solution must operate directly on `nums1` in-place.-->

---

### **Constraints Analysis**

1. **Size of `nums1` and `nums2`:**

   - `nums1` has extra space (zeros) to accommodate all elements of `nums2`.
   - The size of `nums1` is `m + n`.

2. **Optimization Requirement:**

   - Since both arrays are already sorted, we can use a two-pointer approach for linear-time merging (`O(m + n)`).

3. **Merge in Reverse Order:**
   - Start filling `nums1` from the end (index `m + n - 1`).
     This avoids overwriting elements in `nums1`.

---

### **Approach: Reverse Two-Pointer Method**

1. **Initialize Pointers:**

   - Use `i = m - 1` to track the last valid element of `nums1`.
   - Use `j = n - 1` to track the last element of `nums2`.
   - Use `k = m + n - 1` as the position to insert the largest element.

2. **Compare and Place:**

   - Compare elements at `nums1[i]` and `nums2[j]`.
   - Place the larger element at `nums1[k]`.
   - Decrement the respective pointer (`i`, `j`) and `k`.

3. **Handle Remaining Elements:**
   - If `nums2` has remaining elements, copy them to `nums1`.
   - No need to copy remaining elements of `nums1` since they are already in place.

---

### **Code Implementation**

Here’s the JavaScript solution:

```javascript
function merge(nums1, m, nums2, n) {
  let i = m - 1; // Pointer for nums1
  let j = n - 1; // Pointer for nums2
  let k = m + n - 1; // Pointer for merged array in nums1

  // Merge in reverse order
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // If nums2 has remaining elements
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}
```

---

### **Example Walkthrough**

#### **Example 1**

```javascript
nums1 = [1, 2, 3, 0, 0, 0]; m = 3;
nums2 = [2, 5, 6]; n = 3;

// Step-by-step:
Initial: nums1 = [1, 2, 3, 0, 0, 0]
i = 2, j = 2, k = 5
Iteration 1: nums1[5] = 6 (nums2[2])
nums1 = [1, 2, 3, 0, 0, 6]

Iteration 2: nums1[4] = 5 (nums2[1])
nums1 = [1, 2, 3, 0, 5, 6]

Iteration 3: nums1[3] = 3 (nums1[2])
nums1 = [1, 2, 3, 3, 5, 6]

Iteration 4: nums1[2] = 2 (nums2[0])
nums1 = [1, 2, 2, 3, 5, 6]

Iteration 5: nums1[1] = 2 (nums1[1])
nums1 = [1, 2, 2, 3, 5, 6]

Final Result: [1, 2, 2, 3, 5, 6]
```

#### **Example 3**

```javascript
nums1 = [0]; m = 0;
nums2 = [1]; n = 1;

Initial: nums1 = [0]
j = 0, k = 0
nums1[0] = nums2[0] = 1

Final Result: [1]
```

---

### **Complexity Analysis**

1. **Time Complexity:**

   - Both pointers (`i` and `j`) traverse their respective arrays once.
   - The overall complexity is **O(m + n)**.

2. **Space Complexity:**
   - No additional space is used apart from a few pointers.
   - The space complexity is **O(1)**.

---

### **Pattern Recognition**

- The problem leverages the fact that both arrays are sorted. This allows us to:
  - Use a two-pointer technique for linear-time merging.
  - Avoid extra space usage by merging in-place.

By starting from the end, we efficiently avoid overwriting elements in `nums1`.
This reverse two-pointer pattern is common for merging problems involving sorted arrays or linked lists.
