function findDuplicateSubtrees(root) {
  const subtrees = new Map(); // Closure variable #1
  const result = []; // Closure variable #2

  function serialize(node) {
    // Inner function
    if (!node) return "#";

    const serialized = `${node.val},${serialize(node.left)},${serialize(
      node.right
    )}`;

    if (subtrees.has(serialized)) {
      subtrees.set(serialized, subtrees.get(serialized) + 1);
      if (subtrees.get(serialized) === 2) {
        result.push(node); // Accessing closure variable
      }
    } else {
      subtrees.set(serialized, 1); // Accessing closure variable
    }

    return serialized;
  }

  serialize(root);
  return result;
}
findDuplicateSubtrees([1, 2, 3, 4, null, 2, 4, null, null, 4]);
findDuplicateSubtrees([2, 1, 1]);
findDuplicateSubtrees([2, 2, 2, 3, null, 3, null]);
