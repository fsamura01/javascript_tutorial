# 🚀 Solving **LeetCode 2465: Number of Distinct Averages** 🚀  

We'll go through the structured approach you suggested, ensuring that we deeply understand the problem and its solution strategy.

---

## **1️⃣ Problem Understanding**  

### **Problem Statement:**  

You are given an array of **even length** consisting of integers. You repeatedly **pick the smallest and largest numbers, compute their average**, and store it. The task is to find how many **distinct** averages are possible.  

### **Example Walkthrough:**  

**Input:** `[4,1,4,0,3,5]`  

- Sorted: `[0,1,3,4,4,5]`
- Pairing smallest & largest:
  - `(0,5) → avg = (0+5)/2 = 2.5`
  - `(1,4) → avg = (1+4)/2 = 2.5`
  - `(3,4) → avg = (3+4)/2 = 3.5`
- Distinct Averages: `{2.5, 3.5}`
  
**Output:** `2`

### **Constraints & Edge Cases**

- `nums.length` is even.
- `1 ≤ nums[i] ≤ 100`.
- Handling of duplicate numbers.
- Handling minimum and maximum pairs correctly.

---

## **2️⃣ Pattern Identification**  

This problem suggests a **sorting & two-pointer** approach:

- **Sorting ensures** the smallest and largest values are easy to pick.
- **Two-pointer technique** allows us to efficiently pair elements without extra space complexity.
- **Set usage** helps in storing unique averages.

Thus, the best algorithmic pattern to apply is **Sorting + Two Pointers + HashSet**.

---

## **3️⃣ Approach Discussion**

1. **Sort** the array → Guarantees that smallest and largest numbers are at predictable positions.
2. **Use two pointers** (`left = 0, right = n-1`) to iterate towards the center.
3. **Compute averages** using `(nums[left] + nums[right]) / 2`.
4. **Store the averages** in a `Set` to track distinct values.
5. **Return the size** of the `Set` at the end.

---

## **4️⃣ Code Implementation (JavaScript)**

```javascript
var distinctAverages = function(nums) {
    nums.sort((a, b) => a - b); // Step 1: Sort the array
    let left = 0, right = nums.length - 1;
    let uniqueAverages = new Set();

    while (left < right) {
        let avg = (nums[left] + nums[right]) / 2;
        uniqueAverages.add(avg);
        left++;   // Move left pointer forward
        right--;  // Move right pointer backward
    }

    return uniqueAverages.size;
};
```

### **Key Code Insights**

- **Sorting:** `O(n log n)` cost but simplifies pairing.
- **Two Pointers:** Efficient way to extract min/max pairs.
- **Set for uniqueness:** Prevents duplicate averages.

---

## **5️⃣ Complexity Analysis**

- **Sorting Step:** `O(n log n)`
- **Two-Pointer Traversal:** `O(n)`
- **Set Insertions:** `O(n)`
- **Overall Complexity:**  
  - **Time:** `O(n log n)` (dominated by sorting).
  - **Space:** `O(n)` (for the `Set` storing averages).

---

## **6️⃣ Alternative Solutions & Optimizations**

### **Using a Frequency Array (O(n))**

Since `1 ≤ nums[i] ≤ 100`, we can use **bucket counting** instead of sorting:

1. Count occurrences using a frequency array.
2. Iterate over the bucket from `1 to 100` and use two pointers to get min/max pairs.

This avoids sorting, reducing the **time complexity to O(n)**.

---

## **7️⃣ Practice Recommendations**

Here are similar **two-pointer + sorting** problems:

1. **LeetCode 167:** Two Sum II - Input Array is Sorted
2. **LeetCode 283:** Move Zeroes
3. **LeetCode 977:** Squares of a Sorted Array
4. **LeetCode 15:** 3Sum (Advanced two-pointer problem)

---

## **8️⃣ Flowchart Representation**

Let's visualize the algorithm with a **flowchart** for better clarity. Generating it now... 🖥️📊

It looks like my attempt to generate the flowchart took too long. Let me retry with a more optimized approach.

Here is the **flowchart representation** of the solution:

1. **Start**  
2. **Sort the array**  
3. **Initialize** two pointers (`left = 0`, `right = n-1`) and an empty Set  
4. **Loop while** `left < right`:  
   - Compute the **average** of `nums[left]` and `nums[right]`  
   - **Store the average** in the Set  
   - Move pointers (`left++`, `right--`)  
5. **Return the size** of the Set  
6. **End**  

This visually explains the algorithm’s logical progression! 🎯

Would you like me to generate another example walkthrough for better understanding? 🚀
