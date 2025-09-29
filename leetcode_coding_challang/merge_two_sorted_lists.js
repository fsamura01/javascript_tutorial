/**
 * Definition for singly-linked list node
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  // Step 1: Create a dummy node to serve as the head of our merged list
  const dummy = new ListNode(-1);
  let current = dummy;

  // Step 2: Traverse both lists simultaneously while both have nodes
  while (list1 !== null && list2 !== null) {
    // Compare values and link the smaller node
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    // Move the current pointer forward
    current = current.next;
  }

  // Step 3: If any list still has remaining nodes, link them
  if (list1 !== null) {
    current.next = list1;
  }
  if (list2 !== null) {
    current.next = list2;
  }

  // Step 4: Return the head of the merged list (skip the dummy node)
  return dummy.next;
}

// Helper function to create a linked list from an array (for testing)
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// Helper function to convert linked list to array (for testing)
function linkedListToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Test cases
const test1 = mergeTwoLists(
  createLinkedList([1, 2, 4]),
  createLinkedList([1, 3, 4])
);
console.log(linkedListToArray(test1)); // [1,1,2,3,4,4]

const test2 = mergeTwoLists(createLinkedList([]), createLinkedList([]));
console.log(linkedListToArray(test2)); // []

const test3 = mergeTwoLists(createLinkedList([]), createLinkedList([0]));
console.log(linkedListToArray(test3)); // [0]

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  // Create a dummy node to act as the head of the merged list
  const dummy = new ListNode(-1);
  let current = dummy;

  // Loop until both lists are empty
  while (l1 !== null && l2 !== null) {
    // Compare the values of the current nodes from both lists
    if (l1.val <= l2.val) {
      // If the value in list 1 is smaller or equal, append it to the merged list
      current.next = l1;
      l1 = l1.next; // Move to the next node in list 1
    } else {
      // If the value in list 2 is smaller, append it to the merged list
      current.next = l2;
      l2 = l2.next; // Move to the next node in list 2
    }
    // Move to the next node in the merged list
    current = current.next;
  }

  // Append the remaining nodes from list 1 or list 2
  current.next = l1 !== null ? l1 : l2;

  // Return the head of the merged list (excluding the dummy node)
  return dummy.next;
};
