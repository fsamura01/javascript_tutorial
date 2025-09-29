class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  // create an empty array to store the results
  let results = [];

  // define a helper function
  const traverse = (node) => {
    // if the node exists, continue
    if (node) {
      // first recursively call traverse on the left node
      traverse(node.left);
      // push the value of the current node into results
      results.push(node.val);
      // finally recursively call traverse on the right node
      traverse(node.right);
    }
  };

  // start traversal from the root node
  traverse(root);

  // return the results array
  console.log("🚀 ~ inorderTraversal ~ results:", results);
  return results;
};

const root = [1, null, 2, 3];
const node = new TreeNode(1, null, 2, 3);
console.log("🚀 ~ node:", node);
inorderTraversal(node);

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
/* var inorderTraversal = function(root) {
    // create an empty array to store the results
    let results = [];
    
    // define a helper function
    const traverse = (node) => {
        // if the node exists, continue
        if (node) {
            // first recursively call traverse on the left node
            traverse(node.left);
            // push the value of the current node into results
            results.push(node.val);
            // finally recursively call traverse on the right node
            traverse(node.right);
        }
    }
    
    // start traversal from the root node
    traverse(root);
    
    // return the results array
    return results;
}; */
