class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

var isValidBST = function (root) {
  const validate = (node, min, max) => {
    if (node === null) return true;
    if (node.val <= min || node.val >= max) return false;
    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  };

  return validate(root, -Infinity, Infinity);
};

/*
  function isValidBST(root) {
    if (!root) return true; // An empty tree is a valid BST

    let stack = [];
    let prev = -Infinity; // Initialize previous node value to a very small number

    while (stack.length > 0 || root !== null) {
        // Traverse left subtree
        while (root !== null) {
            stack.push(root);
            root = root.left;
        }

        // Process the node
        root = stack.pop();

        // If the current node's value is not greater than the previous value, return false
        if (root.val <= prev) {
            return false;
        }

        // Update the previous node's value to current node's value
        prev = root.val;

        // Move to the right subtree
        root = root.right;
    }

    // If we complete the in-order traversal without violation, it's a valid BST
    return true;
}

*/
//Build a tree from an array

/*
  // Helper function to build a binary tree from array representation
const buildTreeFromArray = function(arr, index) {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const root = new TreeNode(arr[index]);
  root.left = buildTreeFromArray(arr, 2 * index + 1);
  root.right = buildTreeFromArray(arr, 2 * index + 2);

  return root;
};
*/
function buildTreeFromArray(arr) {
  if (arr.length === 0) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];

  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();

    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }

    i++;

    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }

    i++;
  }

  return root;
}

buildTreeFromArray([5, 1, 4, null, null, 3, 6]);
