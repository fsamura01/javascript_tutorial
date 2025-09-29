class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function insertionSortList(head) {
  if (!head || !head.next) {
    return head;
  }

  let dummy = new ListNode();
  let curr = head;
  while (curr !== null) {
    // At each iteration, we insert an element into the resulting list.
    let prev = dummy;
    // find the position to insert the current node
    while (prev.next !== null && prev.next.val <= curr.val) {
      prev = prev.next;
    }
    let next = curr.next;
    // insert the current node to the new list
    curr.next = prev.next;
    prev.next = curr;
    // moving on to the next iteration
    curr = next;
  }
  return dummy.next;
}

// Example usage:
function printList(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  console.log(arr);
}

function createLinkedListFromArray(arr) {
  if (!arr || arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}
createLinkedListFromArray([4, 2, 1, 3]);
console.log(
  "🚀 ~ createLinkedList([4, 2, 1, 3]):",
  createLinkedListFromArray([4, 2, 1, 3])
);

let head1 = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
printList(insertionSortList(head1)); // Output: [1, 2, 3, 4]

let head2 = new ListNode(
  -1,
  new ListNode(5, new ListNode(3, new ListNode(4, new ListNode(0))))
);
printList(insertionSortList(head2)); // Output: [-1, 0, 3, 4, 5]
