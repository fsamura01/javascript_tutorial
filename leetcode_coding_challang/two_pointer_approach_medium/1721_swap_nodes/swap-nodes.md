# LeetCode 1721 · Swapping Nodes in a Linked List

## A First-Principles Deep Dive

---

## 1. 🧩 Problem Understanding

Imagine you have a train of numbered cars connected together (a linked list). You're given a number `k`.

Your job:

- Find the **k-th car from the front**
- Find the **k-th car from the back**
- **Swap only their values** (not the cars themselves — just relabel them)
- Return the train

**Example with `[1,2,3,4,5]`, `k=2`:**

```Javascript
Front:  1 → [2] → 3 → 4 → 5      ← 2nd from front = node with value 2
Back:   1 → 2 → 3 → [4] → 5      ← 2nd from end   = node with value 4

After swap: 1 → [4] → 3 → [2] → 5  ✓
```

**Key insight:** You are NOT re-linking nodes. You are simply **swapping the `.val` fields** of two nodes. This is a huge simplification!

---

## 2. 🔬 Technical Explanation

> Given a singly linked list of length `n` and an integer `k`, locate the node at **1-indexed position `k`** from the head, and the node at **1-indexed position `n - k + 1`** from the head (i.e., `k`-th from the tail). Mutate the `.val` property of both nodes in-place and return the original head.

The relationship between the two target positions:

```Javascript
Position from front:  k
Position from back:   k  →  which equals position (n - k + 1) from front
```

---

## 3. 📐 Constraints & What They Tell Us

| Constraint | What it implies |
|---|---|
| `1 <= k <= n` | `k` is always valid — no out-of-bounds checking needed |
| `n <= 10^5` | O(n) solution is perfectly fine; O(n²) may TLE |
| `0 <= Node.val <= 100` | Small values — no overflow concerns when swapping |
| Singly linked list | You can only traverse **forward**, never backward |
| Values are swapped (not nodes) | No pointer re-wiring needed — much simpler! |

---

## 4. 🔑 Keyword Highlights

These are the trigger words to memorize for future problems:

```Javascript
"k-th from beginning"   →  🚩 Count k steps from head
"k-th from end"         →  🚩 Two Pointer / Fast-Slow Pointer technique
"linked list"           →  🚩 No random access; must traverse
"swap values"           →  🚩 Just mutate .val, don't re-link
"1-indexed"             →  🚩 Your counter starts at 1, not 0
```

---

## 5. 🪓 Breaking the Problem Into Parts

```Javascript
Step A: Find the k-th node from the FRONT
        → Simply walk k steps from head

Step B: Find the k-th node from the END
        → Use the two-pointer gap technique

Step C: Swap their values
        → A simple 3-line temp variable swap
```

Each part is independently solvable. Together they form the complete solution.

---

## 6. 🧠 Pattern Identification

This problem uses the **Two Pointer (Fast & Slow)** pattern — one of the most common linked list interview patterns.

```Javascript
Why two pointers?
─────────────────
In a singly linked list, you can't go backwards.
So finding the "k-th from end" requires a clever trick:

  ┌─────────────────────────────────────────┐
  │  If you keep two pointers exactly k     │
  │  nodes apart, when the FAST pointer     │
  │  reaches the END, the SLOW pointer      │
  │  is exactly k nodes from the end!       │
  └─────────────────────────────────────────┘
```

**Visual proof with `[1,2,3,4,5]`, `k=2`:**

```Javascript
Start both at head, advance fast by k=2 steps:

fast                            slow
  ↓                               ↓
  1 → 2 → 3 → 4 → 5          1 → 2 → 3 → 4 → 5
  
After k=2 steps, fast is at node(3):
              fast              slow
                ↓                 ↓
  1 → 2 → 3 → 4 → 5          1 → 2 → 3 → 4 → 5

Now advance BOTH until fast reaches null:
                        fast    slow
                          ↓       ↓
  1 → 2 → 3 → 4 → 5    null    node(4)
  
slow is now at the 2nd node from the end ✓
```

---

## 7. 📋 Step-by-Step Approach

```Javascript
STEP 1 — Find the k-th node from FRONT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Start a pointer `front` at head
  • Walk exactly (k-1) steps forward
  • `front` now points to the k-th node from the beginning
  • 💾 SAVE this reference — you'll need it for the swap

STEP 2 — Set up the two-pointer gap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Let `fast` = front.next  (fast is 1 step ahead of front)
  • Let `slow` = head        (slow starts at beginning)
  
  Why? At this moment:
    - front is at position k
    - fast  is at position k+1
    - slow  is at position 1
    - Gap between fast and slow = k nodes

STEP 3 — Advance until fast reaches null
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • While fast != null:
      fast = fast.next
      slow = slow.next
  • When fast is null, the gap is maintained
  • `slow` is now exactly at the k-th node from the END

STEP 4 — Swap the values
━━━━━━━━━━━━━━━━━━━━━━━━
  • temp        = front.val
  • front.val   = slow.val
  • slow.val    = temp

STEP 5 — Return head
━━━━━━━━━━━━━━━━━━━━
  (Head is unchanged since we only swapped values)
```

