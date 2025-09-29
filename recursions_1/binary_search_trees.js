class TreeNode {
  construction(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const generateTrees = (n) => {
  if (n === 0) return [];

  const generate = (start, end) => {
    if (start > end) return [null];
    const trees = [];

    for (let i = start; i <= end; i++) {
      let leftSubTrees = generate(start, i - 1);
      let rightSubTrees = generate(i + 1, end);

      for (let leftTree of leftSubTrees) {
        for (let rightTree of rightSubTrees) {
          const root = new TreeNode(i);
          root.left = leftTree;
          root.right = rightTree;
          trees.push(root);
        }
      }
      return trees;
    }
  };

  return generate(1, n);
};

generateTrees(2);
