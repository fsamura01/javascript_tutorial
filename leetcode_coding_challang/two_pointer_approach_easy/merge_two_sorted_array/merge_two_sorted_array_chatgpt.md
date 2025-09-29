<!--
To solve the problem of merging two sorted arrays (`nums1` and `nums2`) into a single sorted array stored in-place in `nums1`, we can utilize a two-pointer approach. This method efficiently runs in \( O(m + n) \) time, leveraging the fact that the arrays are already sorted.
-->

# Merge two arrays

## Here’s a step-by-step explanation and implementation

---

### Approach

1. **Two Pointers from the End**

   - Use two pointers, `p1` and `p2`, initialized to the last valid elements in  
     `nums1` and `nums2`, respectively (`p1 = m - 1` and `p2 = n - 1`).
   - Start filling `nums1` from the end (index `m + n - 1`) to avoid overwriting elements in `nums1`.

2. **Compare and Place**:

   - Compare the elements pointed to by `p1` and `p2`.
   - Place the larger element at the current index (`m + n - 1`) and decrement the corresponding pointer (`p1` or `p2`).

3. **Handle Remaining Elements**:

   - If elements remain in `nums2` (i.e., `p2 >= 0`), copy them into `nums1` since all elements in `nums1` are already in place.
   - No need to copy from `nums1` because the merging is happening in-place.

4. **Edge Cases**:
   - If `nums2` is empty (`n = 0`), no changes are needed.
   - If `nums1` has no valid elements (`m = 0`), directly copy all elements from `nums2`.

---

### **Implementation**

```javascript
function merge(nums1, m, nums2, n) {
  // Start from the end of both arrays
  let p1 = m - 1; // Last valid element in nums1
  let p2 = n - 1; // Last element in nums2
  let p = m + n - 1; // Last position in nums1

  // Merge arrays starting from the end
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  // Copy remaining elements from nums2, if any
  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
}
```

---

### **Complexity Analysis**

1. **Time Complexity**:

   - Each element is processed exactly once by the two pointers.
   - Total time complexity is \( O(m + n) \).

2. **Space Complexity**:
   - The algorithm uses constant extra space (\( O(1) \)) since it performs the merge in-place in `nums1`.

---

### **Examples**

#### Example 1

```javascript
let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
merge(nums1, 3, nums2, 3);
console.log(nums1); // Output: [1, 2, 2, 3, 5, 6]
```

#### Example 2

```javascript
let nums1 = [1];
let nums2 = [];
merge(nums1, 1, nums2, 0);
console.log(nums1); // Output: [1]
```

#### Example 3

```javascript
let nums1 = [0];
let nums2 = [1];
merge(nums1, 0, nums2, 1);
console.log(nums1); // Output: [1]
```

---

### Conclusion

- This solution ensures the merging process is efficient,  
  adheres to the constraints, and modifies `nums1` in place as required.
