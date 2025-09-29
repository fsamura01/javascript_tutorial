class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function reverseLinkedListIterative(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev;
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
reverseLinkedListIterative(head1);

const head2 = createLinkedList([1, 2]);
reverseLinkedListIterative(head2);

const head3 = createLinkedList([]);
reverseLinkedListIterative(head3);
