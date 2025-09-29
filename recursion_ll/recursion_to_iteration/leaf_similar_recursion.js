class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function leafSimilar(root1, root2) {
  const leaves1 = getLeafValue(root1);
  const leaves2 = getLeafValue(root2);
  return JSON.stringify(leaves1) === JSON.stringify(leaves2);
}

function getLeafValue(root) {
  const leaves = [];
  const dfs = (root) => {
    if (!root) return;
    if (!root.left && !root.right) {
      leaves.push(root.val);
    }

    dfs(root.left);
    dfs(root.right);
  };

  dfs(root);
  return leaves;
}

const buildTreeFromArray = (array) => {
  const root = new TreeNode(array[0]);
  const queue = [root];
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
};

//const root1 = [3, 5, 1, 6, 2, 9, 8, null, null, 7, 4],
const root1 = buildTreeFromArray([3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]);
//root2 = [3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8];
const root2 = buildTreeFromArray([
  3,
  5,
  1,
  6,
  7,
  4,
  2,
  null,
  null,
  null,
  null,
  null,
  null,
  9,
  8,
]);
leafSimilar(root1, root2);
