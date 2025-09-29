# 82. Remove Duplicates from Sorted List II

## 1. Problem Understanding

This problem asks us to remove all nodes from a sorted linked list that have duplicate values. Unlike simply removing duplicates (keeping one copy), here we need to remove **all instances** of any value that appears more than once. Only values that appear exactly once should remain in the final list.

For example, if we have [1,2,3,3,4,4,5]:

- 1 appears once → keep
- 2 appears once → keep
- 3 appears twice → remove all 3s
- 4 appears twice → remove all 4s
- 5 appears once → keep

So the result is [1,2,5].

## 2. Constraints of the Problem

Let's analyze the constraints carefully:

- The list can have 0 to 300 nodes (including empty list)
- Node values range from -100 to 100
- The list is already sorted in ascending order (this is crucial!)

The sorted nature gives us a key advantage: any duplicates will be adjacent to each other in the list. This means we don't need to keep track of all values seen so far - we only need to check neighboring nodes.

## 3. Breaking Down the Problem

Let's break this down into smaller steps:

1. First, we need to handle edge cases: what if the list is empty or has only one node?
2. We need to identify sequences of nodes with the same value
3. When we find duplicates, we need to remove all nodes with that value
4. We need to maintain proper connections in the resulting list
5. Special care needs to be given to handling the head of the list (since it might need to be removed)

## 4. Pattern Identification

This problem involves:

- **Linked List Traversal**: We need to iterate through the list
- **Dummy Node Pattern**: Using a dummy node helps handle the case where the head needs to be removed
- **Two-Pointer Technique**: We'll use a "previous" pointer to help with node removal

## 5. Approach Discussion

Here's my approach:

1. Create a dummy node that points to the head (this helps when the head itself needs to be removed)
2. Use two pointers:
   - `prev`: Points to the node before our current sequence
   - `current`: Traverses the list to identify duplicates

3. For each value in the list:
   - Check if the current node has the same value as the next node
   - If yes (we've found duplicates):
     - Continue advancing `current` until we've passed all nodes with this value
     - Have `prev` point to the node after all duplicates, effectively removing them
   - If no (unique value):
     - Move both `prev` and `current` forward

4. Return the next node after the dummy (which is our new head)

## 6. Code Implementation

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
 * @return {ListNode}
 */
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
```

## 7. Complexity Analysis

- **Time Complexity**: O(n) where n is the number of nodes in the list. We traverse each node at most once.
- **Space Complexity**: O(1) as we only use a constant amount of extra space regardless of input size (just a few pointers).

## 8. Alternative Solutions

An alternative approach could use recursion:

```javascript
function deleteDuplicates(head) {
    // Base case: empty list or single node
    if (!head || !head.next) return head;
    
    // If current node is part of duplicates
    if (head.val === head.next.val) {
        // Skip all nodes with this value
        const duplicateValue = head.val;
        while (head && head.val === duplicateValue) {
            head = head.next;
        }
        // Recursively handle the rest of the list
        return deleteDuplicates(head);
    } else {
        // Current node is unique, keep it and recursively handle the rest
        head.next = deleteDuplicates(head.next);
        return head;
    }
}
```

This solution is also O(n) time but uses O(n) space in the worst case due to the recursion stack.

## 9. Practice Recommendations

For more practice with similar patterns, I recommend:

1. LeetCode #83: "Remove Duplicates from Sorted List" (easier version where you keep one copy)
2. LeetCode #19: "Remove Nth Node From End of List" (another problem using dummy nodes)
3. LeetCode #203: "Remove Linked List Elements" (removing nodes that match a value)
4. LeetCode #86: "Partition List" (rearrangement problem using multiple pointers)
5. LeetCode #2: "Add Two Numbers" (working with two linked lists simultaneously)

## 10. Flowchart Design

## Summary

This problem is a classic example of linked list manipulation that tests your understanding of pointers and node removal. The key insights are:

1. Using a dummy node makes handling the head removal case much simpler
2. We need to identify all duplicates (not just remove duplicates while keeping one copy)
3. The sorted nature of the list means duplicates are always adjacent, simplifying our approach
4. The two-pointer technique gives us the ability to "bridge over" nodes we want to remove

The solution showcases a clean O(n) time and O(1) space approach, which is optimal for this problem. When practicing similar problems, focus on proper pointer manipulation and edge case handling, as these are the aspects most interviewers will be looking for.

Would you like me to explain any particular part of the solution in more detail?
