<!-- I'll help you understand how to solve the Linked List
 Cycle problem using the Floyd's Cycle-Finding Algorithm
 (also known as the "tortoise and hare" algorithm).
 Let me break this down step by step. -->

# **Linked List Cycle Detection Implementation**

## **Implementation**

```javascript
// Definition for singly-linked list node
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Determines if a linked list has a cycle using Floyd's Cycle-Finding Algorithm
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(1) as we only use two pointers
 *
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - True if cycle exists, false otherwise
 */
function hasCycle(head) {
  // Handle edge cases: empty list or single node
  if (!head || !head.next) {
    return false;
  }

  // Initialize two pointers: slow moves one step, fast moves two steps
  let slow = head;
  let fast = head;

  // Continue until fast reaches end or finds cycle
  while (fast && fast.next) {
    // Move slow pointer one step
    slow = slow.next;
    // Move fast pointer two steps
    fast = fast.next.next;

    // If pointers meet, we've found a cycle
    if (slow === fast) {
      return true;
    }
  }

  // If we exit the loop, no cycle was found
  return false;
}

// Test cases
function createLinkedListWithCycle(values, pos) {
  if (!values.length) return null;

  // Create nodes
  const nodes = values.map((val) => new ListNode(val));

  // Link nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  // Create cycle if pos is valid
  if (pos >= 0 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

// Test Case 1: [3,2,0,-4], pos = 1
const test1 = createLinkedListWithCycle([3, 2, 0, -4], 1);
console.log("Test 1:", hasCycle(test1)); // Expected: true

// Test Case 2: [1,2], pos = 0
const test2 = createLinkedListWithCycle([1, 2], 0);
console.log("Test 2:", hasCycle(test2)); // Expected: true

// Test Case 3: [1], pos = -1
const test3 = createLinkedListWithCycle([1], -1);
console.log("Test 3:", hasCycle(test3)); // Expected: false

// Additional Test Case: Empty list
const test4 = null;
console.log("Test 4:", hasCycle(test4)); // Expected: false
```

Let me explain the solution step by step:

## **Algorithm Choice**: We use Floyd's Cycle-Finding Algorithm because it

- Uses O(1) space complexity (only two pointers)
- Has O(n) time complexity
- Is highly efficient for cycle detection

## **Core Concept**

- Use two pointers moving at different speeds
- If there's a cycle, they will eventually meet
- If there's no cycle, the fast pointer will reach the end

## **Implementation Details**

- Initialize two pointers at the head
- Move slow pointer one step at a time
- Move fast pointer two steps at a time
- If they meet, there's a cycle
- If fast reaches null, there's no cycle

## **Edge Cases Handled**

- Empty list
- Single node list
- List with no cycle
- List with cycle at different positions

## **Complexity Analysis**

- Time Complexity: O(n)
- In worst case, we might need to traverse most of the list
- If there's no cycle, we traverse the entire list once
- If there's a cycle, we'll find it before completing a full cycle
- Space Complexity: O(1)
- Only using two pointers regardless of input size
- No additional data structures needed

## **Why It Works**

- If there's a cycle, the fast pointer will eventually catch up to the slow pointer
- If there's no cycle, the fast pointer will reach the end
- The speed difference ensures they'll meet if a cycle exists

## **Conclusions**

- Would you like me to explain any particular  
  part in more detail or discuss alternative approaches to solving this problem?
