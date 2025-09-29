class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

var hasCycle = function (head) {
  if (!head || !head.next) {
    return false;
  }
  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};

let head = [3, 2, 0, -4];
hasCycle(head);
console.log("🚀 ~ hasCycle(head):", hasCycle(head));
