/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.pushAll(root);
  }

  pushAll(node) {
    while (node !== null) {
      this.stack.push(node);
      node = node.left;
    }
  }

  hasNext() {
    return this.stack.length > 0;
  }

  next() {
    if (!this.hasNext()) {
      return null;
    }

    const node = this.stack.pop();
    this.pushAll(node.right);
    return node.val;
  }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

const buildTreeFromArray = (arr, index) => {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const root = new TreeNode(arr[index]);
  root.left = buildTreeFromArray(arr, 2 * index + 1);
  root.right = buildTreeFromArray(arr, 2 * index + 2);
  return root;
};

const arr = [7, 3, 15, null, null, 9, 20];
const root = buildTreeFromArray(arr, 0);
var obj = new BSTIterator(root);
console.log(obj);
obj.next(); // return 3
obj.next(); // return 7
obj.hasNext(); // return true
obj.next(); // return 9
obj.hasNext(); // return true
obj.next(); // return 15
obj.hasNext(); // return true
obj.next(); // return 20
obj.hasNext(); // return false
