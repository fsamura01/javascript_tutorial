// Iterative approach
// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode|null}
 */
var searchBST = function (root, val) {
  // Start with the root node
  let currentNode = root;

  // Iterate until we find the value or reach the end of the tree
  while (currentNode !== null) {
    if (currentNode.val === val) {
      // We found the node, return it
      return currentNode;
    } else if (val < currentNode.val) {
      // Move to the left subtree
      currentNode = currentNode.left;
    } else {
      // Move to the right subtree
      currentNode = currentNode.right;
    }
  }

  // If we exit the loop, the value was not found
  return null;
};

// Example usage:

// Construct the tree: [4, 2, 7, 1, 3]
let root = new TreeNode(
  4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7)
);

console.log(searchBST(root, 2)); // Output: TreeNode { val: 2, left: TreeNode { val: 1 }, right: TreeNode { val: 3 } }
console.log(searchBST(root, 5)); // Output: null
