# **1346. Check If N and Its Double Exist**

Let's break this problem down step by step. 🚀

---

## **Step 1: Problem Understanding**

### 📜 Problem Statement

Given an integer array `arr`, check if there exists two indices `i` and `j` such that:

- `i != j`
- `arr[i] == 2 * arr[j]`

Return `true` if such a pair exists; otherwise, return `false`.

### 🔍 Constraints & Edge Cases

- `2 <= arr.length <= 500`
- `-10^3 <= arr[i] <= 10^3`
- The array can contain positive, negative, and zero values.
- There may be duplicate values.
- Special edge cases:
  - If `arr` contains `0`, there must be **at least two zeros** to satisfy `arr[i] == 2 * arr[j]`.
  - Negative numbers must be handled correctly.

---

## **Step 2: Pattern Identification**

This problem requires checking if any number in `arr` has its double also present.

### 🎯 **Best Algorithmic Pattern:**

✅ **Hashing (Set-based Lookup)**

- Using a **hash set** (`Set` in JavaScript) allows **O(1) lookup time** for checking whether `2 * num` or `num / 2` exists.
- Since the problem asks about existence, we don’t need sorting or complex structures.

---

## **Step 3: Approach Discussion**

### 🔹 **Efficient Approach using Hash Set**

1. **Create a Hash Set** to store numbers we have seen so far.
2. **Iterate through the array**:
   - If `2 * num` **OR** `num / 2` (if divisible) exists in the set → Return `true`.
   - Otherwise, store `num` in the set.
3. **Return `false`** if no valid pair is found.

---

## **Step 4: Code Implementation** (JavaScript)

```javascript
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  let seen = new Set(); // Create a hash set for fast lookups

  for (let num of arr) {
    // Check if 2*num or num/2 (if even) exists in the set
    if (seen.has(2 * num) || (  && seen.has(num / 2))) {
      return true;
    }
    seen.add(num); // Add current number to the set
  }

  return false; // If no pair found
};
```

### **🔑 Key Takeaways from the Code:**

- **Hash Set (`Set`) for `O(1)` lookups**.
- **Handles both positive and negative numbers**.
- **Directly checks for `2 * num` and `num / 2` in one pass**.

---

## **Step 5: Complexity Analysis**

| Factor               | Complexity                                 |
| -------------------- | ------------------------------------------ |
| **Time Complexity**  | **O(N)** (single pass with `O(1)` lookups) |
| **Space Complexity** | **O(N)** (for the hash set)                |

---

## **Step 6: Alternative Approaches**

### 🔹 **Sorting + Binary Search (O(N log N))**

- **Sort the array**.
- Iterate through `arr`, for each `num`, perform **binary search** for `2 * num`.
- **Downside:** Slower than Hash Set.

### 🔹 **Brute Force (O(N²))**

- Nested loops to check all pairs.
- **Downside:** **Too slow** for larger inputs.

---

## **Step 7: Practice Recommendations**

Solve these problems to strengthen your hashing skills:

1. **LeetCode 1:** [Two Sum](https://leetcode.com/problems/two-sum/)
2. **LeetCode 653:** [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/)
3. **LeetCode 219:** [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)
4. **LeetCode 202:** [Happy Number](https://leetcode.com/problems/happy-number/)

---

## **Step 8: Flowchart Design**

Now, let's generate a **flowchart** that visually represents our approach.

Here's the **flowchart** representing our approach:

![Flowchart](sandbox:/mnt/data/flowchart.png)

This flowchart visually maps the logical steps of our **Hash Set-based solution** to check if `N` and its double exist efficiently.

Would you like me to further clarify any part? 🚀
