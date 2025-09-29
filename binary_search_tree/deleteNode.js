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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  // Define a variable to keep track of the parent node and current node
  let parent = null;
  let current = root;

  // Search for the node to delete
  while (current !== null && current.val !== key) {
    parent = current;
    if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  // If node to be deleted is not found, return the original root
  if (current === null) {
    return root;
  }

  // Case 1: Node to be deleted has no children (leaf node)
  if (current.left === null && current.right === null) {
    if (current === root) {
      return null; // Deleting the root node with no children
    }
    if (parent.left === current) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }

  // Case 2: Node to be deleted has one child
  else if (current.left === null || current.right === null) {
    const child = current.left ? current.left : current.right;
    if (current === root) {
      return child; // Deleting the root node with one child
    }
    if (parent.left === current) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  // Case 3: Node to be deleted has two children
  else {
    // Find the in-order successor (smallest node in the right subtree)
    let successorParent = current;
    let successor = current.right;
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    // Replace the value of the node to be deleted with the successor's value
    current.val = successor.val;

    // Remove the successor node (successor has at most one right child)
    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  return root;
};

// Example usage:
// Constructing the tree [5, 3, 6, 2, 4, null, 7]
let root = new TreeNode(
  5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(7))
);

// Deleting the node with value 3
let newTree = deleteNode(root, 3);
console.log(newTree);

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

/*// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

var deleteNode = function(root, key) {
    // Base case: if the tree is empty
    if (root === null) {
        return null;
    }

    // First, search for the node to be deleted
    if (key < root.val) {
        // The key is in the left subtree
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        // The key is in the right subtree
        root.right = deleteNode(root.right, key);
    } else {
        // We've found the node to be deleted

        // Case 1: Node has no children (leaf node)
        if (root.left === null && root.right === null) {
            return null;
        }

        // Case 2: Node has only one child
        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        }

        // Case 3: Node has two children
        // Find the in-order successor (smallest in the right subtree)
        let minNode = findMin(root.right);
        // Replace the current node's value with the successor's value
        root.val = minNode.val;
        // Delete the successor from the right subtree
        root.right = deleteNode(root.right, minNode.val);
    }

    // Return the (potentially updated) root node
    return root;
};

// Helper function to find the minimum value node in the tree
var findMin = function(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
};
*/
