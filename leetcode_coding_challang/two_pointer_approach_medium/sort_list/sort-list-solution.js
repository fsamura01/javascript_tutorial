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
var sortList = function(head) {
    // Base case: if list is empty or has only one node, it's already sorted
    if (!head || !head.next) {
        return head;
    }
    
    // Step 1: Find the middle of the linked list
    let slow = head;
    let fast = head;
    let prev = null;
    
    // Using fast & slow pointer technique to find the middle
    while (fast && fast.next) {
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }
    
    // Cut the list into two halves
    prev.next = null;
    
    // Step 2: Recursively sort both halves
    const leftHalf = sortList(head);
    const rightHalf = sortList(slow);
    
    // Step 3: Merge the sorted halves
    return merge(leftHalf, rightHalf);
};

/**
 * Helper function to merge two sorted linked lists
 * @param {ListNode} l1 - First sorted linked list
 * @param {ListNode} l2 - Second sorted linked list
 * @return {ListNode} - Merged sorted linked list
 */
function merge(l1, l2) {
    // Create a dummy node to serve as the head of our merged list
    const dummy = new ListNode(-1);
    let current = dummy;
    
    // Compare nodes from both lists and add the smaller one to the merged list
    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    // Attach any remaining nodes
    if (l1) {
        current.next = l1;
    }
    if (l2) {
        current.next = l2;
    }
    
    // Return the head of the merged list (skip the dummy node)
    return dummy.next;
}
