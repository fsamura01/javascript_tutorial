<!--Here’s a step-by-step solution to solve **234.
Palindrome Linked List** in JavaScript,
including how to leverage the constraints and
spot patterns to solve the problem efficiently.
-->

# **234 Palindrome Linked List**

## **Understanding the Problem**

### A linked list is a **palindrome** if it reads the same forwards and backwards. For example

- `1 -> 2 -> 2 -> 1` is a palindrome.
- `1 -> 2` is not a palindrome.

We need to determine if the linked list is a palindrome with the following constraints:\*\*

1. **O(n) Time Complexity**: We must traverse the list at most once or twice.
2. **O(1) Space Complexity**: We cannot use extra memory like arrays to store values from the linked list.

---

## **Step-by-Step Solution**

To achieve **O(n) time** and **O(1) space**, we can follow these steps:

---

### **Step 1: Find the Middle of the Linked List**

- Use the **two-pointer technique** (fast and slow pointers) to locate the middle of the list.
- The **slow pointer** moves one step at a time, while the **fast pointer** moves two steps at a time.
- When the fast pointer reaches the end, the slow pointer will be at the middle.

---

### **Step 2: Reverse the Second Half of the List**

- Reverse the second half of the linked list starting from the middle node.  
  This allows us to compare the first half with the reversed second half without using extra memory.
- Use an iterative method to reverse the list in-place.

---

### **Step 3: Compare the Two Halves**

- Compare the nodes of the first half with the nodes of the reversed second half.
- If all corresponding nodes match, the list is a palindrome; otherwise, it is not.

---

### **Step 4: Restore the Original List (Optional)**

- If required, reverse the second half of the list again to restore the original structure of the linked list.

---

### **JavaScript Implementation**

```javascript
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
```

---

### **Spotting Patterns and Leveraging Constraints**

1. **Pattern in Reversing the List**:

   - By reversing the second half of the list in place, we eliminate the need for extra space.
   - This approach works because comparing two halves of a palindrome is straightforward after reversal.

2. **Constraints**:
   - **1 ≤ Nodes ≤ 10⁵**: This ensures that we cannot use \(O(n)\) space (like arrays) because it could lead to memory issues for large inputs.
   - **0 ≤ Node.val ≤ 9**: Since node values are digits, they are easy to compare directly.

---

### **Time and Space Complexity**

1. **Time Complexity**:

   - Finding the middle: \(O(n)\).
   - Reversing the second half: \(O(n/2)\).
   - Comparing the two halves: \(O(n/2)\).
   - Total: \(O(n)\).

2. **Space Complexity**:
   - Since we reverse the list in place, no extra memory is used. Thus, the space complexity is \(O(1)\).

---

### **Example Walkthrough**

#### Example 1: Input `[1, 2, 2, 1]`

1. **Find the Middle**:
   - Slow pointer stops at the first `2`.
2. **Reverse the Second Half**:
   - Original: `1 -> 2 -> 2 -> 1`
   - After reversal: `1 -> 2 -> 1 -> 2`.
3. **Compare Halves**:
   - First half: `1 -> 2`
   - Reversed second half: `1 -> 2`
   - Both halves match, so return `true`.

---

### **Conclusion**

- This approach is efficient, uses minimal space,
  and adheres to the problem’s constraints.
  Let me know if you need additional clarifications!
