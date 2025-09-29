# Two Sum IV - Input is a BST

## 1. Problem Understanding

This problem asks us to determine if there exist two nodes in a Binary Search Tree (BST) whose values sum up to a target number `k`. Let's break this down:

- We have a BST where each node has a value
- We need to find if any two values in the tree sum to exactly `k`
- The tree is guaranteed to be a valid BST (which means for any node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater)
- We need to return true if such a pair exists, and false otherwise

The key insight is that we need to check all possible pairs of nodes in the tree, but we want to do this efficiently without explicitly checking every combination.

## 2. Pattern Identification

This problem combines two key patterns:

1. **Binary Search Tree (BST) traversal** - We need to access all nodes in the tree
2. **Two Sum pattern** - Similar to the classic "Two Sum" problem, we're looking for pairs that sum to a target

Since we're working with a BST, we can leverage its properties to solve this efficiently. This is essentially a tree traversal problem combined with a lookup operation.

## 3. Approach Discussion

We can approach this problem in multiple ways, but here's a straightforward and efficient approach:

1. **Use a HashSet to track visited values**: As we traverse the tree, we'll keep track of the values we've seen.
2. **For each node, check if (k - node.val) exists in our set**: If it does, we've found a pair that sums to `k`.
3. **If not, add the current node's value to our set**: This marks it as "seen" for future nodes.

This approach only requires a single traversal of the tree, and each lookup/insertion in the HashSet is O(1) on average.

Any tree traversal method will work (in-order, pre-order, post-order, or level-order), as long as we visit every node once.

## 4. Code Implementation

### **Use a HashSet + DFS**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root - Root of the binary search tree
 * @param {number} k - Target sum we're looking for
 * @return {boolean} - Whether there exist two nodes that sum to k
 */
function findTarget(root, k) {
    // Set to store values we've seen so far
    const seen = new Set();
    
    // Helper function to traverse the tree
    function dfs(node) {
        // Base case: if we reach a null node
        if (node === null) {
            return false;
        }
        
        // Check if we've already seen a value that, when paired with current value, sums to k
        const complement = k - node.val;
        if (seen.has(complement)) {
            return true; // Found a pair!
        }
        
        // Add current value to our set of seen values
        seen.add(node.val);
        
        // Continue searching in both left and right subtrees
        return dfs(node.left) || dfs(node.right);
    }
    
    // Start DFS traversal from the root
    return dfs(root);
}
```

Let's implement this solution in JavaScript:

The solution uses a depth-first search (DFS) traversal to explore the tree. For each node we visit:

1. We calculate the "complement" value (k - node.val) that would form a valid pair
2. We check if this complement exists in our set of seen values
3. If it exists, we've found a valid pair and return true
4. If not, we add the current node's value to our set and continue traversing

This approach visits each node exactly once and performs constant-time lookups, making it very efficient.

## 5. Complexity Analysis

- **Time Complexity: O(n)** where n is the number of nodes in the tree
  - We visit each node exactly once during our traversal
  - Each operation on the Set (insertion and lookup) is O(1) on average

- **Space Complexity: O(n)**
  - In the worst case, we might store all values from the tree in our Set
  - The recursive call stack will also use O(h) space where h is the height of the tree (which could be up to n in a skewed tree)

## 6. Alternative Solutions

There are several alternative approaches to this problem:

### Approach 2: In-order Traversal + Two Pointers

```javascript
/**
 * @param {TreeNode} root - Root of the binary search tree
 * @param {number} k - Target sum we're looking for
 * @return {boolean} - Whether there exist two nodes that sum to k
 */
function findTargetInorder(root, k) {
    // Array to store the in-order traversal result
    const values = [];
    
    // Perform in-order traversal to get sorted array
    function inorder(node) {
        if (node === null) return;
        
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }
    
    // Fill the values array
    inorder(root);
    
    // Use two pointers technique on the sorted array
    let left = 0;
    let right = values.length - 1;
    
    while (left < right) {
        const sum = values[left] + values[right];
        
        if (sum === k) {
            return true; // Found a pair!
        } else if (sum < k) {
            left++; // Need a larger sum, move left pointer right
        } else {
            right--; // Need a smaller sum, move right pointer left
        }
    }
    
    return false; // No pair found
}
```

1. Perform an in-order traversal to get a sorted array of values from the BST
2. Use the two-pointer technique on this sorted array to find if there's a pair that sums to `k`

This approach has the same time complexity (O(n)), but it requires two passes through the tree data: first to build the sorted array, then to find the pair. The space complexity remains O(n) for storing the array.

### Approach 3: BFS Traversal

```javascript
/**
 * @param {TreeNode} root - Root of the binary search tree
 * @param {number} k - Target sum we're looking for
 * @return {boolean} - Whether there exist two nodes that sum to k
 */
function findTargetBFS(root, k) {
    // Set to store values we've seen
    const seen = new Set();
    
    // Queue for BFS traversal
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        // Skip null nodes
        if (node === null) continue;
        
        // Check if we've seen a complement
        const complement = k - node.val;
        if (seen.has(complement)) {
            return true; // Found a pair!
        }
        
        // Add current value to our set
        seen.add(node.val);
        
        // Add child nodes to the queue
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
    }
    
    return false; // No pair found
}
```

We could also use breadth-first search (BFS) instead of DFS, which might be more efficient for wide, shallow trees:

## 7. Practice Recommendations

If you enjoyed this problem, here are similar problems to practice the patterns we've explored:

1. **LeetCode #1: Two Sum** - The classic two-sum problem (with arrays)
2. **LeetCode #167: Two Sum II - Input Array Is Sorted** - Similar to our second approach
3. **LeetCode #543: Diameter of Binary Tree** - Another BST problem with DFS traversal
4. **LeetCode #1038: Binary Search Tree to Greater Sum Tree** - BST traversal with a twist
5. **LeetCode #230: Kth Smallest Element in a BST** - Uses in-order traversal of BST
6. **LeetCode #98: Validate Binary Search Tree** - Tests your understanding of BST properties
7. **LeetCode #530: Minimum Absolute Difference in BST** - Combines BST traversal with pair finding

## 8. Flowchart Design

Here's a flowchart that illustrates our primary solution using the DFS approach:

## Key Insights and Takeaways

1. **HashSet for Efficient Lookups**: This problem demonstrates how a HashSet can be used for O(1) lookups, making it efficient to check if a complementary value exists.

2. **Tree Traversal Flexibility**: Any traversal method (DFS or BFS) works for this problem because we just need to visit each node once. The choice depends more on the tree structure and preference.

3. **BST Properties**: While this problem doesn't directly leverage the BST property (which is why any binary tree traversal works), understanding that property lets us consider alternative approaches like in-order traversal + two pointers.

4. **Problem Reduction**: We effectively reduced a complex tree problem to the familiar "Two Sum" pattern, showing how recognizing these patterns can simplify problem-solving.

5. **Multiple Valid Approaches**: This problem demonstrates that there are often multiple valid approaches to solving algorithm problems. Understanding the tradeoffs between them is important for interviews.

The DFS + HashSet approach is typically the most efficient for this problem because it requires only a single pass through the tree and uses minimal extra space while maintaining O(n) time complexity.
