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
    
    // Count the length of the linked list
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    
    // Create a dummy head to facilitate the merging process
    const dummy = new ListNode(0);
    dummy.next = head;
    
    // Bottom-up merge sort
    // We start by merging sublists of size 1, then 2, 4, 8, ... until we sort the entire list
    for (let size = 1; size < length; size *= 2) {
        let prev = dummy;
        current = dummy.next;
        
        // Merge sublists of current size
        while (current) {
            // Get the first sublist of current size
            let left = current;
            let right = split(left, size);
            
            // Get the second sublist of current size
            current = split(right, size);
            
            // Merge the two sublists and connect with the previous part
            prev = mergeLists(left, right, prev);
        }
    }
    
    return dummy.next;
};

/**
 * Split the linked list and return the head of the second half
 * @param {ListNode} head - Head of the list to split
 * @param {number} size - Size of the first half
 * @return {ListNode} - Head of the second half
 */
function split(head, size) {
    if (!head) return null;
    
    // Move to the end of the first half
    for (let i = 1; head.next && i < size; i++) {
        head = head.next;
    }
    
    const secondHalf = head.next;
    head.next = null;  // Cut the list
    return secondHalf;
}

/**
 * Merge two sorted lists and connect to the previous segment
 * @param {ListNode} left - First sorted list
 * @param {ListNode} right - Second sorted list
 * @param {ListNode} prev - Node to connect the merged result to
 * @return {ListNode} - The last node of the merged list
 */
function mergeLists(left, right, prev) {
    let current = prev;
    
    // Standard merge of two sorted lists
    while (left && right) {
        if (left.val < right.val) {
            current.next = left;
            left = left.next;
        } else {
            current.next = right;
            right = right.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes
    current.next = left ? left : right;
    
    // Move to the end of the merged list
    while (current.next) {
        current = current.next;
    }
    
    return current;
}
