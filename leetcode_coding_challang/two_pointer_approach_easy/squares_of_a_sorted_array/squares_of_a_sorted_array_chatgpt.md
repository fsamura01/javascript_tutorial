# **977. Squares of a Sorted Array**

## 🚀 Solving **LeetCode 977: Squares of a Sorted Array** 🚀

We'll break this down step by step, covering problem understanding, pattern identification, approach discussion, code implementation, complexity analysis, alternative solutions, and practice recommendations.

---

## **1️⃣ Problem Understanding**

### **Problem Statement (Simplified)**

- You are given a **sorted array** of integers (in non-decreasing order).
- Some numbers may be negative.
- Square each number and return a new **sorted** array.

### **Example**

#### **Input:**

```js
nums = [-4, -1, 0, 3, 10];
```

#### **Processing:**

- Square each element → `[16, 1, 0, 9, 100]`
- Sort the squared values → `[0, 1, 9, 16, 100]`

#### **Output:**

```js
[0, 1, 9, 16, 100];
```

### **Constraints**

- The input array is sorted.
- The array contains both positive and negative numbers.
- The array length is **1 ≤ n ≤ 10⁴**.
- Values are within `-10⁴ ≤ nums[i] ≤ 10⁴`.

### **Edge Cases to Consider**

✅ Only positive numbers (e.g., `[1, 2, 3] → [1, 4, 9]`)  
✅ Only negative numbers (e.g., `[-3, -2, -1] → [1, 4, 9]`)  
✅ Includes zeros (e.g., `[-2, 0, 2] → [0, 4, 4]`)  
✅ Single element (e.g., `[5] → [25]`)

---

## **2️⃣ Pattern Identification: Two-Pointer Technique**

### **Why Two Pointers?**

- The input array is **already sorted**, but **negative numbers become positive when squared**.
- The **largest squared values** will come from either **the leftmost negative number** or **the rightmost positive number**.
- We can use **two pointers**:
  - One at the **start** (leftmost negative number).
  - One at the **end** (largest positive number).
  - Compare squares and place the **largest** at the end of the output array.

📌 This avoids sorting after squaring, making it **O(n) instead of O(n log n)**.

---

## **3️⃣ Approach Discussion (Two-Pointer Solution)**

### **Step-by-Step Plan**

1. **Initialize Two Pointers:**

   - `left = 0` (beginning of the array)
   - `right = n - 1` (end of the array)
   - `result = []` (to store squared numbers)

2. **Iterate from the Back to Fill the Result Array:**

   - Compare `nums[left]²` and `nums[right]²`.
   - Whichever is larger, place it at the **last position** of `result[]`.
   - Move the corresponding pointer.

3. **Repeat Until All Elements Are Processed.**

📌 **Key Insight**: We **fill the result array from right to left**, as we are comparing largest squares first.

---

## **4️⃣ Code Implementation (JavaScript)**

```javascript
var sortedSquares = function (nums) {
  let left = 0,
    right = nums.length - 1;
  let result = new Array(nums.length);
  let index = nums.length - 1; // Start filling from last position

  while (left <= right) {
    let leftSquare = nums[left] * nums[left];
    let rightSquare = nums[right] * nums[right];

    if (leftSquare > rightSquare) {
      result[index] = leftSquare;
      left++; // Move left pointer
    } else {
      result[index] = rightSquare;
      right--; // Move right pointer
    }

    index--; // Move to the next position in result array
  }

  return result;
};
```

### **🔍 Explanation of Key Steps**

1. **Initialize** two pointers: `left = 0`, `right = nums.length - 1`.
2. **Loop while `left <= right`**:
   - Compare `nums[left]²` and `nums[right]²`.
   - Place the **largest square** at `result[index]`.
   - Move the respective pointer.
   - Decrease `index` (filling the array from the end).
3. **Return `result[]`**, which is already sorted.

---

## **5️⃣ Complexity Analysis**

### **Time Complexity: `O(n)`**

- We traverse the array once (`O(n)`).
- No extra sorting is required (`O(n log n)` avoided).

### **Space Complexity: `O(n)`**

- We use an additional `result[]` array of size `n`.

---

## **6️⃣ Alternative Solutions**

### **Brute Force Approach (Sorting After Squaring)**

#### **Steps:**

1. Square each element: `nums[i] = nums[i] * nums[i]`
2. Sort the array.
3. Return the sorted result.

```javascript
var sortedSquares = function (nums) {
  return nums.map((x) => x * x).sort((a, b) => a - b);
};
```

✅ **Simpler to write**  
❌ **Less efficient** (O(n log n) due to sorting)

---

## **7️⃣ Practice Recommendations (Similar Problems)**

📝 **Problems to solidify Two-Pointer Approach:**

1. **LeetCode 189: Rotate Array** (Shifting elements efficiently)
2. **LeetCode 283: Move Zeroes** (Placing elements in order)
3. **LeetCode 167: Two Sum II - Input Array Is Sorted** (Finding a pair efficiently)
4. **LeetCode 15: 3Sum** (Multiple pointers technique)

---

## **8️⃣ Flowchart Design**

A flowchart visually representing the two-pointer approach. Let's generate it! 🚀

Here's the flowchart illustrating the **two-pointer approach** for solving the problem:

![Flowchart](sandbox:/mnt/data/sorted_squares_flowchart.png)

This visually represents the **step-by-step** process, from initialization to returning the sorted squared array.

---

### **🎯 Summary**

✅ **Pattern Used:** **Two-Pointer Technique**  
✅ **Optimal Time Complexity:** `O(n)`  
✅ **Space Complexity:** `O(n)` (for result array)  
✅ **Alternative Approaches:** Sorting after squaring (O(n log n))  
✅ **Practice Problems:** **Move Zeroes, Two Sum II, 3Sum**

Would you like to extend this solution to another related problem? 🚀
