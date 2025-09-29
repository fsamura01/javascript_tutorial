<!-- I'll help you solve the Linked List Cycle problem with a detailed step-by-step
 solution using both the hash table and Floyd's Cycle Finding Algorithm (tortoise and hare) approaches.
 -->

# ```javascript

/\*\*

- Definition for singly-linked list.
- function ListNode(val) {
-     this.val = val;
-     this.next = null;
- }
  \*/

// Solution 1: Hash Table Approach
function hasCycle1(head) {
// Create a Set to store visited nodes
const visited = new Set();

    // Start from the head
    let current = head;

    // Traverse the linked list
    while (current !== null) {
        // If we've seen this node before, there's a cycle
        if (visited.has(current)) {
            return true;
        }

        // Add current node to visited set
        visited.add(current);

        // Move to next node
        current = current.next;
    }

    // If we reach null, there's no cycle
    return false;

}

// Solution 2: Floyd's Cycle Finding Algorithm (Tortoise and Hare)

function hasCycle2(head) {
// Handle empty list or single node
if (head === null || head.next === null) {
return false;
}

    // Initialize slow and fast pointers
    let slow = head;
    let fast = head;

    // Move through the list
    while (fast !== null && fast.next !== null) {
        // Move slow pointer one step
        slow = slow.next;

        // Move fast pointer two steps
        fast = fast.next.next;

        // If they meet, there's a cycle
        if (slow === fast) {
            return true;
        }
    }

    // If fast reaches null, there's no cycle
    return false;

}

Let's break down both solutions:

Solution 1: Hash Table Approach

1. Create a Set to store visited nodes
2. Traverse the linked list
3. For each node:
   - If the node is already in the Set, return true (cycle found)
   - Otherwise, add the node to the Set and continue
4. If we reach null, return false (no cycle)

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(n) to store the visited nodes

Solution 2: Floyd's Cycle Finding Algorithm

1. Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
2. If they meet, there's a cycle
3. If fast reaches null, there's no cycle

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(1) as we only use two pointers

The Floyd's algorithm (Solution 2) is more space-efficient and answers the follow-up question about using O(1) memory. Here's how it works:

1. If there's no cycle, the fast pointer will reach the end
2. If there's a cycle:
   - The fast pointer will eventually catch up to the slow pointer
   - This happens because the fast pointer moves 2 steps while slow moves 1
   - If they're in a cycle, fast will "lap" slow and they'll meet

Why it works:

- If there's a cycle, the fast pointer will eventually catch up to the slow pointer
- Think of it like a circular track where one runner is moving twice as fast
- The distance between them decreases by 1 node in each iteration
- They must eventually meet if there's a cycle

Edge cases handled:

- Empty list
- Single node
- No cycle
- Cycle at different positions

The Floyd's algorithm is the preferred solution as it:

1. Uses constant space (O(1))
2. Doesn't modify the input
3. Works with all valid inputs
4. Is relatively simple to implement
