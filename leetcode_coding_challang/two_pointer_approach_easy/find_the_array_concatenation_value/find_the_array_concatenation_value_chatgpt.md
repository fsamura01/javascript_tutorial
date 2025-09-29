# **2562. Find the Array Concatenation Value**

Let's break this down step by step to solve **LeetCode 2562: Find the Array Concatenation Value** using a structured approach.  

---

## **Step 1: Problem Understanding**  

### **Problem Statement (Simplified)**  

We are given an integer array `nums`. Our goal is to compute the **concatenation value** by following these rules:  

1. If `nums` has elements left, pick the **first** and **last** numbers, concatenate them (as a string), then convert it back to an integer.
2. Remove both the first and last numbers from `nums`, and add the concatenated value to a running sum.
3. If there is only one number left (odd-length case), just add it to the sum.
4. Repeat until `nums` is empty.  

### **Example Walkthrough**

#### **Example 1**  

📌 **Input:** `nums = [3, 4, 5, 1, 2]`  
📌 **Steps:**  

- (3,2) → "32" → `sum = 32`
- (4,1) → "41" → `sum = 32 + 41 = 73`
- (5) remains → `sum = 73 + 5 = 78`  
📌 **Output:** `78`  

#### **Example 2**  

📌 **Input:** `nums = [9, 8, 7, 6]`  
📌 **Steps:**  

- (9,6) → "96" → `sum = 96`
- (8,7) → "87" → `sum = 96 + 87 = 183`  
📌 **Output:** `183`  

### **Constraints & Edge Cases**  

- `1 ≤ nums.length ≤ 1000` → The array is small enough for an **O(N) solution**.
- `1 ≤ nums[i] ≤ 10^4` → Each number is **at most 5 digits**, so concatenation is safe.
- Edge Cases:
  - **Single Element Case:** `[5]` should return `5`.
  - **Already Sorted Numbers:** `[1, 2, 3, 4]` must still follow the first-last rule.
  - **All Same Digits:** `[11, 11, 11, 11]` should still concatenate correctly.

---

## **Step 2: Pattern Identification**  

- This problem is best approached using the **Two Pointers** technique.  
- Why? Because:
  - We need to **pick numbers from both ends** of the array.
  - Shrinking the array from both sides suggests using **two pointers**.

---

## **Step 3: Approach Discussion**  

### **Key Idea**  

We will use **two pointers**:  

- `left = 0` (points to the first element).  
- `right = nums.length - 1` (points to the last element).  

### **Steps to Solve**  

1. Initialize `sum = 0`.  
2. While `left < right`:  
   - Concatenate `nums[left]` and `nums[right]` (convert to string → back to int).  
   - Add the value to `sum`.  
   - Move `left` forward (`left++`), move `right` backward (`right--`).  
3. If one element remains (`left == right`), just add it to `sum`.  
4. Return `sum`.  

---

## **Step 4: Code Implementation (JavaScript)**

```javascript
var findTheArrayConcVal = function(nums) {
    let left = 0, right = nums.length - 1;
    let sum = 0;
    
    while (left < right) {
        // Concatenating first and last element
        let concatValue = parseInt(nums[left].toString() + nums[right].toString());
        sum += concatValue;
        left++;
        right--;
    }
    
    // If an element is left in the middle (odd length case)
    if (left === right) {
        sum += nums[left];
    }
    
    return sum;
};
```

### **Code Explanation**

✅ **`left` and `right` pointers** move towards the center.  
✅ **Concatenation** uses `toString()` and `parseInt()`.  
✅ **Handles odd-length arrays** by checking if `left === right` at the end.  

---

## **Step 5: Complexity Analysis**

### **Time Complexity:**  

- **O(N)** → We process each element **once** (half from left, half from right).  

### **Space Complexity:**  

- **O(1)** → Only uses a few extra variables (`sum`, `left`, `right`).  

---

## **Step 6: Alternative Solutions**

### **Using a Queue (Less Efficient)**

- Convert the array into a **queue (FIFO)**.
- Dequeue the first and last elements at each step.
- **Downside:** Queue operations add extra overhead.  

```javascript
var findTheArrayConcVal = function(nums) {
    let sum = 0;
    while (nums.length > 1) {
        let concatValue = parseInt(nums.shift().toString() + nums.pop().toString());
        sum += concatValue;
    }
    if (nums.length === 1) sum += nums[0];
    return sum;
};
```

**Time Complexity: O(N²)** due to `shift()` (which is O(N)), making it **inefficient**.

---

## **Step 7: Practice Recommendations**

To strengthen the **two-pointers** pattern, try these problems:

1. 🔹 [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
2. 🔹 [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
3. 🔹 [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
4. 🔹 [344. Reverse String](https://leetcode.com/problems/reverse-string/)

---

## **Step 8: Flowchart Design**

Let's create a **flowchart** for the logical steps.

Here's the **flowchart** illustrating the logical progression of the solution. This visually maps out the steps from initialization to termination.

---

## **Final Summary**

✅ **Identified the Two Pointers pattern** for efficiency.  
✅ **Implemented an O(N) solution in JavaScript** with clear logic.  
✅ **Analyzed complexity and compared alternative approaches.**  
✅ **Provided related problems to strengthen problem-solving skills.**  
✅ **Designed a flowchart** to visually reinforce understanding.

Would you like to try solving a similar problem next? 🚀
