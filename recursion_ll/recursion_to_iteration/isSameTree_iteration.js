// class TreeNode {
//   constructor(val, left, right) {
//     this.val = val === undefined ? val : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

// const isSameTree = (p1, q1) => {
//   const queue = [[p1, q1]];

//   while (queue.length > 0) {
//     const [node1, node2] = queue.shift();

//     if (!node1 && !node2) continue;
//     if (!node1 || !node2) return false;
//     if (node1.val !== node2.val) return false;

//     queue.push([node1.left, node2.left]);
//     queue.push([node1.right, node2.right]);
//   }
//   return true;
// };

// const p1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
// const q1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
// isSameTree(p1, q1);

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function isSameTree(p, q) {
  // Initialize a queue for the breadth-first traversal
  let queue = [[p, q]];

  // Process nodes in the queue
  while (queue.length > 0) {
    // Dequeue a pair of nodes
    let [node1, node2] = queue.shift();

    // If both nodes are null, continue to the next pair
    if (!node1 && !node2) continue;

    // If one node is null or the values are different, the trees are not the same
    if (!node1 || !node2 || node1.val !== node2.val) return false;

    // Enqueue the left children of both nodes
    queue.push([node1.left, node2.left]);

    // Enqueue the right children of both nodes
    queue.push([node1.right, node2.right]);
  }

  // If we finish processing all nodes without finding differences, the trees are the same
  return true;
}

// Helper function to build a tree from an array
function buildTree(array) {
  if (array.length === 0) return null;
  let root = new TreeNode(array[0]);
  let queue = [root];
  let i = 1;
  while (i < array.length) {
    let currentNode = queue.shift();
    if (array[i] !== null) {
      currentNode.left = new TreeNode(array[i]);
      queue.push(currentNode.left);
    }
    i++;
    if (i < array.length && array[i] !== null) {
      currentNode.right = new TreeNode(array[i]);
      queue.push(currentNode.right);
    }
    i++;
  }
  return root;
}

// Example 1
let p1 = buildTree([1, 2, 3]);
let q1 = buildTree([1, 2, 3]);
isSameTree(p1, q1); // Output: true

// // Example 2
// let p2 = buildTree([1, 2]);
// let q2 = buildTree([1, null, 2]);
// console.log(isSameTree(p2, q2)); // Output: false

// // Example 3
// let p3 = buildTree([1, 2, 1]);
// let q3 = buildTree([1, 1, 2]);
// console.log(isSameTree(p3, q3)); // Output: false
