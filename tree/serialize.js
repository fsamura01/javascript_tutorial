class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

var serialize = function (root) {
  if (!root) return "";

  const serializedTree = [];

  const traverse = (node) => {
    if (!node) {
      serializedTree.push("null");
      return;
    }

    serializedTree.push(node.val.toString());
    traverse(node.left);
    traverse(node.right);
  };

  traverse(root);

  return serializedTree.join(",");
};

var deserialize = function (data) {
  if (!data) return null;

  const values = data.split(",");

  const buildTree = () => {
    if (!values.length) return null;

    const val = values.shift();

    if (val === "null") return null;

    const node = new TreeNode(parseInt(val));
    node.left = buildTree();
    node.right = buildTree();

    return node;
  };

  return buildTree();
};

// Test case
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);

const serialized = serialize(root);
serialized;

const deserialized = deserialize(serialized);
deserialized;
