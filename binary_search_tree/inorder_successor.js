// Definition for a binary tree node.
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
function inorderSuccessor(root, p) {
  let successor = null;

  while (root !== null) {
    if (p.val < root.val) {
      successor = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return successor;
}

// Example usage:
// Create a BST
let root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(7);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(8);

// Find the inorder successor of node with value 4
let node = root.left.right; // Node with value 4
let result = inorderSuccessor(root, node);
console.log(result ? result.val : null); // Output: 5
