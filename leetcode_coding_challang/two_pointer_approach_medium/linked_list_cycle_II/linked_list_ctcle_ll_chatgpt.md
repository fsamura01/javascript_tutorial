# **142. Linked List Cycle II**

## **Step 1: Problem Understanding**  

We are given a singly linked list, and our goal is to determine whether it contains a cycle. If it does, we must return the node where the cycle begins. If there is no cycle, return `null`.  

### **Step 2: Constraints of the Problem**  

- The number of nodes in the list is between **0 and 10⁴**.  
- Node values range from **-10⁵ to 10⁵**.  
- `pos` (the index where the cycle starts) is **-1** if there is no cycle.  
- We **cannot modify the linked list**.  
- We need to find an **O(1) space solution**, meaning we cannot use extra space like a set or dictionary to track visited nodes.  

### **Step 3: Breaking the Problem Into Manageable Parts**  

1. Detect if a cycle exists.  
2. If a cycle exists, determine where the cycle begins.  
3. Return the cycle-start node or `null` if no cycle is found.  

### **Step 4: Pattern Identification**  

This problem can be solved using the **Floyd’s Cycle Detection Algorithm (Tortoise and Hare Algorithm)**, which uses **two pointers**:

- A **slow pointer** that moves one step at a time.  
- A **fast pointer** that moves two steps at a time.  
- If there is a cycle, the fast pointer will eventually meet the slow pointer.  
- If no cycle exists, the fast pointer will reach the end (`null`).  

Once a cycle is detected, we use a mathematical property:  

- If we restart a pointer from `head` while keeping the other at the meeting point, they will meet at the cycle's start.  

### **Step 5: Approach Discussion**  

1. **Detect Cycle:**  
   - Use the Floyd’s Cycle Detection Algorithm (slow and fast pointer).  
   - If the fast pointer reaches `null`, return `null` (no cycle).  
2. **Find Cycle Start:**  
   - If a cycle is detected, reset one pointer to `head`.  
   - Move both pointers one step at a time.  
   - The node where they meet is the start of the cycle.  

---

### **Step 6: Code Implementation (JavaScript)**

```javascript
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

var detectCycle = function(head) {
    let slow = head, fast = head;

    // Step 1: Detect cycle
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {  // Cycle detected
            slow = head;  // Step 2: Find cycle start
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;  // The node where the cycle starts
        }
    }

    return null;  // No cycle detected
};
```

---

### **Step 7: Complexity Analysis**  

- **Time Complexity:**  
  - Detecting the cycle: **O(n)**  
  - Finding the cycle start: **O(n)**  
  - **Total: O(n)**  

- **Space Complexity:**  
  - Since we only use two pointers, **O(1) (constant space)**.  

---

### **Step 8: Alternative Solutions**  

1. **Using a Hash Set (O(n) space):**  
   - Traverse the list while storing nodes in a `Set`.  
   - If we visit a node already in the `Set`, it’s the cycle start.  
   - This approach has **O(n) time but uses extra space**.  

2. **Modifying Nodes (Not Allowed Here):**  
   - Temporarily mark visited nodes (e.g., using a flag or modifying `next`).  
   - This is not allowed in this problem as we **cannot modify the list**.  

---

### **Step 9: Practice Recommendations**  

- **Similar Problems:**  
  - [141. Linked List Cycle (Detect if a cycle exists)](https://leetcode.com/problems/linked-list-cycle/)  
  - [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)  
  - [287. Find the Duplicate Number (Cycle in an array)](https://leetcode.com/problems/find-the-duplicate-number/)  

---

### **Step 10: Flowchart Design**  

Below is a **Mermaid flowchart** that visualizes the solution:  

```mermaid
graph TD;
  A[Start] --> B{Is head null?}
  B -- Yes --> C[Return null]
  B -- No --> D[Initialize slow and fast pointers]
  D --> E{fast and fast.next exist?}
  E -- No --> F[Return null]
  E -- Yes --> G[Move slow by 1, fast by 2]
  G --> H{slow == fast?}
  H -- No --> E
  H -- Yes --> I[Reset slow to head]
  I --> J[Move slow and fast by 1]
  J --> K{slow == fast?}
  K -- No --> J
  K -- Yes --> L[Return slow (Cycle start)]
```

---

### **End Goal**  

By following this guide, you should now:  
✅ Understand the problem and constraints.  
✅ Identify the **Floyd’s Cycle Detection Algorithm** as the best approach.  
✅ Implement the **O(n) time, O(1) space** solution.  
✅ Be able to apply this technique to similar problems.  

Would you like a **dry-run example** to see how the pointers move step-by-step? 🚀
