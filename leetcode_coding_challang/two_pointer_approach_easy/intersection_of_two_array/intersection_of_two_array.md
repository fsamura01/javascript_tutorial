# **349. Intersection of Two Arrays**

## Step-by-Step Solution in JavaScript for Intersection of Two Arrays

### **The goal is to find the **intersection** of two arrays (`nums1` and `nums2`), where:**

- Each element in the result must be unique.
- The result can be returned in any order.

---

## Spotting the Pattern Using Constraints

### Key Observations

1. **Constraint: 1 ≤ nums1.length, nums2.length ≤ 1000**

   - The arrays are relatively small, so solutions with time complexity **O(n \* m)** (nested loops) might work but aren't optimal.
   - A solution using **hashing** can reduce time complexity to **O(n + m)**.

2. **Constraint: 0 ≤ nums1[i], nums2[i] ≤ 1000**

   - The range of possible values is limited. This allows us to use a **Set** (or array for direct indexing) to track elements efficiently.

3. **Unique Elements in the Result:**
   - To ensure uniqueness, we can use a **Set**, which only keeps unique values.

---

## Pattern

1. Use a **Set** to store unique elements from one array (e.g., `nums1`).
2. Iterate through the second array (`nums2`) and check if any elements exist in the Set.
3. Collect the common elements in another Set to ensure the result is also unique.
4. Convert the result Set back to an array before returning.

---

## Algorithm

1. Create a `Set` from the first array (`nums1`).
2. Iterate over the second array (`nums2`).
   - If an element in `nums2` exists in the Set of `nums1`, add it to a result Set.
3. Convert the result Set to an array and return it.

---

## Code Implementation

```javascript
function intersection(nums1, nums2) {
  // Use a Set to store unique elements from nums1
  const set1 = new Set(nums1);
  const result = new Set();

  // Check for intersections with nums2
  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }

  // Convert the result Set to an array
  return Array.from(result);
}
```

---

## Example Walkthrough

### Example 1: `nums1 = [1, 2, 2, 1]`, `nums2 = [2, 2]`

1. Create `set1` from `nums1`: `{1, 2}`.
2. Iterate through `nums2`:
   - `2` exists in `set1` → Add `2` to `result`.
   - `2` again exists in `set1` → `result` remains `{2}`.
3. Convert `result` to an array: `[2]`.
4. Output: `[2]`.

### Example 2: `nums1 = [4, 9, 5]`, `nums2 = [9, 4, 9, 8, 4]`

1. Create `set1` from `nums1`: `{4, 9, 5}`.
2. Iterate through `nums2`:
   - `9` exists in `set1` → Add `9` to `result`.
   - `4` exists in `set1` → Add `4` to `result`.
   - `9` again exists in `set1` → `result` remains `{9, 4}`.
   - `8` does not exist in `set1` → Skip.
   - `4` again exists in `set1` → `result` remains `{9, 4}`.
