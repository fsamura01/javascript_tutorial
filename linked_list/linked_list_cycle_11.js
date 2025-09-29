var detectCycle = (head) => {
  let slow = head;
  let fast = head;
  let hasCycle = false;

  // check for a null condition
  if (!head || head.next) {
    return null;
  }

  // cycle detection
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }
  // cycle detection result
  if (!hasCycle) {
    return null;
  }
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};

const head = [3, 2, 0, -4];
detectCycle(head);
console.log("🚀 ~ detectCycle(head):", detectCycle(head));
