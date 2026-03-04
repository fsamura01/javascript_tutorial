# CODING INTERVIEW STUDY NOTES

  LeetCode #1721 — Swapping Nodes in a Linked List
  Pattern: Two Pointers (Gap Technique) | Difficulty: Medium

----------------------------------------------------------------

1. PROBLEM STATEMENT

----------------------------------------------------------------

You are given the head of a linked list and an integer k.
Return the head of the linked list after swapping the VALUES
of the kth node from the beginning and the kth node from
the end (the list is 1-indexed).

Example 1:
  Input:  head = [1,2,3,4,5], k = 2
  Output: [1,4,3,2,5]
  Explanation:
    2nd from beginning = node 2
    2nd from end       = node 4
    Swap their values  → [1,4,3,2,5]

Example 2:
  Input:  head = [7,9,6,6,7,8,3,0,9,5], k = 5
  Output: [7,9,6,6,8,7,3,0,9,5]

Constraints:

- 1 <= k <= n <= 10^5
- 0 <= Node.val <= 100

----------------------------------------------------------------

1. CLARIFYING QUESTIONS & ANSWERS

----------------------------------------------------------------

Q: What is a linked list? How is it different from an array?
A: A linked list connects nodes together where each node
   points to the next node.

   Array:       [1, 2, 3, 4, 5]
                → stored in continuous memory
                → can access any element directly by index O(1)

   Linked List: 1 → 2 → 3 → 4 → 5 → null
                → must TRAVERSE from head to reach any element
                → no direct index access! Always start from head

Q: Why swap VALUES and not nodes themselves?
A: Swapping nodes means rewiring all the .next pointers —
   complex and error-prone. Swapping values means we just
   change two numbers — much simpler!

Q: How do we find kth from beginning?
A: Traverse k-1 steps from head.

Q: How do we find kth from end without knowing length?
A: Use the GAP TECHNIQUE with two pointers:

- Move pointer1 to kth node from beginning
- Start pointer2 at head
- Move BOTH until pointer1.next = null
- pointer2 is now at kth node from end!

----------------------------------------------------------------

1. KEY CONCEPT: LINKED LIST TRAVERSAL

----------------------------------------------------------------

Since we can't access nodes by index like an array, we must
traverse from head using .next pointers:

  head → node1 → node2 → node3 → null
   ↑
  start here always

To move k steps:
  pointer = head          (step 1 — already here)
  for i from 1 to k-1:
    pointer = pointer.next  (move one step forward)

----------------------------------------------------------------

1. PATTERN: TWO POINTERS — GAP TECHNIQUE

----------------------------------------------------------------

The gap technique maintains a FIXED DISTANCE between two
pointers as they move through the list together.

How it finds kth from end:
  Step 1: Move pointer1 to kth node from beginning
          → pointer1 is now k steps ahead of head

  Step 2: Start pointer2 at head
          Move BOTH simultaneously until pointer1.next = null

  Step 3: pointer2 is now at kth node from end!

WHY IT WORKS:
  pointer1 starts k steps ahead of pointer2.
  They maintain this k-step gap as they move together.
  When pointer1 reaches the last node (pointer1.next = null),
  pointer2 is exactly k steps behind → kth from end!

Example with [1,2,3,4,5], k=2:

  After Step 1:
    1 → 2 → 3 → 4 → 5 → null
        ↑
      pointer1 (2nd from beginning)

  Moving both pointers:
    Move 1: pointer1=3, pointer2=2
    Move 2: pointer1=4, pointer2=3
    Move 3: pointer1=5, pointer2=4  ← pointer1.next=null STOP!

  pointer2 = node 4 = 2nd from end ✅

----------------------------------------------------------------

1. BRUTE FORCE vs OPTIMIZED

----------------------------------------------------------------

  Approach   | Array Conversion         | Two Pointers (Optimized)
  -----------|--------------------------|-------------------------
  Method     | Convert to array,        | Gap technique,

             | swap by index,           | single pass
             | rebuild list             |
  Time       | O(n)                     | O(n)
  Space      | O(n) — extra array ❌   | O(1) — just pointers ✅

Array approach index formulas:
  kth from beginning → arr[k-1]   (adjust for 0-indexing)
  kth from end       → arr[n-k]

----------------------------------------------------------------

1. PSEUDOCODE

----------------------------------------------------------------

>function swapNodes(head, k):
>
> // Step 1: Move pointer1 k-1 steps to find kth from beginning
> pointer1 = head
> for i from 1 to k-1:
> pointer1 = pointer1.next
>
> // Step 2: Save reference to kth from beginning
> frontNode = pointer1
>
> // Step 3: Start pointer2 at head
> // Move BOTH until pointer1.next hits null
> pointer2 = head
> while pointer1.next != null:
> pointer1 = pointer1.next
> pointer2 = pointer2.next
>
> // Step 4: pointer2 is now kth from end
> endNode = pointer2
>
> // Step 5: Swap values
> temp = frontNode.val
> frontNode.val = endNode.val
> endNode.val = temp
>
> return head

