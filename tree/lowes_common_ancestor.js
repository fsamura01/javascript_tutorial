class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

var lowestCommonAncestor = function (root, p, q) {
  if (!root) return root;

  if (root === p || root === q) {
    return root;
  }

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    return root;
  }

  return left ? left : right;
};

// Helper function to build a binary tree from array representation
const buildTreeFromArray = function (arr, index) {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const root = new TreeNode(arr[index]);
  root.left = buildTreeFromArray(arr, 2 * index + 1);
  root.right = buildTreeFromArray(arr, 2 * index + 2);

  return root;
};

// Test case
const arr = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
const root = buildTreeFromArray(arr, 0);
const p = new TreeNode(5);
const q = new TreeNode(1);

lowestCommonAncestor(root, p, q);
