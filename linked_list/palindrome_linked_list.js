class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const isPalindrome = function (head) {
  if (!head || !head.next) return true; // Empty or single-node list is a palindrome

  // Function to reverse a linked list
  const reverseList = function (node) {
    let prev = null;
    let curr = node;
    while (curr) {
      let nextTemp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextTemp;
    }
    return prev; // Return the head of the reversed list
  };

  let slow = head; // Pointer for the first half
  let fast = head; // Pointer for the second half

  // Find the middle of the list
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the list
  let reversedSecondHalf = reverseList(slow);

  // Compare the first half with the reversed second half
  while (reversedSecondHalf) {
    if (head.val !== reversedSecondHalf.val) return false; // Not a palindrome
    head = head.next;
    reversedSecondHalf = reversedSecondHalf.next;
  }

  return true; // Palindrome
};
const head = [1, 2];
isPalindrome(head);
console.log("🚀 ~ isPalindrome(head):", isPalindrome(head));
