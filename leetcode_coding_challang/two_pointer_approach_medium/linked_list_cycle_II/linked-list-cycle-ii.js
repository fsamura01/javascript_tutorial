/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    // If the list is empty or has only one node, no cycle possible
    if (!head || !head.next) return null;
    
    // Initialize slow and fast pointers
    let slow = head;
    let fast = head;
    
    // Detect cycle using Floyd's Cycle Detection
    while (fast && fast.next) {
        slow = slow.next;      // Move slow pointer 1 step
        fast = fast.next.next; // Move fast pointer 2 steps
        
        // If pointers meet, a cycle exists
        if (slow === fast) {
            // Reset one pointer to head
            slow = head;
            
            // Move both pointers at same speed
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            
            // Return the start of the cycle
            return slow;
        }
    }
    
    // No cycle found
    return null;
};