---

## 8. 💻 Code Implementation

### JavaScript

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
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function(head, k) {

    // ── STEP 1: Find the k-th node from the FRONT ──────────────────────
    let front = head;
    for (let i = 1; i < k; i++) {   // walk (k-1) steps; 1-indexed so stop before k
        front = front.next;
    }
    // `front` is now the k-th node from the beginning

    // ── STEP 2: Set up the two-pointer gap ─────────────────────────────
    let fast = front.next;  // fast is one step ahead of front (position k+1)
    let slow = head;        // slow starts at position 1
    // Current gap between fast and slow = k positions

    // ── STEP 3: Advance both until fast exhausts the list ──────────────
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
        // Gap stays constant at k nodes throughout the traversal
    }
    // `slow` is now the k-th node from the END

    // ── STEP 4: Swap only the VALUES (no pointer re-wiring needed) ──────
    let temp   = front.val;
    front.val  = slow.val;
    slow.val   = temp;

    // ── STEP 5: Return head (structure is unchanged) ────────────────────
    return head;
};
```

---

### Java

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */

class Solution {
    public ListNode swapNodes(ListNode head, int k) {

        // ── STEP 1: Find the k-th node from the FRONT ──────────────────
        ListNode front = head;
        for (int i = 1; i < k; i++) {   // 1-indexed: walk k-1 steps
            front = front.next;
        }
        // `front` is now the k-th node from the beginning

        // ── STEP 2: Set up the two-pointer gap ─────────────────────────
        ListNode fast = front.next;  // fast is at position k+1
        ListNode slow = head;        // slow is at position 1
        // Gap = k positions

        // ── STEP 3: Advance both pointers until fast is exhausted ───────
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
            // Invariant: gap between fast and slow stays at k nodes
        }
        // `slow` is now the k-th node from the END

        // ── STEP 4: Swap only the VALUES ────────────────────────────────
        int temp   = front.val;
        front.val  = slow.val;
        slow.val   = temp;

        // ── STEP 5: Return the (unchanged) head ─────────────────────────
        return head;
    }
}
```

---

## 9. ⏱️ Complexity Analysis

| | Analysis | Reason |
|---|---|---|
| **Time** | **O(n)** | We traverse the list at most twice — once to find `front`, once to advance `fast` and `slow` to the end |
| **Space** | **O(1)** | Only 3 pointers (`front`, `fast`, `slow`) are used regardless of list size |

This is **optimal** — you cannot avoid reading the whole list, so O(n) time is the theoretical minimum.

---

## 10. 🔄 Alternative Approaches

### Approach 2 — Find length first (more intuitive, slightly slower)

```Javascript
1. Traverse entire list → count total length n
2. k-th from end = (n - k + 1)-th from front
3. Walk to both positions separately
4. Swap values

Time:  O(n)  — but 2 full passes (less elegant)
Space: O(1)
```

### Approach 3 — Store all nodes in an array

```Javascript
1. Push all nodes into an array
2. Access array[k-1] and array[n-k] directly (O(1) random access!)
3. Swap their values

Time:  O(n)
Space: O(n)  ← worse; only use if you need random access for many queries
```

> ✅ **The two-pointer approach (our main solution) is the best** — single conceptual pass, O(1) space, and it's the pattern interviewers want to see.

---

## 11. 🏋️ Practice Recommendations

Work through these in order — each one reinforces the same pattern with a twist:

| # | Problem | Pattern | Why It Helps |
|---|---|---|---|
| 19 | Remove Nth Node From End of List | Two Pointer | Same gap trick, but removes instead of swaps |
| 876 | Middle of the Linked List | Fast/Slow Pointer | Builds intuition for pointer gaps |
| 2095 | Delete the Middle Node | Fast/Slow Pointer | Combines both skills above |
| 61 | Rotate List | Two Pointer + Length | Requires finding k-th from end to re-link |
| 143 | Reorder List | Two Pointer + Reverse | The boss version of this pattern |
| 24 | Swap Nodes in Pairs | Linked List Manipulation | Pointer re-wiring instead of value swap |

---

## 🧠 Mental Model Summary

Here's the one-sentence memory trick for each key insight:

> **"Walk `k` steps to find the front target, then use that position as a head-start to let a slow pointer race a fast pointer to find the back target — they'll always finish exactly `k` apart."**

```Javascript
The 3 Phases to remember:
┌──────────────────────────────────────────────────────┐
│  Phase 1: k steps  → Find front target               │
│  Phase 2: Gap setup → fast=front.next, slow=head     │
│  Phase 3: Co-advance → when fast=null, slow=back     │
│  Bonus:   Swap .val (not nodes!) and return head     │
└──────────────────────────────────────────────────────┘
```

The flowchart above visually traces every decision point including the edge case where both pointers land on the **same node** (which happens when `k` lands on the middle node of an odd-length list — swapping with itself is a no-op).
