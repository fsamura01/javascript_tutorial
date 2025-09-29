class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

var preorderTraversal = function (root) {
  if (!root) return [];
  const left = preorderTraversal(root.left);
  const right = preorderTraversal(root.right);
  return [root.val].concat(left, right);
};

/* class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

var preorderTraversal = function (root) {
  const result = [];

  // Helper function to perform preorder traversal recursively
  const traverse = (node) => {
    if (node === null) return;
    result.push(node.val); // Visit the current node
    traverse(node.left); // Traverse left subtree
    traverse(node.right); // Traverse right subtree
  };

  traverse(root); // Start traversal from the root
  return result;
}; */

// Test cases
const root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
preorderTraversal(root1); // Output: [1, 2, 3]

const root2 = null;
preorderTraversal(root2); // Output: []

const root3 = new TreeNode(1);
preorderTraversal(root3); // Output: [1]
