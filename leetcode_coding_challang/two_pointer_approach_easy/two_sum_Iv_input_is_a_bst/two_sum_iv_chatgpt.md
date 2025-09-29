# **653. Two Sum IV - Input is a BST**

## **Step-by-Step Solution in JavaScript**

---

### **Understanding the Problem**

We need to find **two elements** in a **Binary Search Tree (BST)** whose sum equals `k`.  
A BST has the following properties:

- **Left subtree** contains nodes **smaller** than the root.
- **Right subtree** contains nodes **greater** than the root.
- **Inorder traversal** of a BST gives a **sorted array**.

The key insight is that this problem is similar to the **Two Sum problem**, but instead of an array, we are given a **BST**.

---

## **Approach 1: Using a Hash Set (Efficient)**

### **Pattern: Hashing for Quick Lookup (Similar to Two Sum Problem)**

We traverse the BST and store each **node's value** in a **set**.  
For each node, we check if **`k - node.val`** exists in the set.  
If found, return `true`. Otherwise, keep adding values to the set.

### **Steps**

1. **Use DFS (Depth-First Search)** to traverse the BST.
2. **Use a Hash Set** to store visited node values.
3. **Check if `k - node.val` exists** in the set.
4. If yes, return `true`. If no, continue traversal.
5. If traversal completes without finding a pair, return `false`.

### **Implementation of Approach 1**

```javascript
var findTarget = function (root, k) {
  let seen = new Set();

  function dfs(node) {
    if (!node) return false;
    if (seen.has(k - node.val)) return true; // Check complement
    seen.add(node.val); // Store current value
    return dfs(node.left) || dfs(node.right); // Continue search
  }

  return dfs(root);
};

// Example Usage
let root = {
  val: 5,
  left: {
    val: 3,
    left: { val: 2, left: null, right: null },
    right: { val: 4, left: null, right: null },
  },
  right: {
    val: 6,
    left: null,
    right: { val: 7, left: null, right: null },
  },
};

console.log(findTarget(root, 9)); // Output: true
console.log(findTarget(root, 28)); // Output: false
```

---

### **Complexity Analysis for Hash Set Approach**

- **Time Complexity:** \( O(n) \)
  - We traverse all `n` nodes once (`O(n)`).
  - Hash Set operations (`add` and `has`) are \( O(1) \).
- **Space Complexity:** \( O(n) \) (due to recursion and storing values in the Hash Set).

This approach is efficient for unbalanced and balanced BSTs.

---

## **Approach 2: Inorder Traversal + Two-Pointer Technique**

### **Pattern: Convert BST to Sorted Array + Two Sum**

Since an **inorder traversal** of a BST gives a **sorted array**, we can:

1. Perform an **inorder traversal** to convert BST → Sorted Array.
2. Apply the **Two Sum (Two Pointers) approach**:
   - Use **left & right pointers**.
   - If `nums[left] + nums[right] > k`, move `right--`.
   - If `nums[left] + nums[right] < k`, move `left++`.
   - If `nums[left] + nums[right] == k`, return `true`.

### **Implementation of Approach 2**

```javascript
var findTarget = function (root, k) {
  let nums = [];

  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    nums.push(node.val); // Store values in sorted order
    inorder(node.right);
  }

  inorder(root); // Convert BST to sorted array

  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === k) return true;
    else if (sum < k) left++;
    else right--;
  }

  return false;
};

// Example Usage
console.log(findTarget(root, 9)); // Output: true
console.log(findTarget(root, 28)); // Output: false
```

---

### **Complexity Analysis for BST Iterative Two-Pointer Approach**

- **Time Complexity:** \( O(n) \)
  - Inorder traversal takes \( O(n) \).
  - Two-pointer search takes \( O(n) \).
- **Space Complexity:** \( O(n) \)
  - **Extra space required for sorted array storage**.

✅ **Best suited when BST is balanced** since traversal is efficient.

---

## **Approach 3: BST Iterative Two-Pointer (O(1) Extra Space)**

### **Pattern: Two Iterators (Smallest & Largest)**

Instead of storing elements in an array, use **two BST iterators**:

1. **Left iterator (`nextSmallest`)** → Retrieves elements in ascending order.
2. **Right iterator (`nextLargest`)** → Retrieves elements in descending order.
3. Use **two-pointer technique** on iterators.

### **Implementation**

```javascript
var findTarget = function (root, k) {
  function getNext(stack, isLeft) {
    let node = stack.pop();
    let curr = node.right; // Move right for next largest
    if (!isLeft) curr = node.left; // Move left for next smallest
    while (curr) {
      stack.push(curr);
      curr = isLeft ? curr.left : curr.right;
    }
    return node.val;
  }

  let leftStack = [],
    rightStack = [],
    node = root;
  while (node) {
    leftStack.push(node);
    node = node.left;
  } // Init left stack
  node = root;
  while (node) {
    rightStack.push(node);
    node = node.right;
  } // Init right stack

  let left = getNext(leftStack, true);
  let right = getNext(rightStack, false);

  while (left < right) {
    let sum = left + right;
    if (sum === k) return true;
    else if (sum < k) left = getNext(leftStack, true);
    else right = getNext(rightStack, false);
  }

  return false;
};
```

