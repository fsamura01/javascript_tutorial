class Node {
  constructor(val, left, right, next) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

var connect = function (root) {
  if (!root) return root;

  let levelStart = root;

  while (levelStart) {
    let dummy = new Node();
    let prev = dummy;

    let currentNode = levelStart;

    while (currentNode) {
      if (currentNode.left) {
        prev.next = currentNode.left;
        prev = prev.next;
      }
      if (currentNode.right) {
        prev.next = currentNode.right;
        prev = prev.next;
      }

      currentNode = currentNode.next;
    }

    levelStart = dummy.next;
  }

  return root;
};

// Test cases
const root1 = new Node(1);
root1.left = new Node(2);
root1.left.left = new Node(4);
root1.left.right = new Node(5);
root1.right = new Node(3);
root1.right.right = new Node(7);

connect(root1); // Output: true

/* const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
connect(root2, 5); // Output: false

const root3 = null;
connect(root3, 0); // Output: false */
