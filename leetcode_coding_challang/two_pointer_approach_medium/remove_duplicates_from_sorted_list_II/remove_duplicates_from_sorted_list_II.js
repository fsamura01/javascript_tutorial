/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* delete all nodes that have duplicate numbers */
function deleteDuplicates(head) {
  // Handle edge case: empty list or single node
  if (!head || !head.next) return head;

  // Create a dummy node to handle cases where head needs to be removed
  const dummy = new ListNode(0);
  dummy.next = head;

  // Initialize pointers
  let prev = dummy;
  let current = head;

  while (current && current.next) {
    // Check if current value is duplicated
    if (current.val === current.next.val) {
      // Found duplicate, remember this value
      const duplicateValue = current.val;

      // Skip all nodes with this value
      while (current && current.val === duplicateValue) {
        current = current.next;
      }

      // Connect prev to the node after all duplicates
      prev.next = current;
    } else {
      // Current value is unique, move both pointers forward
      prev = current;
      current = current.next;
    }
  }

  // Return the new head (next node after dummy)
  return dummy.next;
}

/* delete all nodes that have duplicate numbers */
function deleteDuplicates(head) {
  // Handle edge case: empty list or single node
  if (!head || !head.next) return head;

  // Create a dummy node to handle cases where head needs to be removed
  const dummy = new ListNode(0);
  dummy.next = head;

  // Initialize pointers
  let prev = dummy;
  let current = head;

  while (current && current.next) {
    // Check if current value is duplicated
    if (current.val === current.next.val) {
      // Skip all nodes with this value
      while (current && current.val === current.next.val) {
        current = current.next;
      }

      // Connect prev to the node after all duplicates
      prev.next = current;
    } else {
      // Current value is unique, move both pointers forward
      prev = current;
      current = current.next;
    }
  }

  // Return the new head (next node after dummy)
  return dummy.next;
}