---

### **Complexity Analysis**

- **Time Complexity:** \( O(n) \) in the worst case (unbalanced BST).
- **Space Complexity:** \( O(h) \) (where \( h \) is the height of BST, **log(n) for balanced, n for skewed**).

✅ **Best when memory optimization is needed**.

---

## **Comparison of Approaches**

| Approach                   | Time Complexity | Space Complexity | Best For                    |
| -------------------------- | --------------- | ---------------- | --------------------------- |
| **Hash Set**               | \( O(n) \)      | \( O(n) \)       | Any BST (simple, efficient) |
| **Inorder + Two Pointers** | \( O(n) \)      | \( O(n) \)       | Balanced BSTs               |
| **Two BST Iterators**      | \( O(n) \)      | \( O(h) \)       | Memory-efficient cases      |

---

## **Final Thoughts**

- **Use Hash Set** if **extra space is not an issue**.
- **Use Inorder + Two Pointers** if you prefer **classic Two Sum logic**.
- **Use BST Iterators** if you want an **optimized space solution**.

### **Key Patterns Identified**

✅ **BST Traversal** → **Inorder for sorted array**  
✅ **Two Sum Variants** → **Two Pointers, Hashing**  
✅ **Optimized Traversal** → **BST Iterators for O(h) space**

By understanding these patterns, you can **extend this approach** to other BST problems efficiently! 🚀

## **Under the Hood: Approach 1 (Using a Hash Set with Recursion)**

---

### **Understanding the Approach**

This approach **leverages recursion (Depth-First Search, DFS) and a Hash Set** to efficiently check whether a pair of nodes in the BST sum to `k`.

The key idea:

1. **Traverse the BST using DFS (recursion).**
2. **Use a Hash Set to store visited node values.**
3. **For each node, check if `k - node.val` exists in the set.**
   - If it does → return `true`.
   - If it doesn’t → add `node.val` to the set and continue.
4. If traversal completes without finding a pair, return `false`.

---

### **Step-by-Step Execution**

#### **Step 1: Function Definition**

```javascript
var findTarget = function (root, k) {
  let seen = new Set(); // Stores visited node values

  function dfs(node) {
    if (!node) return false; // Base case: Null node

    if (seen.has(k - node.val)) return true; // Check for complement

    seen.add(node.val); // Store current node value

    return dfs(node.left) || dfs(node.right); // Search left and right subtrees
  }

  return dfs(root);
};
```

---

### **Step 2: Breaking Down the Recursive Execution**

#### **Example 1**

Input:

```javascript
      5
     / \
    3   6
   / \    \
  2   4    7
```

Target: `k = 9`

#### **Recursive Calls & Hash Set Updates**

| **Step** | **Node Processed** | **Hash Set (`seen`)** | **Check `k - node.val` Exists?** | **Next Step**                 |
| -------- | ------------------ | --------------------- | -------------------------------- | ----------------------------- |
| 1        | `5`                | `{5}`                 | `9 - 5 = 4` (Not in Set)         | Recurse left (`3`)            |
| 2        | `3`                | `{5, 3}`              | `9 - 3 = 6` (Not in Set)         | Recurse left (`2`)            |
| 3        | `2`                | `{5, 3, 2}`           | `9 - 2 = 7` (Not in Set)         | No children, backtrack to `3` |
| 4        | `3`                | `{5, 3, 2}`           | No new check                     | Recurse right (`4`)           |
| 5        | `4`                | `{5, 3, 2, 4}`        | `9 - 4 = 5` (✅ Found in Set)    | **Return `true`!**            |

---

### **Step 3: How the Hash Set Works**

- The **Hash Set acts as a lookup table**.
- Each node’s value is added **after checking** for its complement (`k - node.val`).
- **Lookup (`set.has()`) is O(1)** on average, making this method very efficient.

---

### **Step 4: Time and Space Complexity Analysis**

#### **Time Complexity: \( O(n) \)**

- We visit **each node once** → `O(n)`.
- Hash set operations (`add`, `has`) are **O(1) on average**.
- Worst case (unbalanced BST) still remains **O(n)**.

#### **Space Complexity: \( O(n) \)**

- **Recursive call stack uses O(h) space**, where `h` is the tree height.
  - **Balanced BST** → \( O(\log n) \).
  - **Unbalanced BST** → \( O(n) \).
- **Hash Set stores up to `n` elements** → \( O(n) \).

---

### **Under-the-Hood Insights**

1. **DFS Traversal**: The function **traverses the tree recursively** (preorder).
2. **Hash Set Optimization**: It **avoids checking every pair explicitly** by using `k - node.val`.
3. **Fast Lookup**: The `Set.has()` method ensures **O(1) average time complexity**.
4. **Backtracking**: If a node has no valid pair, it backtracks and continues searching.

---

### **Conclusion**

- This approach is **highly efficient** compared to brute force.
- It **works well for any BST shape** (balanced or unbalanced).
- It **leverages hashing for quick lookups** instead of storing all values in an array.

Thus, **DFS + Hash Set is the optimal solution for finding two numbers in a BST that sum to `k`!** 🚀
