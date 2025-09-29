// Definition for a binary tree node.
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  // If the root is null, we insert the new node here
  if (root === null) {
    return new TreeNode(val);
  }

  // If the value to be inserted is less than the current node's value, insert it in the left subtree
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  }
  // If the value to be inserted is greater than the current node's value, insert it in the right subtree
  else if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  }

  // Return the root after insertion (unchanged except for the added node)
  return root;
};

// Example usage:

// Construct the tree: [4, 2, 7, 1, 3]
let root = new TreeNode(
  4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7)
);

// Insert value 5 into the tree
let newTree = insertIntoBST(root, 5);
console.log(newTree);

// Insert value 25 into another tree
let anotherTree = insertIntoBST(
  new TreeNode(
    40,
    new TreeNode(20, new TreeNode(10), new TreeNode(30)),
    new TreeNode(60, new TreeNode(50), new TreeNode(70))
  ),
  25
);

console.log(anotherTree);
/*
  const buildTreeFromArray = (arr, index) => {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const root = new TreeNode(arr[index]);
  root.left = buildTreeFromArray(arr, 2 * index + 1);
  root.right = buildTreeFromArray(arr, 2 * index + 2);
  return root;
};

//const arr = [8, 3, 10, 1],
//key = 3;
const arr = [5, 3, 6, 2, 4, null, 7],
  key = 3;
const root = buildTreeFromArray(arr, 0);

deleteNode(root, key);

 */
