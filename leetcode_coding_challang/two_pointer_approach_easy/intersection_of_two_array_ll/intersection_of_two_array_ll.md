# **350. Intersection of Two Arrays II**

To solve **350. Intersection of Two Arrays II**, we need to account
for the frequency of elements in both arrays and include elements in the
output as many times as they appear in both arrays. Here's a structured solution:

---

## **Step-by-Step Solution**

---

### **1. Understand the Problem and Constraints**

- **Input**:
  - Two integer arrays `nums1` and `nums2`.
- **Output**:
  - An array containing the intersection of the two arrays, where elements appear as many times as they appear in both arrays.
- **Constraints**:
  - Array lengths: \(1 \leq \text{nums1.length}, \text{nums2.length} \leq 1000\).
  - Values: \(0 \leq \text{nums1}[i], \text{nums2}[i] \leq 1000\).

---

### **2. Key Observations**

- Since the constraints allow for up to 1000 elements in each array,
  a solution with \(O(n + m)\) or \(O(n \log n + m \log m)\) is feasible.
- To handle repeated elements:
  - Count the frequency of elements in one array using a hash map.
  - Check these frequencies while iterating over the other array.

---

### **3. High-Level Plan**

1. Use a hash map to count the occurrences of elements in `nums1`.
2. Iterate through `nums2`, and for each element, check if it exists in the hash map with a non-zero count.
3. If it exists, add the element to the result and decrease its count in the hash map.
4. Return the result.

---

### **4. Implementation (Hash Map Approach)**

```javascript
function intersect(nums1, nums2) {
  // Step 1: Create a frequency map for nums1
  const countMap = {};
  for (const num of nums1) {
    countMap[num] = (countMap[num] || 0) + 1;
  }

  // Step 2: Find the intersection
  const result = [];
  for (const num of nums2) {
    if (countMap[num] > 0) {
      result.push(num); // Add to the result
      countMap[num]--; // Decrease the count
    }
  }

  return result;
}
```

---

### **Example Execution**

#### **Example 1:**

```javascript
const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
console.log(intersect(nums1, nums2)); // Output: [2, 2]
```

##### **Steps:(Hash base approach)**

1. Build `countMap` for `nums1`: `{1: 2, 2: 2}`.
2. Iterate over `nums2`:
   - `2` exists in `countMap` → Add `2` to result → Decrease count: `{1: 2, 2: 1}`.
   - `2` exists in `countMap` → Add `2` to result → Decrease count: `{1: 2, 2: 0}`.
3. Output: `[2, 2]`.

#### **Example 2:**

```javascript
const nums1 = [4, 9, 5];
const nums2 = [9, 4, 9, 8, 4];
console.log(intersect(nums1, nums2)); // Output: [4, 9] or [9, 4]
```

##### **Steps: (Hash base approach)**

1. Build `countMap` for `nums1`: `{4: 1, 9: 1, 5: 1}`.
2. Iterate over `nums2`:
   - `9` exists in `countMap` → Add `9` to result → Decrease count: `{4: 1, 9: 0, 5: 1}`.
   - `4` exists in `countMap` → Add `4` to result → Decrease count: `{4: 0, 9: 0, 5: 1}`.
3. Output: `[9, 4]`.

---

#### **Complexity Analysis**

1. **Time Complexity**:

   - Constructing the hash map: \(O(n_1)\), where \(n_1\) is the length of `nums1`.
   - Iterating through `nums2`: \(O(n_2)\), where \(n_2\) is the length of `nums2`.
   - Total: \(O(n_1 + n_2)\).

2. **Space Complexity**:
   - Hash map for `nums1`: \(O(n_1)\).
   - Result array: \(O(\min(n_1, n_2))\).
   - Total: \(O(n_1 + \min(n_1, n_2))\).

---

### **Follow-Up Questions**

---

#### **1. What if the given array is already sorted?**

If the arrays are sorted, we can use the **two-pointer technique** instead of a hash map.

##### **Steps for Two-Pointer Solution**

1. Sort both arrays (if not already sorted).
2. Use two pointers, `i` for `nums1` and `j` for `nums2`.
3. Compare elements:
   - If `nums1[i] === nums2[j]`, add the element to the result and increment both pointers.
   - If `nums1[i] < nums2[j]`, increment `i`.
   - If `nums1[i] > nums2[j]`, increment `j`.
4. Stop when either pointer reaches the end of its array.

##### **Code**

```javascript
function intersect(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  const result = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      result.push(nums1[i]);
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

##### **Time Complexity**: \(O(n_1 \log n_1 + n_2 \log n_2)\) for sorting, \(O(n_1 + n_2)\) for two-pointer traversal

##### **Space Complexity**: \(O(\min(n_1, n_2))\) for the result

---

#### **2. What if `nums1` is small compared to `nums2`?**

If `nums1` is much smaller than `nums2`, use the hash map for `nums1` and iterate through `nums2`. This ensures we minimize the size of the hash map.

---

#### **3. What if `nums2` is stored on disk?**

If `nums2` is too large to load into memory:

- Stream `nums2` in chunks.
- Use the hash map for `nums1` (since it's smaller and fits in memory).
- Process each chunk of `nums2` and compute the intersection with the hash map.

This approach ensures memory efficiency by processing `nums2` incrementally.
