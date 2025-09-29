<!-- To solve the **Linked List Cycle** problem, we can use two approaches: -->
<!-- Detect cycles by keeping track of visited nodes. -->

# **Two-pointer technique (Floyd's Cycle Detection Algorithm)**: Achieve \( O(1) \) space complexity\*\*

## **Here, we will focus on the \***two-pointer technique**\*, as it meets the problem's follow-up requirement.**

---

### **Detailed, Step-by-Step Solution**

#### **Approach: Two-pointer Technique**

- **This algorithm uses two pointers:**
- **Slow pointer**: Moves one step at a time.
- **Fast pointer**: Moves two steps at a time.
- If there’s a cycle, the fast pointer will eventually meet the slow pointer.  
  If there’s no cycle, the fast pointer will reach the end of the list.

#### **Algorithm**

1. Initialize two pointers:
   - `slow` at the head of the list.
   - `fast` at the head of the list.
2. Traverse the list:
   - Move `slow` by one step (`slow = slow.next`).
   - Move `fast` by two steps (`fast = fast.next.next`).
   - If `slow` and `fast` meet, a cycle exists; return `true`.
3. If `fast` reaches the end (`fast === null` or `fast.next === null`),  
   there’s no cycle; return `false`.

---

### **Implementation in JavaScript**

```javascript
function hasCycle(head) {
  if (!head || !head.next) return false; // Empty list or single node, no cycle.

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next; // Move slow by one step.
    fast = fast.next.next; // Move fast by two steps.

    if (slow === fast) {
      // Cycle detected.
      return true;
    }
  }

  return false; // No cycle detected.
}
```

---

### **Complexity Analysis**

1. **Time Complexity: \( O(n) \)**

   - The `slow` pointer moves \( n \) steps at most to cover the list.
   - The `fast` pointer also moves \( n \) steps in total, as it skips nodes.  
     Both pointers traverse at most \( 2n \) steps combined.

1. **Space Complexity: \( O(1) \)**
   - No additional data structures are used; only two pointers are maintained.

---

### **Example Walkthrough**

#### Example 1

```javascript
Input: head = [3, 2, 0, -4]; // Assume it's a linked list with a cycle at pos = 1.
```

```javascript
Linked List:
3 -> 2 -> 0 -> -4
     ^         |
     |_________|

1. Initialize `slow = 3` and `fast = 3`.
2. First iteration:
   - `slow = 2`
   - `fast = 0`
3. Second iteration:
   - `slow = 0`
   - `fast = 2`
4. Third iteration:
   - `slow = -4`
   - `fast = -4` (Pointers meet; cycle detected).
5. Output:
   - `true`
```

#### Example 2

```javascript
head = [1]; // Single node, pos = -1 (no cycle).
```

```javascript
Linked List:
1
1. `fast = null` immediately.
2. Output: false

```

### **Edge Cases**

1. **Empty list** (`head = null`): Return `false`.
2. **Single node without a cycle**: Return `false`.
3. **Single node with a cycle** (node points to itself): Return `true`.

### **Conclusions**

- By following the two-pointer technique, you ensure optimal  
  time and space complexity for detecting cycles in linked lists!
