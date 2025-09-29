/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// Solution 1: Hash Table Approach
function hasCycle1(head) {
  // Create a Set to store visited nodes
  const visited = new Set();

  // Start from the head
  let current = head;

  // Traverse the linked list
  while (current !== null) {
    // If we've seen this node before, there's a cycle
    if (visited.has(current)) {
      return true;
    }

    // Add current node to visited set
    visited.add(current);

    // Move to next node
    current = current.next;
  }

  // If we reach null, there's no cycle
  return false;
}

// Solution 2: Floyd's Cycle Finding Algorithm (Tortoise and Hare)
function hasCycle2(head) {
  // Handle empty list or single node
  if (head === null || head.next === null) {
    return false;
  }

  // Initialize slow and fast pointers
  let slow = head;
  let fast = head;

  // Move through the list
  while (fast !== null && fast.next !== null) {
    // Move slow pointer one step
    slow = slow.next;

    // Move fast pointer two steps
    fast = fast.next.next;

    // If they meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }

  // If fast reaches null, there's no cycle
  return false;
}
