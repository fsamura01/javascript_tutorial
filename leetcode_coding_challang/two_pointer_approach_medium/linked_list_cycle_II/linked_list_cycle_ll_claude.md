# **142. Linked List Cycle II**

Let's solve the "Linked List Cycle II" problem step by step, focusing on the underlying problem-solving strategies.

## **1. Problem Understanding**

The problem asks us to detect and locate the node where a cycle begins in a linked list. A cycle exists when a node in the list points back to a previous node, creating a loop. The key challenges are:

- Detecting the presence of a cycle
- Finding the exact node where the cycle starts
- Doing this with O(1) extra memory

## **2. Constraints Analysis**

- List size: 0 to 10,000 nodes
- Node values: -10^5 to 10^5
- Constant extra memory required
- Cannot modify the original linked list

## **3. Problem Breakdown**

The problem can be broken down into two main sub-problems:

1. Detect if a cycle exists in the linked list
2. If a cycle exists, find the node where the cycle begins

## **4. Pattern Identification**

This problem is a classic example of the **Two Pointer (Floyd's Cycle Detection)** pattern, also known as the "Tortoise and Hare" algorithm. This technique is typically used for:

- Cycle detection in linked lists
- Finding the start of a cycle
- Solving problems with O(1) space complexity

## **5. Approach Discussion**

The solution involves two key steps:

### **Cycle Detection**

1. Use two pointers:
   - Slow pointer (moves 1 step at a time)
   - Fast pointer (moves 2 steps at a time)
2. If they meet, a cycle exists

### **Cycle Start Identification**

1. When the pointers meet, reset one pointer to the head
2. Move both pointers one step at a time
3. The point where they meet is the cycle's start

## **6. Code Implementation**

Let's implement the solution in JavaScript:

```javascript
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
```

## **7. Complexity Analysis**

### **Time Complexity: O(n)**

- First phase (cycle detection): O(n)
- Second phase (finding cycle start): O(n)
- Total: O(n)

### **Space Complexity: O(1)**

- Only two pointers used, regardless of list size
- Meets the follow-up challenge of constant extra memory

## **8. Alternative Solutions**

While Floyd's Cycle Detection is the most optimal solution, alternative approaches include:

1. Hash Set Approach (O(n) time, O(n) space)
   - Store visited nodes in a set
   - Check if a node is revisited
2. Marking Nodes (not recommended as it modifies the list)
   - Mark nodes as visited
   - Check for already marked nodes

## **9. Practice Recommendations**

Similar LeetCode problems to practice:

1. Linked List Cycle (simpler version)
2. Find the Duplicate Number
3. Happy Number
4. Intersection of Two Linked Lists

## **10. Flowchart Visualization**

Let's create a flowchart to illustrate the algorithm:

## **Key Insights and Problem-Solving Strategies**

### **Mental Model**

Think of the two pointers like two runners on a track:

- Slow runner moves at a steady pace
- Fast runner moves twice as quickly
- If there's a loop, they'll eventually meet

### **Intuition Behind the Algorithm**

1. First phase detects if a cycle exists
2. Second phase precisely locates the cycle's start
3. Mathematical proof involves understanding the distances traveled by slow and fast pointers

### **Interview Tips**

- Explain your thought process
- Discuss trade-offs between different approaches
- Demonstrate understanding of space and time complexity
- Show you can optimize beyond the naive solution

### **Common Pitfalls to Avoid**

- Forgetting to handle edge cases (empty list, single node)
- Misunderstanding the two-phase approach
- Not carefully tracking pointer movements

## **Learning Objectives Achieved**

- Understand Floyd's Cycle Detection algorithm
- Recognize Two Pointer pattern applications
- Solve linked list cycle problem with optimal complexity
- Develop systematic problem-solving approach

Would you like me to elaborate on any part of the solution or discuss the underlying concepts in more depth?
