# Problem 19: Remove Nth Node From End of List

## 1. Problem Understanding

This problem asks us to remove the nth node from the end of a linked list and return the modified list. Let's break this down:

- We have a singly linked list where each node points to the next node
- We need to remove the node that is n positions from the end
- After removal, we need to return the head of the modified list

For example, if we have [1,2,3,4,5] and n=2, we need to remove the 2nd node from the end, which is node 4. The result would be [1,2,3,5].

Key edge cases to consider:

- If n equals the length of the list, we need to remove the head
- If the list has only one node and n=1, we return an empty list

## 2. Breaking Down The Problem

To solve this problem, we need to:

1. Find the node that is n positions from the end
2. Remove this node by adjusting the pointers in the list
3. Handle edge cases properly (removing head, empty list, etc.)

The challenge is that in a singly linked list, we don't have backward pointers, so it's not straightforward to count from the end.

## 3. Pattern Identification

This problem can be elegantly solved using the **Two Pointer Technique**. Specifically, we'll use a fast and slow pointer with a gap of n nodes between them.

## 4. Approach Discussion

Here's how we'll approach it:

1. Initialize two pointers, `fast` and `slow`, both pointing to the head of the list
2. Advance the `fast` pointer n steps ahead
3. If `fast` becomes null, it means we need to remove the head node
4. Otherwise, move both `fast` and `slow` pointers forward until `fast` reaches the end of the list
5. At this point, `slow` will be pointing to the node just before the one we want to remove
6. Adjust the `next` pointer of `slow` to skip the node to be removed
7. Return the head of the modified list

This approach requires only a single pass through the list, which satisfies the follow-up question.

## 5. Code Implementation

Let's implement this solution in JavaScript:

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // Create a dummy node to handle edge cases more elegantly
    let dummy = new ListNode(0);
    dummy.next = head;
    
    // Initialize fast and slow pointers
    let fast = dummy;
    let slow = dummy;
    
    // Advance fast pointer n+1 steps ahead
    // The +1 is because we want slow to point to the node BEFORE the one to remove
    for (let i = 0; i <= n; i++) {
        // If n is the size of the list, fast will be null after n steps
        if (!fast) break;
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches the end
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // Skip the node to be removed
    slow.next = slow.next.next;
    
    // Return the head of the modified list
    return dummy.next;
};
```

## 6. Complexity Analysis

- **Time Complexity**: O(L), where L is the length of the linked list. We traverse the list at most twice - once to advance the fast pointer and once to move both pointers.
- **Space Complexity**: O(1), as we only use a constant amount of extra space regardless of the input size.

## 7. Alternative Solutions

### Alternative 1: Count the Length First

We could solve this in two passes:

1. First pass: Count the total number of nodes (length)
2. Second pass: Traverse to the (length - n - 1)th node and remove the next node

This is less elegant but might be more intuitive for beginners.

### Alternative 2: Using a Stack

We could push all nodes onto a stack while traversing, then pop n elements and remove the next node. This would use O(L) extra space.

## 8. Practice Recommendations

If you find this Two Pointer technique helpful, here are similar problems to practice:

1. LeetCode #876: Middle of the Linked List
2. LeetCode #141: Linked List Cycle
3. LeetCode #142: Linked List Cycle II
4. LeetCode #160: Intersection of Two Linked Lists
5. LeetCode #234: Palindrome Linked List

## 9. Flowchart Design

## Key Insights

The Two Pointer technique is extremely powerful for linked list problems. In this case, it allows us to find a position relative to the end of the list in a single pass. The key insight is creating a gap of exactly n nodes between the two pointers so that when the fast pointer reaches the end, the slow pointer is positioned exactly where we need it.

The use of a dummy node is also an important pattern in linked list problems. It simplifies edge cases (especially when we might need to remove the head) by giving us a consistent starting point.

Remember that linked list problems often revolve around carefully managing pointers and their relationships. Drawing out the list and tracing pointer movements can be incredibly helpful when solving these problems.

Is there any particular part of this problem you'd like me to explain in more detail?
