# **189. Rotate Array**

## **Understanding the Problem**

We need to **rotate an array to the right by `k` steps**. This means that each element in the array moves `k` positions forward, and elements that go beyond the last index wrap around to the beginning.

### **Example Walkthrough**

#### Example 1

```plaintext
Input: nums = [1,2,3,4,5,6,7], k = 3
```

1. Move 7 to the first position, shift others right:
   `[7,1,2,3,4,5,6]`
2. Move 6 to the first, shift others right:
   `[6,7,1,2,3,4,5]`
3. Move 5 to the first, shift others right:
   `[5,6,7,1,2,3,4]`

#### Example 2

```plaintext
Input: nums = [-1,-100,3,99], k = 2
```

1. Rotate once: `[99,-1,-100,3]`
2. Rotate twice: `[3,99,-1,-100]`

---

### **Understanding Constraints**

| Constraint | Explanation |
|------------|-------------|
| `1 <= nums.length <= 10^5` | The array size can be large, so we need an efficient solution. |
| `-2^31 <= nums[i] <= 2^31 - 1` | Elements are within a 32-bit integer range. |
| `0 <= k <= 10^5` | `k` can be very large, so naive shifting might be too slow. |

#### **Key Observations**

- Rotating by `k` is equivalent to rotating by `k % nums.length` because rotating `n` times results in the same array.
- An in-place solution (`O(1)` extra space) is ideal.

---

## **Breaking Down the Problem**

### **Pattern Identification**

This problem falls under the **Array Manipulation** category, specifically using **Reversal Algorithm** or **Cyclic Reordering**.

---

### **Approach 1: Brute Force (Shift One by One)**

- For `k` times, shift all elements one position to the right.
- **Time Complexity:** `O(n * k)` (Too slow for large `n`)
- **Space Complexity:** `O(1)`

---

### **Approach 2: Using Extra Array (Efficient)**

- Copy elements to a new array in the correct order.
- Copy back to the original array.
- **Time Complexity:** `O(n)`
- **Space Complexity:** `O(n)`

```javascript
function rotate(nums, k) {
    let n = nums.length;
    let temp = new Array(n);
    
    for (let i = 0; i < n; i++) {
        temp[(i + k) % n] = nums[i]; 
    }
    
    for (let i = 0; i < n; i++) {
        nums[i] = temp[i];
    }
}
```

---

### **Approach 3: Reverse Technique (Optimal)**

#### **Key Idea**

1. **Reverse the whole array**.
2. **Reverse the first `k` elements**.
3. **Reverse the remaining `n-k` elements**.

#### **Example**

```plaintext
nums = [1,2,3,4,5,6,7], k = 3
Step 1: Reverse whole array → [7,6,5,4,3,2,1]
Step 2: Reverse first 3 → [5,6,7,4,3,2,1]
Step 3: Reverse last 4 → [5,6,7,1,2,3,4]
```

#### **Code Implementation**

```javascript
function rotate(nums, k) {
    k = k % nums.length; // Handle large k
    reverse(nums, 0, nums.length - 1); // Step 1
    reverse(nums, 0, k - 1);           // Step 2
    reverse(nums, k, nums.length - 1); // Step 3
}

function reverse(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap
        left++;
        right--;
    }
}
```

#### **Complexity Analysis**

- **Time Complexity:** `O(n)` (Each reversal takes `O(n)`)
- **Space Complexity:** `O(1)` (In-place)

---

## **Alternative Solutions**

### **Approach 4: Using Cyclic Replacements (Efficient, In-place)**

1. Swap elements in cycles, using a temporary variable.
2. Handle cases where `k` and `n` share common factors.

- **Time Complexity:** `O(n)`
- **Space Complexity:** `O(1)`

---

## **Flowchart**

```mermaid
graph TD;
  A[Input nums & k] --> B[Reduce k -> k % nums.length]
  B --> C[Reverse entire array]
  C --> D[Reverse first k elements]
  D --> E[Reverse last (n-k) elements]
  E --> F[Output rotated array]
```

---

## **Practice Recommendations**

### **Similar LeetCode Problems**

1. **Rotate String** → LeetCode **796**
2. **Next Permutation** → LeetCode **31**
3. **Reverse Words in a String** → LeetCode **151**
4. **Find Minimum in Rotated Sorted Array** → LeetCode **153**

---

### **Key Takeaways**

- **Identify the best approach based on constraints**.
- **Use modulo (`k % n`) to optimize large `k` values**.
- **Reversal Algorithm is a powerful technique**.
- **Be comfortable with in-place operations**.

Would you like additional examples or an explanation of another approach? 🚀
