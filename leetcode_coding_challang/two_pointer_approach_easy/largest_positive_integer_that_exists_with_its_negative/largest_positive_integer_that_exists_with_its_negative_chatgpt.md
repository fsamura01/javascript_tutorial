# **2441. Largest Positive Integer That Exists With Its Negative**

## **Problem Understanding** 🧐  

The problem **"2441. Largest Positive Integer That Exists With Its Negative"** asks us to find the **largest positive integer `k`** in an array where both `k` and `-k` exist in the array. If no such number exists, return `0`.  

**Example Input & Output:**  

```plaintext
Input: nums = [-1,2,-3,3]
Output: 3
```

Explanation: The numbers `3` and `-3` both exist, and `3` is the largest.  

**Constraints:**

- `1 ≤ nums.length ≤ 1000`
- `-1000 ≤ nums[i] ≤ 1000`

---

### **Pattern Identification** 🔍  

This problem fits well into the **"Hashing & Set-based Lookups"** pattern because:  

1. We need to check whether a negative counterpart of a number exists efficiently.  
2. A **set** allows O(1) average-time lookups for quick existence checks.  

---

### **Approach Discussion** 🔄  

#### **Step-by-Step Plan**  

1. **Use a Hash Set**: Store all numbers in a **set** for fast lookups.  
2. **Iterate Through the Array**: For each **positive number `k`**, check if `-k` exists in the set.  
3. **Keep Track of the Largest `k`**: Maintain a variable to track the max valid `k`.  
4. **Return the Largest Found `k` or 0** if no valid number is found.  

---

### **Code Implementation (JavaScript)** 💻  

```javascript
var findMaxK = function(nums) {
    let numSet = new Set(nums);  // Step 1: Store all numbers in a set
    let maxK = 0; // Step 3: Track largest k

    for (let num of nums) { // Step 2: Iterate through the array
        if (num > 0 && numSet.has(-num)) {  // Check if -num exists
            maxK = Math.max(maxK, num);  // Update maxK if num is larger
        }
    }

    return maxK;  // Step 4: Return result
};
```

---

### **Complexity Analysis** ⏳  

- **Time Complexity**: **O(n)**  
  - Inserting elements into a `Set` is **O(n)**.  
  - Checking for `-num` in a `Set` is **O(1)** per lookup.  
  - Overall, we do **O(n) + O(n) = O(n)** operations.  
- **Space Complexity**: **O(n)**  
  - We store all `n` elements in a `Set`, leading to **O(n)** space usage.  

---

## **Alternative Solutions & Optimizations** 🚀  

### **Sorting Approach**  

1. **Sort the array** (O(n log n)).  
2. **Use two pointers** from both ends to find the largest `k` that has `-k`.  
3. This has **O(n log n) time complexity** but avoids extra space.  

---

### **Practice Recommendations** 🎯  

To reinforce the **Hashing & Set-based Lookups** pattern, try solving these:  

1. **LeetCode 532** - *K-diff Pairs in an Array*  
2. **LeetCode 349** - *Intersection of Two Arrays*  
3. **LeetCode 217** - *Contains Duplicate*  

---

### **Flowchart** 📊  

I’ll generate a flowchart to visually illustrate the logical steps. Stay tuned! ⏳

Here's the flowchart illustrating the logical steps of our solution! 🚀 This visualizes how we store numbers in a set, iterate through them, check conditions, and update the maximum `k`. Let me know if you need further clarification. 😊

### **Alternative Solutions & Optimizations 🚀**  

While the **hash set approach (O(n) time, O(n) space)** is optimal for this problem, let's explore other potential solutions:  

---

## **1️⃣ Sorting + Two Pointers Approach (O(n log n) time, O(1) space)**

### **Idea:**  

1. **Sort the array** in ascending order.  
2. **Use two pointers**:  
   - One pointer (`left`) starts at the beginning.  
   - The other pointer (`right`) starts at the end.  
3. **Move the pointers** to find the largest `k` where both `k` and `-k` exist.  

### **Implementation (JavaScript) - Hash Set Approach**

```javascript
var findMaxK = function(nums) {
    nums.sort((a, b) => a - b);  // Step 1: Sort the array
    let left = 0, right = nums.length - 1;

    while (left < right) {  // Step 2: Use two pointers
        if (nums[right] === -nums[left]) {
            return nums[right];  // Largest k found
        } 
        if (-nums[left] > nums[right]) left++;  
        else right--;  
    }

    return 0; // No valid k found
};
```

### **Complexity Analysis for Hash Set Approach**

- **Sorting takes O(n log n)**
- **Two-pointer search takes O(n)**
- **Overall Complexity: O(n log n) time, O(1) space**  
✔ **Pros:** No extra space used.  
❌ **Cons:** Sorting increases runtime compared to the hash set approach.

---

## **2️⃣ Brute Force (O(n²) time, O(1) space)**

### **Sorting Approach Idea:**

1. Iterate through all pairs `(nums[i], nums[j])`.  
2. If `nums[i] = -nums[j]`, update `maxK`.  

### **Implementation (JavaScript)**

```javascript
var findMaxK = function(nums) {
    let maxK = 0;

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === -nums[j]) {
                maxK = Math.max(maxK, Math.abs(nums[i]));
            }
        }
    }

    return maxK;
};
```

### **Complexity Analysis**

- **Nested loops → O(n²) time complexity**
- **O(1) space since no extra data structures are used**
✔ **Pros:** Simple to implement.  
❌ **Cons:** **Inefficient for large inputs**.  

---

## **Which Solution is Best? 🏆**

| Approach | Time Complexity | Space Complexity | Notes |
|----------|---------------|----------------|------|
| **Hash Set (Best Choice)** | O(n) | O(n) | Fastest lookups, simple logic |
| **Sorting + Two Pointers** | O(n log n) | O(1) | Saves space but slower due to sorting |
| **Brute Force** | O(n²) | O(1) | Too slow for large `n` |

### **Final Recommendation:**

- **Use Hash Set for optimal efficiency (O(n)).**
- **Use Sorting + Two Pointers if reducing space is necessary (O(n log n)).**
- **Avoid Brute Force unless constraints are very small (`n ≤ 100`).**

Would you like additional variations, like a bitwise or mathematical approach? 😊
