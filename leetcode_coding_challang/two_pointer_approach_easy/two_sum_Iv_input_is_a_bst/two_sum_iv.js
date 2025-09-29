/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.left = (left===undefined ? null : left);
 *     this.right = (right===undefined ? null : right);
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */

/*In-Order Traversa and Two Pointer Approach*/
function findTarget(root, k) {
  // Step 1: Perform in-order traversal to get a sorted array of node values.
  const sortedValues = [];

  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    sortedValues.push(node.val);
    inorder(node.right);
  }

  inorder(root);

  // Step 2: Use two pointers to search for the target sum.
  let left = 0;
  let right = sortedValues.length - 1;

  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];

    if (sum === k) {
      return true;
    } else if (sum < k) {
      left++; // Increase sum by moving the left pointer rightward.
    } else {
      right--; // Decrease sum by moving the right pointer leftward.
    }
  }

  return false; // No valid pair found.
}

// Example test cases:

// Helper function to build a BST (for demonstration)
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

// Example 1:
// BST: [5,3,6,2,4,null,7]
//      5
//     / \
//    3   6
//   / \   \
//  2   4   7
const root1 = new TreeNode(
  5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(7))
);
console.log(findTarget(root1, 9)); // Output: true

// Example 2:
console.log(findTarget(root1, 28)); // Output: false

/* DFS and a Hash Set */
function findTarget(root, k) {
  const seen = new Set();

  // Helper function for recursive DFS
  function dfs(node) {
    if (!node) return false;

    // Check if the complement exists in the set
    if (seen.has(k - node.val)) {
      return true;
    }

    // Add the current node value to the set
    seen.add(node.val);

    // Recursively check left and right subtrees
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
}
