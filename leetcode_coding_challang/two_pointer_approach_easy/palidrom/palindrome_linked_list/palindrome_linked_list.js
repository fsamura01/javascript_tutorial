class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Determines if a linked list is a palindrome.
 * @param {ListNode} head - The head of the linked list.
 * @return {boolean} - True if the list is a palindrome, false otherwise.
 */
function isPalindrome(head) {
  if (!head || !head.next) return true; // A single node or empty list is a palindrome.

  // Step 1: Find the middle of the list
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half of the list
  let prev = null,
    current = slow;
  while (current) {
    let nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }

  // Step 3: Compare the two halves
  let firstHalf = head,
    secondHalf = prev; // 'prev' is now the head of the reversed second half.
  while (secondHalf) {
    if (firstHalf.val !== secondHalf.val) {
      return false; // Not a palindrome
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  // Optional Step 4: Restore the original list (if required by the problem)
  // Reverse the second half back to its original order (not implemented here).

  return true; // The list is a palindrome
}

// Example Usage:
const head = new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1))));
console.log(isPalindrome(head)); // Output: true

const head2 = new ListNode(1, new ListNode(2));
console.log(isPalindrome(head2)); // Output: false