NOTE: Why pointer1.next != null instead of pointer1 != null?
  pointer1 != null    → pointer2 overshoots by 1 step ❌
  pointer1.next != null → pointer2 lands exactly on kth from end ✅

  Example [1,2,3,4,5], k=2:
    pointer1 != null     → pointer2 ends at node 5 ❌
    pointer1.next != null → pointer2 ends at node 4 ✅

----------------------------------------------------------------

1. DRY RUN — Example 1

----------------------------------------------------------------

Input: head = [1,2,3,4,5], k = 2

Step 1: Move pointer1 k-1=1 step from head:
  pointer1 starts at node 1
  i=1: pointer1 = node 2
  frontNode = node 2 ✅

Step 2: pointer2 starts at head = node 1
  Move both until pointer1.next = null:

  State        | pointer1 | pointer2 | p1.next
  -------------|----------|----------|--------
  Start        |  node 2  |  node 1  | node 3 (not null, move)
  After move 1 |  node 3  |  node 2  | node 4 (not null, move)
  After move 2 |  node 4  |  node 3  | node 5 (not null, move)
  After move 3 |  node 5  |  node 4  | null → STOP!

  endNode = pointer2 = node 4 ✅

Step 3: Swap values:
  temp = frontNode.val = 2
  frontNode.val = endNode.val = 4
  endNode.val = temp = 2

Result: 1 → 4 → 3 → 2 → 5 → null ✅ matches expected output!

----------------------------------------------------------------

1. EDGE CASES

----------------------------------------------------------------

- k = 1        → swap first and last nodes
                   algorithm handles naturally ✅

- Single node  → frontNode and endNode point to same node
                   swapping with itself → no change ✅

- k points to  → frontNode and endNode point to same node
    middle node     swapping with itself → no change ✅
    (e.g. k=2 in
    [1,2,3])

All edge cases handled naturally — no special cases needed!

----------------------------------------------------------------

1. FINAL JAVASCRIPT SOLUTION

----------------------------------------------------------------

```JavaScript
  var swapNodes = function(head, k) {
    // Step 1: Find kth node from beginning
    let pointer1 = head;
    for (let i = 1; i < k; i++) {
    pointer1 = pointer1.next;   // move k-1 steps
    }
    const frontNode = pointer1;   // save kth from beginning

    // Step 2: Find kth node from end using gap technique
    let pointer2 = head;
    while (pointer1.next !== null) {
      pointer1 = pointer1.next;   // move toward end
      pointer2 = pointer2.next;   // maintain k-step gap
    }
    const endNode = pointer2;     // kth from end

    // Step 3: Swap values
    const temp = frontNode.val;
    frontNode.val = endNode.val;
    endNode.val = temp;

    return head;
};

```

----------------------------------------------------------------

1. COMPLEXITY ANALYSIS

----------------------------------------------------------------

  Time:  O(n)
         - Finding kth from beginning  → O(k)
         - Moving both pointers        → O(n-k)
         - Total                       → O(n)
         - Single pass through list! ✅

  Space: O(1)
         - Only two pointers and temp variable
         - No extra data structures

----------------------------------------------------------------

1. REFLECTION — KEY LESSONS

----------------------------------------------------------------

PATTERN USED:
> Two Pointers — specifically the GAP TECHNIQUE where we
> maintain a fixed distance between two pointers

KEY INSIGHT:
> By starting pointer1 at head and pointer2 at head, but with
> pointer1 already k steps ahead, when pointer1 reaches the end,
> pointer2 is automatically k steps from the end — finding kth
> from end in a SINGLE PASS without knowing the list length!

LINKED LIST vs ARRAY:
> Array:       arr[k] → direct access O(1)
>
> Linked List: must traverse from head → O(n)
               always start from head using .next pointers

GAP TECHNIQUE APPLICATIONS:

>- Find kth node from end of linked list
>- Detect a loop in linked list (Floyd's Cycle Detection)
>- Find middle of linked list (slow/fast pointer)
>- Remove nth node from end of linked list
>- Merge two sorted linked lists

COMMON MISTAKES TO AVOID:

- Using pointer1 != null instead of pointer1.next != null
    (causes pointer2 to overshoot by one step)
- Forgetting loop runs k-1 times (start AT head = step 1)
- Trying to swap nodes instead of values
    (swapping nodes requires rewiring .next pointers)
- Forgetting linked lists have no direct index access
