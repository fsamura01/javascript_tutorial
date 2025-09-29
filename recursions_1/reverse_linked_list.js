class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function reverseLinkedListRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }

  const reversedHead = reverseLinkedListRecursive(head.next);

  head.next.next = head;
  head.next = null;

  return reversedHead;
}

function createLinkedList(arr) {
  if (!arr || arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Test case: create a linked list with values 1 -> 2 -> 3 -> 4 -> 5
const head1 = createLinkedList([1, 2, 3, 4, 5]);
reverseLinkedListRecursive(head1);

const head2 = createLinkedList([1, 2]);
reverseLinkedListRecursive(head2);

const head3 = createLinkedList([]);
reverseLinkedListRecursive(head3);
