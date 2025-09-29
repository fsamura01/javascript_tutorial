# **2824. Count Pairs Whose Sum is Less than Target**

## **Step 1: Problem Understanding**

The LeetCode problem **"2824. Count Pairs Whose Sum is Less than Target"** requires us to find the number of valid pairs `(i, j)` in an array such that:  

- `nums[i] + nums[j] < target`
- `i < j` (i.e., only considering distinct pairs where `i` comes before `j`)

### **Constraints & Edge Cases**

- The array can contain both positive and negative numbers.
- The array is not necessarily sorted.
- The size of the array (let’s assume `n`) is small enough to allow `O(n^2)` solutions in some cases.
- If the array has fewer than 2 elements, return `0` because no pairs can be formed.

---

## **Step 2: Pattern Identification**

The problem is a classic **"counting pairs with a sum constraint"** problem. The most efficient approach is often **Two Pointers** when the array is sorted.  

- **Why Two Pointers?**  
  - Sorting the array allows us to efficiently check valid pairs using a left and right pointer.
  - Instead of checking every pair (brute-force `O(n^2)`), we can smartly eliminate multiple possibilities at once.

---

## **Step 3: Approach Discussion**

We have two main approaches:

### **Brute-Force Approach (`O(n^2)`)**

1. Use **two nested loops** to check all possible pairs.
2. Count the pairs where `nums[i] + nums[j] < target`.

**Drawback:** This is inefficient for large `n`, as it runs in **O(n²) time**.

### **Optimized Approach: Two Pointers (`O(n log n)`)**

1. **Sort** the array first (`O(n log n)`).
2. Use **two pointers**:
   - Left pointer (`l`) at the start.
   - Right pointer (`r`) at the end.
3. If `nums[l] + nums[r] < target`, all pairs `(l, l+1), (l, l+2), ..., (l, r)` are valid.
   - Increment `count` by `(r - l)`.
   - Move `l` forward.
4. Otherwise, move `r` backward.

---

## **Step 4: Code Implementation (JavaScript)**

Here’s the **optimized two-pointer solution** in JavaScript:

```javascript
var countPairs = function(nums, target) {
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);

    let count = 0;
    let left = 0, right = nums.length - 1;

    // Step 2: Use two pointers to find valid pairs
    while (left < right) {
        if (nums[left] + nums[right] < target) {
            count += (right - left); // All pairs between left and right are valid
            left++; // Move left pointer forward
        } else {
            right--; // Decrease right pointer
        }
    }

    return count;
};
```

---

## **Step 5: Complexity Analysis**

- **Sorting Step:** `O(n log n)`
- **Two-Pointer Traversal:** `O(n)`
- **Overall Complexity:** **`O(n log n)`** (due to sorting)

**Space Complexity:**  

- Sorting might require `O(log n)` auxiliary space (depending on the sorting algorithm), but the solution itself runs in **O(1) extra space**.

---

## **Step 6: Alternative Solutions**

### **Brute Force Approach (`O(n^2)`)**

```javascript
var countPairs = function(nums, target) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] < target) {
                count++;
            }
        }
    }
    return count;
};
```

- **Time Complexity:** `O(n^2)`
- **Space Complexity:** `O(1)`

### **Alternative Optimization: Binary Search**

- Instead of using a two-pointer approach, we can use **binary search** for each `nums[i]` to find the largest `nums[j]` such that `nums[i] + nums[j] < target`.
- This gives us a complexity of `O(n log n)` (sorting) + `O(n log n)` (binary searching each `i`), which is still `O(n log n)` overall.

---

## **Step 7: Practice Recommendations**

If you want to strengthen your understanding of **two pointers**, try these similar LeetCode problems:

1. **167. Two Sum II - Input Array Is Sorted** (`two pointers`)
2. **923. 3Sum With Multiplicity** (`sorting + two pointers`)
3. **259. 3Sum Smaller** (`similar logic but with three numbers`)
4. **16. 3Sum Closest** (`two pointers with closest sum`)

---

## **Step 8: Flowchart Design**

Below is a flowchart that visually represents the **Two Pointers Approach**:

```javascript
            START
              |
      Sort the array (O(n log n))
              |
   Initialize left (l) = 0, right (r) = n-1
              |
          While l < r:
         /         \
      Yes           No
(nums[l] + nums[r] < target?)
      |                |
 Add (r - l) to count  Decrement r
      |                |
 Increment l           |
      \______Both Pointers Meet______/
              |
            RETURN count
              |
             END
```

---

## **Final Takeaway**

- **Recognizing the Pattern**: This is a classic **two-pointer** problem, where sorting enables a more efficient approach.
- **Why Sorting Helps?** It allows us to quickly determine valid pairs by eliminating large chunks in a single step.
- **Alternative Approaches**: We considered **brute-force**, **binary search**, and **two pointers**, with **two pointers** being the best for efficiency.

Would you like a **visual representation in JavaScript** for practicing, like a UI-based counter that shows step-by-step execution? 🚀