3. Convert `result` to an array: `[9, 4]` (or `[4, 9]` since order doesn't matter).
4. Output: `[9, 4]` or `[4, 9]`.

---

## Complexity Analysis

### Time Complexity

1. **Building `set1`:** O(n), where `n` is the length of `nums1`.
2. **Iterating through `nums2`:** O(m), where `m` is the length of `nums2`.
3. **Overall time complexity:** O(n + m).

### Space Complexity

1. **Set storage:** O(n) for `set1`, O(k) for `result`, where `k` is the size of the intersection.
2. **Overall space complexity:** O(n + k).

---

## Final Notes

- The `Set`-based approach is straightforward and efficient for small to medium-sized arrays.
- The solution ensures the result contains only unique elements and avoids unnecessary computations with hashing.

---

## **Optimized Variant (Using Sorting):**

### **If the arrays are very large and we want to reduce space usage:**

- we can sort both arrays and use two pointers to find the intersection
- This approach has a time complexity of **O(n log n + m log m)** due to sorting.

---

### **Here’s how we can implement the **optimized variant using sorting and two pointers** for finding the intersection of two arrays.**

#### **Key Idea (Two-Pointer Approach)**

1. **Sort both arrays**: Sorting allows us to compare elements sequentially,
   which eliminates the need for additional data structures (like a `Set`) to track elements.
2. **Two-pointer technique**:
   - Use two pointers, `i` and `j`, initialized to the start of both sorted arrays.
   - Compare the elements at `nums1[i]` and `nums2[j]`:
     - If they are equal, add the element to the result (only if it’s not already added to avoid duplicates).
     - If `nums1[i] < nums2[j]`, move the pointer `i` forward.
     - If `nums1[i] > nums2[j]`, move the pointer `j` forward.
3. Continue until either pointer reaches the end of its array.

---

#### **Algorithm (Two-Pointer Approach)**

1. Sort `nums1` and `nums2`.
2. Initialize two pointers (`i` and `j`) at the start of both arrays.
3. Create an empty array `result` to store the intersection.
4. Use a loop to traverse both arrays:
   - If `nums1[i] === nums2[j]`:
     - Add the element to `result` if it’s not already the last added element (to ensure uniqueness).
     - Increment both `i` and `j`.
   - If `nums1[i] < nums2[j]`, increment `i`.
   - If `nums1[i] > nums2[j]`, increment `j`.
5. Return the `result`.

---

#### **Code Implementation_Two_Points**

```javascript
function intersection(nums1, nums2) {
  // Sort both arrays
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  const result = [];
  let i = 0,
    j = 0;

  // Traverse both arrays using two pointers
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      // Avoid adding duplicates
      if (result.length === 0 || result[result.length - 1] !== nums1[i]) {
        result.push(nums1[i]);
      }
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}
```

---

### **Example Walkthrough (Two-Pointer Approach):**

#### Example 1 (Two-Pointer Approach): `nums1 = [1, 2, 2, 1]`, `nums2 = [2, 2]`

1. Sort `nums1` and `nums2`:
   - `nums1 = [1, 1, 2, 2]`
   - `nums2 = [2, 2]`
2. Initialize `i = 0` and `j = 0`. Result: `[]`.

   - Compare `nums1[i] = 1` and `nums2[j] = 2` → Increment `i`.
   - Compare `nums1[i] = 1` and `nums2[j] = 2` → Increment `i`.
   - Compare `nums1[i] = 2` and `nums2[j] = 2` → Add `2` to `result`, increment `i` and `j`.
   - Compare `nums1[i] = 2` and `nums2[j] = 2` → Already added `2`, so skip.

3. Result: `[2]`.

---

#### **Example 2 (Two-Pointer Approach):** `nums1 = [4, 9, 5]`, `nums2 = [9, 4, 9, 8, 4]`

1. Sort `nums1` and `nums2`:
   - `nums1 = [4, 5, 9]`
   - `nums2 = [4, 4, 8, 9, 9]`
2. Initialize `i = 0` and `j = 0`. Result: `[]`.

   - Compare `nums1[i] = 4` and `nums2[j] = 4` → Add `4` to `result`, increment `i` and `j`.
   - Compare `nums1[i] = 5` and `nums2[j] = 4` → Increment `j`.
   - Compare `nums1[i] = 5` and `nums2[j] = 8` → Increment `i`.
   - Compare `nums1[i] = 9` and `nums2[j] = 8` → Increment `j`.
   - Compare `nums1[i] = 9` and `nums2[j] = 9` → Add `9` to `result`, increment `i` and `j`.

3. Result: `[4, 9]`.

---

### **Complexity Analysis (Two-Pointer Approach):**

#### **Time Complexity (Two-Pointer Approach):**

1. **Sorting:**
   - Sorting `nums1` takes O(n log n), where `n` is the length of `nums1`.
   - Sorting `nums2` takes O(m log m), where `m` is the length of `nums2`.
2. **Two-pointer traversal:**
   - Traverses both arrays once → O(n + m).

**Total Time Complexity:** O(n log n + m log m).

#### **Space Complexity (Two-Pointer Approach):**

- **Sorting:** Sorting is done in-place, so no additional space is used for sorting.
- **Result:** The result array has at most `min(n, m)` elements.

**Total Space Complexity:** O(1) (excluding the result).

---

### **When to Use This Approach**

- This approach is efficient if memory usage is critical (e.g., for very large arrays) because it avoids creating additional data structures like Sets or Maps.

---
