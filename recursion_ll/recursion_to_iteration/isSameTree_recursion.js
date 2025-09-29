//Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
function isSameTree(p, q) {
  // If both trees are empty
  if (p === null && q === null) return true;

  // If one of the trees is empty
  if (p === null || q === null) return false;

  // If the values of the current nodes do not match
  if (p.val !== q.val) return false;

  // Recursively check the left and right subtrees
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Example usage:
let p1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
let q1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
isSameTree(p1, q1); // Output: true

// Example 2
let p2 = new TreeNode(1, new TreeNode(2), null);
let q2 = new TreeNode(1, null, new TreeNode(2));
isSameTree(p2, q2); // Output: false

// Example 3
let p3 = new TreeNode(1, new TreeNode(2), new TreeNode(1));
let q3 = new TreeNode(1, new TreeNode(1), new TreeNode(2));
isSameTree(p3, q3); // Output: false
