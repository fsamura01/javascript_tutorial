class TreeNode {
  constructor(val, right, left) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function levelOrder(root) {
  // if (!root) return [];
  // const queue = [root];
  const result = [];

  const bfs = (root, level) => {
    if (!root) return;

    // if (result.length === 0) {
    //   result.push([]);
    // }

    result[level] = result[level] || [];
    result[level].push(root.val);
    bfs(root.left, level + 1);
    bfs(root.right, level + 1);
  };

  bfs(root, 0);
  return result;
}

const buildTreeFromArray = (arr) => {
  if (arr.length === null) return [];
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (i < arr.length) {
    let node = queue.shift();

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
};

const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
levelOrder(root);
