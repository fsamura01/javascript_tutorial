class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function swapPairs(head) {
  // Base case: if the list is empty or has only one node, no swapping needed
  if (!head || !head.next) return head;

  // Save the reference to the second node
  const secondNode = head.next;

  // Recursively swap the rest of the list
  head.next = swapPairs(secondNode.next);

  // Swap the first two nodes
  secondNode.next = head;

  // Return the new head of the swapped pair
  return secondNode;
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
const head = createLinkedList([1, 2, 3, 4, 5]);
swapPairs(head);

// Print the linked list to verify
function printLinkedList(head) {
  let current = head;
  let result = "";
  while (current) {
    result += current.val + " -> ";
    current = current.next;
  }
  result += "null";
  console.log(result);
}

printLinkedList(head); // Output: 1 -> 2 -> 3 -> 4 -> 5 -> null
