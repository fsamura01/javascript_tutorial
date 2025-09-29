/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head - Head of the linked list
 * @param {number} k - Number of places to rotate
 * @return {ListNode} - Head of the rotated linked list
 */
function rotateRight(head, k) {
    // Edge cases: empty list, single node, or no rotation needed
    if (!head || !head.next || k === 0) return head;
    
    // Step 1: Count the length of the list
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Step 2: Calculate effective rotation (k could be larger than length)
    k = k % length;
    
    // If k is 0 after taking modulo, no rotation is needed
    if (k === 0) return head;
    
    // Step 3: Find the new tail node (which will be the (length-k)th node)
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next;
    }
    
    // Step 4: Rearrange pointers to rotate the list
    // Store the new head (node after new tail)
    let newHead = newTail.next;
    
    // Connect the original tail to the original head (creating a cycle)
    tail.next = head;
    
    // Break the list at the new tail
    newTail.next = null;
    
    return newHead;
}
