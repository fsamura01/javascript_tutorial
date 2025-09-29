# Merge Two Sorted Arrays

## Understanding the Problem

We're tasked with merging two sorted arrays, `nums1` and `nums2`, into `nums1` itself. The key point is that `nums1` already has extra space at the end to accommodate the merged elements.

### In-Place Merge Algorithm

- Here's a step-by-step approach to merge the arrays in-place:

### Two-Pointer Technique

- Initialize two pointers: `p1` pointing to the last element of
  `nums1` (index `m-1`and `p2` pointing to the last element of `nums2` (index `n-1`).
  Initialize a pointer `p` to the last position of the merged array, which is `m+n-1`.

### Comparison and Placement

- Compare the elements at `p1` and `p2`.
  Place the larger element at `p` and decrement the corresponding pointer.

### Handling Remaining Elements:\*\*

- Once one of the pointers reaches the beginning of its respective array,  
  copy the remaining elements from the other array to the remaining positions in `nums1`.

### JavaScript Implementation

```javascript
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1,
    p2 = n - 1,
    p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--];
  }

  // Copy remaining elements from nums2, if any
  while (p2 >= 0) {
    nums1[p--] = nums2[p2--];
  }
};
```

### Complexity Analysis

- **Time Complexity:** O(m + n)
  - We iterate through both arrays once, comparing and placing elements.
- **Space Complexity:** O(1)

  - We use only a few pointers, so the extra space usage is constant.

- **Explanation:**

  - **Two-Pointer Initialization:**
    - `p1` points to the last element of `nums1`'s non-zero part.
    - `p2` points to the last element of `nums2`.
    - `p` points to the last position of the merged array.

### Comparison and Placement\_

- We compare the elements at `p1` and `p2`.
  The larger element is placed at `p`, and the corresponding pointer is decremented.

### Handling Remaining Elements

- If `p1` reaches the beginning of `nums1`,  
  we copy the remaining elements from `nums2` to the remaining positions in `nums1`.
  This ensures that all elements from both arrays are merged correctly.

### Conclusions

- This approach efficiently merges the two sorted arrays in-place,
  making optimal use of the available space in `nums1`.
