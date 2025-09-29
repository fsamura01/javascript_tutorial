/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function findMiddleNode(head) {
  // Edge case: empty list or single node
  if (!head || !head.next) {
    return head;
  }

  // Initialize two pointers
  let slow = head;
  let fast = head;

  // Move fast pointer twice as fast as slow pointer
  // When fast reaches end, slow will be at middle
  while (fast && fast.next) {
    slow = slow.next; // Move one step
    fast = fast.next.next; // Move two steps
  }

  // Return middle node (slow pointer)
  return slow;
}
