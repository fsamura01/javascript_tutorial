# **905. Sort Array By Parity**

## **Step 1: Problem Understanding**

The problem **"905. Sort Array By Parity"** on LeetCode requires us to reorder an array so that all even integers appear before all odd integers while maintaining any relative order within the even and odd groups.

### **Given:**

- An **array `nums`** of **non-negative** integers.

### **Output:**

- A **reordered version of `nums`** where **even numbers appear first**, followed by odd numbers.

### **Constraints:**

- `1 ≤ nums.length ≤ 5000`
- `0 ≤ nums[i] ≤ 5000`

### **Edge Cases:**

1. **All elements are even** (e.g., `[2, 4, 6]`) → Return the same array.
2. **All elements are odd** (e.g., `[1, 3, 5]`) → Return the same array.
3. **Mixed numbers** (e.g., `[3, 1, 2, 4]`) → Needs reordering.
4. **Single-element array** (e.g., `[1]` or `[2]`) → Already sorted.

---

## **Step 2: Pattern Identification**

This problem can be solved efficiently using the **Two Pointers** technique.

### **Why Two Pointers?**

- We need to rearrange elements **in-place** efficiently.
- One pointer starts from the left (looking for odd numbers).
- Another pointer starts from the right (looking for even numbers).
- Swap elements when an odd number appears before an even number.

This is an **optimal in-place sorting problem** that follows the **partitioning pattern** commonly seen in problems like **QuickSort**.

---

## **Step 3: Approach Discussion**

We will use the **Two Pointers** approach:

1. **Initialize two pointers:**

   - `left` at the start of the array (`0`).
   - `right` at the end of the array (`nums.length - 1`).

2. **Move `left` until an odd number is found.**
3. **Move `right` until an even number is found.**
4. **Swap `nums[left]` and `nums[right]`** if `left < right`.
5. **Repeat until `left >= right`**.

### **Example Walkthrough**

#### **Input:** `[3, 1, 2, 4]`

#### **Process:**

| Step | `left`  | `right`  | Swap? | Array State    |
| ---- | ------- | -------- | ----- | -------------- |
| 1    | 3 (odd) | 4 (even) | Yes   | `[4, 1, 2, 3]` |
| 2    | 1 (odd) | 2 (even) | Yes   | `[4, 2, 1, 3]` |
| 3    | 1 (odd) | 1 (odd)  | Stop  | `[4, 2, 1, 3]` |

### **Final Output:** `[4, 2, 1, 3]` (All evens first, then all odds)

---

## **Step 4: Code Implementation (JavaScript)**

```javascript
function sortArrayByParity(nums) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    // Move left forward if it's already even
    while (left < right && nums[left] % 2 === 0) {
      left++;
    }
    // Move right backward if it's already odd
    while (left < right && nums[right] % 2 === 1) {
      right--;
    }
    // Swap the misplaced odd and even numbers
    if (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  return nums;
}
```

### **Key Explanations:**

- **Two pointers (`left`, `right`)** traverse the array.
- **Inner loops** move `left` (to skip evens) and `right` (to skip odds).
- **Swap operation** ensures evens are placed before odds.
- **Terminates** when `left` meets `right`.

---

## **Step 5: Complexity Analysis**

| Aspect    | Complexity                                   |
| --------- | -------------------------------------------- |
| **Time**  | \(O(n)\) (each element checked at most once) |
| **Space** | \(O(1)\) (in-place modification)             |

### **Why?**

- **`left` and `right` traverse `nums` at most once`, so it's linear \(O(n)\).**
- **Only constant extra space is used (`O(1)`).**

---

## **Step 6: Alternative Solutions**

### **1. Using `.sort()` (Extra Space, Less Efficient)**

```javascript
function sortArrayByParity(nums) {
  return nums.sort((a, b) => (a % 2) - (b % 2));
}
```

🔴 **Drawback:** Sorting takes **\(O(n \log n)\)** time, which is **slower than Two Pointers \(O(n)\).**

---

## **Step 7: Practice Recommendations**

To strengthen your grasp of the **Two Pointers** technique, try these problems:

1. **LeetCode 283:** Move Zeroes
2. **LeetCode 26:** Remove Duplicates from Sorted Array
3. **LeetCode 27:** Remove Element
4. **LeetCode 922:** Sort Array by Parity II
5. **LeetCode 75:** Sort Colors (Dutch National Flag Problem)

---

## **Step 8: Flowchart Design**

I'll generate a **flowchart** to illustrate the process visually. Generating now... 🎨

Here is the **flowchart** illustrating the Two Pointers approach:

![Flowchart](sandbox:/mnt/data/sort_array_by_parity_flowchart.png)

This visualizes the **decision process**:

- **Move pointers** when conditions are met.
- **Swap when necessary.**
- **Stop when `left >= right`**.

Would you like a **dry-run example** or further optimizations? 🚀

### **Dry-Run Example**

Let's dry-run the function step-by-step with the input:

```js
nums = [3, 1, 2, 4];
```

#### **Initial Setup**

- `left = 0`, `right = 3`
- Array: `[3, 1, 2, 4]`

| Step | `left` (nums[left]) | `right` (nums[right]) | Condition Met?     | Action Taken | Array State    |
| ---- | ------------------- | --------------------- | ------------------ | ------------ | -------------- |
| 1    | 3 (odd)             | 4 (even)              | Swap needed        | Swap(3,4)    | `[4, 1, 2, 3]` |
| 2    | 1 (odd)             | 2 (even)              | Swap needed        | Swap(1,2)    | `[4, 2, 1, 3]` |
| 3    | 1 (odd)             | 1 (odd)               | Stop condition met | Exit loop    | `[4, 2, 1, 3]` |

### **Final Output:**

```js
[4, 2, 1, 3];
```

✅ **All evens first, all odds after**

Would you like to test with another case? 🚀
