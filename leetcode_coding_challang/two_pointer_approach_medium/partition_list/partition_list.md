# Understanding 86 Partition List Problem

## 1. Problem Understanding

This problem asks us to reorder a linked list based on a pivot value `x`. We need to create two partitions:

- All nodes with values less than `x` should appear before
- All nodes with values greater than or equal to `x` should appear after

Importantly, we need to preserve the relative order of nodes within each partition. This means we're not sorting the list - we're just separating it into two ordered sections.

For example, with input `[1,4,3,2,5,2]` and `x = 3`:

- Nodes with values less than 3: `[1,2,2]`
- Nodes with values greater than or equal to 3: `[4,3,5]`
- Result after partition: `[1,2,2,4,3,5]`

## 2. Constraints Analysis

Let's analyze the constraints:

- The list may contain 0 to 200 nodes
- Node values range from -100 to 100
- The pivot value x ranges from -200 to 200

These constraints tell us:

- We need to handle an empty list as a special case
- We need to handle negative values correctly
- The pivot value could be outside the range of actual node values (which would result in all nodes being in one partition)

## 3. Breaking Down the Problem

We can break this problem into these steps:

1. Create two separate lists: one for nodes < x and another for nodes ≥ x
2. Maintain the original order within each list as we build them
3. Connect the two lists together at the end
4. Return the head of the combined list

## 4. Pattern Identification

This problem uses the **two-pointer technique** with a twist. Instead of using pointers that move through the list, we'll use two separate linked lists to build our solution and then join them.

The pattern can be described as:

- **Partition/Segregation Pattern**: Separating elements into groups based on a condition while preserving order within groups

## 5. Approach Discussion

Here's a step-by-step approach:

1. Create two dummy head nodes - one for the "smaller values" list and one for the "greater/equal values" list
2. Create two pointers (`smallTail` and `largeTail`) to track the end of each list
3. Traverse the original linked list with a pointer, and for each node:
   - If the value is less than x, add it to the end of the smaller values list
   - Otherwise, add it to the end of the greater/equal values list
4. Connect the tail of the smaller values list to the head of the greater/equal values list
5. Set the tail of the greater/equal values list to null (to avoid cycles)
6. Return the head of the smaller values list (which is the new head of the entire list)

This approach ensures we maintain the original relative ordering within each partition.

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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    // Edge case: empty list
    if (!head) return null;
    
    // Create dummy heads for our two partitions
    let smallerDummy = new ListNode(0);
    let greaterDummy = new ListNode(0);
    
    // Pointers to the tails of our two partitions
    let smallerTail = smallerDummy;
    let greaterTail = greaterDummy;
    
    // Traverse the original list
    let current = head;
    while (current) {
        if (current.val < x) {
            // Add to smaller partition
            smallerTail.next = current;
            smallerTail = smallerTail.next;
        } else {
            // Add to greater/equal partition
            greaterTail.next = current;
            greaterTail = greaterTail.next;
        }
        current = current.next;
    }
    
    // Connect the smaller partition to the greater partition
    smallerTail.next = greaterDummy.next;
    
    // Important: set the tail of the greater partition to null to avoid cycles
    greaterTail.next = null;
    
    // Return the head of the smaller partition (which is now the head of the entire list)
    return smallerDummy.next;
};
```

## 7. Complexity Analysis

- **Time Complexity**: O(n) where n is the number of nodes in the linked list. We traverse the list once, doing constant work for each node.
- **Space Complexity**: O(1) because we're only using a fixed number of pointers regardless of input size. We're not creating new nodes - just rearranging the existing ones.

## 8. Alternative Solutions

One alternative approach would be to create entirely new nodes for each value, which would give us O(n) space complexity. However, the approach we took is more efficient as it maintains the original nodes and just relinks them.

Another variation could be to do this in-place without dummy nodes, but that approach would be more error-prone and harder to implement correctly.

## 9. Practice Recommendations

Here are similar problems that use related patterns:

1. "21. Merge Two Sorted Lists" - Uses dummy nodes and linked list manipulation
2. "328. Odd Even Linked List" - Uses partition pattern while maintaining order
3. "2. Add Two Numbers" - Uses dummy head technique
4. "143. Reorder List" - Involves splitting and recombining lists
5. "148. Sort List" - More complex reordering using merge sort

## 10. Flowchart Design

## Summary: Key Takeaways

The "Partition List" problem teaches us several important concepts:

1. **Two-List Approach**: Creating separate lists and then joining them is a powerful technique for reorganizing linked lists while preserving relative order.

2. **Dummy Nodes**: Using dummy head nodes simplifies edge cases and makes the code cleaner by avoiding special handling for the first node.

3. **In-Place Rearrangement**: The solution modifies the original list nodes rather than creating new ones, which optimizes space complexity.

4. **Partition Pattern**: This is a common pattern where we need to group elements based on some criteria while maintaining original order within groups.

5. **Null Termination**: Remember to properly terminate linked lists to avoid cycles, especially when reconnecting nodes.

The most elegant aspect of this solution is how it maintains O(1) space complexity while still clearly separating the logical partitions. Understanding this pattern will help you solve many linked list problems that involve rearrangement based on certain criteria.

Would you like me to explain any part of this solution in more detail?

**You're right to question how we can deduce these constraints from the problem statement. Let's analyze them more carefully:**

## **constraints analysis**

### **1. We need to handle an empty list as a special case**

This comes directly from the problem constraints that state: "The number of nodes in the list is in the range [0, 200]." The lower bound of 0 explicitly tells us that we need to handle empty lists where no nodes exist. Our code accounts for this with the check `if (!head) return null;` at the beginning.

### **2. We need to handle negative values correctly**

The problem states: "-100 <= Node.val <= 100" which tells us that node values can be negative (as low as -100). This doesn't actually require special handling in our algorithm since the comparison operation `current.val < x` works correctly with negative values. The comparison logic remains the same whether values are positive or negative - we're just checking if each value is less than our pivot.

### **3. The pivot value could be outside the range of actual node values**

This comes from the constraint: "-200 <= x <= 200" compared with the node value range of "-100 <= Node.val <= 100". The pivot x can potentially be:

- Less than or equal to -100: In this case, no nodes would go into the "less than x" partition
- Greater than or equal to 100: In this case, all nodes would go into the "less than x" partition

This observation doesn't change our algorithm, but it helps understand potential edge cases. Our solution works correctly even when all nodes end up in one partition because:

- If all nodes are in the "smaller" partition, the greaterDummy.next will be null
- If all nodes are in the "greater" partition, the smallerDummy.next will be null

The solution design with two separate partitions naturally handles these scenarios without additional special cases.

The constraints help us understand what kinds of inputs the solution needs to handle, though in this particular problem, our algorithm design handles all these variations elegantly without needing special code branches. This is a nice property of the two-list approach with dummy nodes - it gracefully handles all these edge cases with the same unified logic.
