# **LeetCode 2460: Apply Operations to an Array**

---

## **1️⃣ Problem Understanding**

The problem statement asks us to process an array using the following rules:

1. If two consecutive elements are **equal**, we double the first one and set the second to **zero**.
2. After applying this operation to the entire array from left to right, **shift all nonzero elements to the left** while preserving their relative order.
3. Return the modified array.

### **Example Walkthrough**

**Input:**  
`nums = [1,2,2,1,1,0]`

1. Apply the operation:  
   - `nums[1] == nums[2]`, so `nums[1] = 4`, `nums[2] = 0`
   - `nums[3] == nums[4]`, so `nums[3] = 2`, `nums[4] = 0`

   Intermediate state: `[1,4,0,2,0,0]`

2. Shift nonzero elements left:  
   - Result: `[1, 4, 2, 0, 0, 0]`

### **Edge Cases to Consider**

- **All zeros:** `[0, 0, 0] → [0, 0, 0]`
- **No adjacent equal elements:** `[1, 2, 3] → [1, 2, 3]`
- **Already sorted:** `[2, 2, 4, 4] → [4, 0, 8, 0] → [4, 8, 0, 0]`

---

### **2️⃣ Pattern Identification**

This problem follows a **"Two-Pass Processing" + "In-Place Modification"** pattern:

1. **First pass**: Modify the array in-place (merging adjacent equal elements).
2. **Second pass**: Shift nonzero elements to the left.

Common patterns used here:

- **In-place array transformation** (without extra space)
- **Two-pointer technique** (for shifting elements efficiently)

---

### **3️⃣ Approach Discussion**

We will implement the solution in **two passes**:

#### **Step 1: Apply the operation**

- Traverse `nums` from left to right.
- If `nums[i] == nums[i+1]`, update `nums[i] = 2 * nums[i]`, and set `nums[i+1] = 0`.

#### **Step 2: Shift nonzero elements**

- Use the **two-pointer technique**:
  - Pointer `j` keeps track of the position to insert the next nonzero element.
  - Iterate through `nums`, moving nonzero values forward.
  - Fill remaining positions with `0`.

---

### **4️⃣ Code Implementation (JavaScript)**

```javascript
var applyOperations = function(nums) {
    let n = nums.length;

    // Step 1: Apply the operation to double values and set second to zero
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums[i] *= 2;
            nums[i + 1] = 0;
        }
    }

    // Step 2: Move non-zero values forward
    let j = 0; // Position for the next nonzero element
    for (let i = 0; i < n; i++) {
        if (nums[i] !== 0) {
            nums[j++] = nums[i]; // Place nonzero number at position j and increment j
        }
    }

    // Fill remaining elements with 0
    while (j < n) {
        nums[j++] = 0;
    }

    return nums;
};
```

### **5️⃣ Complexity Analysis**

- **Step 1 (Merging adjacent elements)**: \(O(n)\)
- **Step 2 (Shifting nonzero elements)**: \(O(n)\)
- **Overall Complexity**: **\(O(n)\)** (single pass per step)
- **Space Complexity**: **\(O(1)\)** (modifies the array in place)

---

### **6️⃣ Alternative Solutions**

#### **Using Extra Space (`O(n)` Space)**

Instead of modifying in place, we can use a **new array** to store nonzero elements, then fill remaining spots with `0`:

```javascript
var applyOperations = function(nums) {
    let n = nums.length;
    let result = new Array(n).fill(0);
    let idx = 0;

    // Apply operation
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums[i] *= 2;
            nums[i + 1] = 0;
        }
    }

    // Store nonzero elements in result array
    for (let num of nums) {
        if (num !== 0) {
            result[idx++] = num;
        }
    }

    return result;
};
```

- This avoids modifying `nums` directly but uses \(O(n)\) extra space.

---

### **7️⃣ Practice Recommendations**

To reinforce the **Two-Pointer & In-Place Transformation** pattern, try these:

- **LeetCode 283. Move Zeroes** ⭐ ([Easy] → Very similar shifting step)
- **LeetCode 1089. Duplicate Zeros** (In-place shifting modification)
- **LeetCode 26. Remove Duplicates from Sorted Array** (In-place modification)
- **LeetCode 905. Sort Array By Parity** (Reordering elements efficiently)

---

### **8️⃣ Flowchart Design**

Here's a **visual representation** of the algorithm:

1️⃣ **Apply Operations**  
   **(Traverse & Merge Adjacent Duplicates)**  
   ⬇  
2️⃣ **Shift Non-Zero Elements Left**  
   **(Using Two Pointers)**  
   ⬇  
3️⃣ **Fill Remaining Positions with Zeros**  

I'll generate a **flowchart** to depict this visually. Give me a moment.

Here is the **flowchart** that visually represents the steps of the solution! 🚀

---

### **Final Takeaways**

- **Recognized the pattern**: **Two-Pointer & In-Place Modification**
- **Optimized the approach**: O(n) time and O(1) space
- **Reinforced learning** with related problems & visual flow

Would you like me to tweak the explanation or add another example? 😊
