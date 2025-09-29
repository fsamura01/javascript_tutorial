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
  // Edge case: empty tree
  if (!root) return null;

  // Step 1: Create a map to store nodes at each level with their parent info
  const levelMap = new Map(); // Map<level, Array<[node, parentVal]>>

  // Helper function to traverse the tree and populate levelMap
  function traverse(node, level, parentVal) {
    if (!node) return;

    // Initialize array for this level if it doesn't exist
    if (!levelMap.has(level)) {
      levelMap.set(level, []);
    }

    // Add node with its parent value to the level map
    levelMap.get(level).push([node, parentVal]);

    // Traverse children
    traverse(node.left, level + 1, node.val);
    traverse(node.right, level + 1, node.val);
  }

  // Perform initial traversal
  traverse(root, 0, 0);

  // Step 2: Calculate cousin sums for each level
  for (const [level, nodes] of levelMap) {
    // Create a map to store sum of children for each parent
    const parentSums = new Map(); // Map<parentVal, sum>
    let levelSum = 0;

    // Calculate sum of all nodes at this level and parent sums
    for (const [node, parentVal] of nodes) {
      levelSum += node.val;
      parentSums.set(parentVal, (parentSums.get(parentVal) || 0) + node.val);
    }

    // Update each node's value with sum of its cousins
    for (const [node, parentVal] of nodes) {
      // Cousin sum = total level sum - sum of nodes with same parent
      node.val = levelSum - parentSums.get(parentVal);
    }
  }

  return root;
}
