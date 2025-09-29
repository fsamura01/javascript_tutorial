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
 * @return {TreeNode}
 */
function replaceValueInTree(root) {
  if (!root) return root;

  // Create a queue for BFS
  const nodeQueue = [];
  nodeQueue.push(root);

  // Array to store sum of nodes at each level
  const levelSums = [];

  // First BFS: Calculate sum of nodes at each level
  while (nodeQueue.length > 0) {
    let levelSum = 0;
    const levelSize = nodeQueue.length;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = nodeQueue.shift();
      levelSum += currentNode.val;

      if (currentNode.left) nodeQueue.push(currentNode.left);
      if (currentNode.right) nodeQueue.push(currentNode.right);
    }
    levelSums.push(levelSum);
  }

  // Second BFS: Update each node's value to sum of its cousins
  nodeQueue.push(root);
  let levelIndex = 1;
  root.val = 0; // Root has no cousins

  while (nodeQueue.length > 0) {
    const levelSize = nodeQueue.length;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = nodeQueue.shift();

      // Calculate sum of siblings
      const siblingSum =
        (currentNode.left ? currentNode.left.val : 0) +
        (currentNode.right ? currentNode.right.val : 0);

      // Update left child if exists
      if (currentNode.left) {
        currentNode.left.val = levelSums[levelIndex] - siblingSum;
        nodeQueue.push(currentNode.left);
      }

      // Update right child if exists
      if (currentNode.right) {
        currentNode.right.val = levelSums[levelIndex] - siblingSum;
        nodeQueue.push(currentNode.right);
      }
    }
    levelIndex++;
  }

  return root;
}

// Helper function to test the implementation
function createTree(values) {
  if (!values.length) return null;

  const root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;

  while (queue.length && i < values.length) {
    const node = queue.shift();

    if (i < values.length && values[i] !== null) {
      node.left = new TreeNode(values[i]);
      queue.push(node.left);
    }
    i++;

    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

// Test the implementation
function runTest() {
  // Test case from the problem
  const testTree = createTree([5, 4, 9, 1, 10, null, 7]);
  const result = replaceValueInTree(testTree);
  console.log("Test result:", treeToArray(result)); // Should output [0,0,0,7,7,null,11]
}
