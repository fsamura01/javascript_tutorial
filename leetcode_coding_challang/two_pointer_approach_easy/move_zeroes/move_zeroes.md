# **283. Move Zeroes**

## **Step-by-Step Solution in JavaScript:**

<!-- The goal is to move all zeros in the array to the end while
    maintaining the relative order of non-zero elements.
    This must be done **in-place** without using extra
    space for another array.
-->

---

## **Approach:**

- We'll use a two-pointer technique to solve the problem efficiently:

1. **Pointer 1 (`lastNonZeroIndex`)** will keep track of the position where the next non-zero element should go.
2. **Pointer 2 (`i`)** will iterate through the array to find non-zero elements.

---

## **Algorithm:**

1. Initialize `lastNonZeroIndex` to `0`.
2. Iterate through the array with `i`:

- If `nums[i]` is non-zero, swap `nums[i]` with `nums[lastNonZeroIndex]`, and increment `lastNonZeroIndex`.
- By the end of the iteration, all zeros will naturally shift to the end of the array.

---

## **Code Implementation:**

```javascript
function moveZeroes(nums) {
  let lastNonZeroIndex = 0;

  // Iterate over the array
  for (let i = 0; i < nums.length; i++) {
    // If the current element is non-zero, swap it with the element at lastNonZeroIndex
    if (nums[i] !== 0) {
      // Swap only if i and lastNonZeroIndex are different
      if (i !== lastNonZeroIndex) {
        [nums[lastNonZeroIndex], nums[i]] = [nums[i], nums[lastNonZeroIndex]];
      }
      lastNonZeroIndex++; // Move the index forward
    }
  }
}
```

---

## **Example Walkthrough:**

### Input: `[0, 1, 0, 3, 12]`

1. Initial state: `nums = [0, 1, 0, 3, 12]`, `lastNonZeroIndex = 0`
2. Iteration:
   - `i = 0`: `nums[i] = 0` → No action.
   - `i = 1`: `nums[i] = 1` → Swap `nums[1]` and `nums[0]` → `nums = [1, 0, 0, 3, 12]`, `lastNonZeroIndex = 1`.
   - `i = 2`: `nums[i] = 0` → No action.
   - `i = 3`: `nums[i] = 3` → Swap `nums[3]` and `nums[1]` → `nums = [1, 3, 0, 0, 12]`, `lastNonZeroIndex = 2`.
   - `i = 4`: `nums[i] = 12` → Swap `nums[4]` and `nums[2]` → `nums = [1, 3, 12, 0, 0]`, `lastNonZeroIndex = 3`.
3. Final output: `[1, 3, 12, 0, 0]`.

---

### **Complexity Analysis:**

1. **Time Complexity:**

   - The algorithm makes a single pass through the array.
   - **O(n)** where `n` is the length of the array.

2. **Space Complexity:**
   - The algorithm performs swaps in-place, using only a constant amount of extra space.
   - **O(1)**.

---

### **Additional Notes:**

- The solution minimizes the number of operations by swapping only when necessary
  (i.e., `i !== lastNonZeroIndex`).
- The relative order of the non-zero elements is maintained because we process
  elements from left to right and place them at the earliest possible position.

  The condition `i !== lastNonZeroIndex` appears in the **Move Zeroes** problem solution, where we optimize the swapping operation. Let me clarify what it does and why it's used.

---

### **Context:**

We are using the **two-pointer technique**:

- `i` iterates through the array to find **non-zero** elements.
- `lastNonZeroIndex` keeps track of where the next **non-zero** element should be placed.

**Key operation:**  
Whenever we find a non-zero number at `nums[i]`, we **swap** it with `nums[lastNonZeroIndex]` and then move `lastNonZeroIndex` forward.

---

### Why `i !== lastNonZeroIndex`?

This condition **prevents unnecessary swaps** when `i` and `lastNonZeroIndex` are already pointing to the same element.

#### **Without `i !== lastNonZeroIndex`:**

Even if `i` and `lastNonZeroIndex` are the same, the swap still occurs, which is unnecessary.

#### With **`i !== lastNonZeroIndex`:**

We **only swap when `i` is different from `lastNonZeroIndex`**, reducing redundant operations.

---

### **Example Walkthrough\_:**

#### **Input: `[0, 1, 0, 3, 12]`**

#### **Iteration steps:**

| Step | `i` | `lastNonZeroIndex` | `nums` (before swap) | Swap?           | `nums` (after swap) |
| ---- | --- | ------------------ | -------------------- | --------------- | ------------------- |
| 1    | 0   | 0                  | `[0, 1, 0, 3, 12]`   | No (0 detected) | `[0, 1, 0, 3, 12]`  |
| 2    | 1   | 0                  | `[0, 1, 0, 3, 12]`   | Yes             | `[1, 0, 0, 3, 12]`  |
| 3    | 2   | 1                  | `[1, 0, 0, 3, 12]`   | No (0 detected) | `[1, 0, 0, 3, 12]`  |
| 4    | 3   | 1                  | `[1, 0, 0, 3, 12]`   | Yes             | `[1, 3, 0, 0, 12]`  |
| 5    | 4   | 2                  | `[1, 3, 0, 0, 12]`   | Yes             | `[1, 3, 12, 0, 0]`  |

#### **Key Observation:**

- When `i = 1`, `nums[i] = 1` is swapped with `nums[lastNonZeroIndex] = 0` since `i !== lastNonZeroIndex`.
- When `i = 3`, `nums[i] = 3` is swapped with `nums[lastNonZeroIndex] = 0`.
- When `i = 4`, `nums[i] = 12` is swapped with `nums[lastNonZeroIndex] = 0`.

**However, if `i === lastNonZeroIndex`, we are already at the correct position, so swapping would be redundant.**
