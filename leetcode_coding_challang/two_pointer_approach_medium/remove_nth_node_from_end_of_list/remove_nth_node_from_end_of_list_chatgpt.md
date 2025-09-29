# **19. Remove Nth Node From End of List**

## 🚀 **Problem Breakdown & Solution Guide** 🚀

We will solve **LeetCode 19: Remove Nth Node From End of List** step by step using a structured approach.  

---

## 🧩 **Step 1: Understanding the Problem**  

We are given a **singly linked list** and a number `n`. Our goal is to **remove the nth node from the end** of the list and return the updated list.

### Example Walkthrough

1. **Input:** `head = [1,2,3,4,5], n = 2`
2. **Process:** The second node from the end is `4`. Removing `4` results in `[1,2,3,5]`.
3. **Output:** `[1,2,3,5]`

### Edge Cases

✅ If `n = 1`, we are removing the **last node**.  
✅ If `sz = 1`, we return an **empty list**.  
✅ If removing the **first node**, update `head`.

---

## 📏 **Step 2: Understanding the Constraints**

- The number of nodes **(sz) is between 1 and 30** (small size, so brute force could work).
- The value of each node is between **0 and 100**.
- We must ensure that **1 ≤ n ≤ sz** (valid `n` values).

👉 **Follow-up:** Solve in **one pass**, meaning we cannot traverse the list multiple times.

---

## 🔍 **Step 3: Breaking the Problem Into Manageable Parts**

1. **Find the length** of the linked list (if using two passes).
2. **Identify the node** that needs to be removed.
3. **Adjust pointers** to remove it.
4. **Return the modified list**.

---

## 🔄 **Step 4: Pattern Identification**

This problem can be solved using the **Two Pointers** technique:

- One **fast pointer** moves `n` steps ahead.
- One **slow pointer** starts at the head.
- Move both together until the **fast pointer reaches the end**.
- The **slow pointer now points to the node before the one to be removed**.

**Why Two Pointers?**  
✅ **One-pass solution** (O(n) time complexity).  
✅ **Efficient** (only uses a few extra variables).  

---

## 📝 **Step 5: Approach Discussion**

### 🏆 Optimal Approach: Two-Pointer Technique

1. **Create a dummy node** before the head (useful for edge cases).
2. **Move the `fast` pointer `n` steps ahead**.
3. **Move both `fast` and `slow` pointers** one step at a time.
4. **When `fast` reaches the end, `slow` is at (n+1)th from end**.
5. **Delete the `nth` node** by changing the `next` pointer of `slow`.
6. **Return the new list**.

---

## 💻 **Step 6: Code Implementation (JavaScript)**

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head);
    let slow = dummy, fast = dummy;

    // Move fast pointer n steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // Remove the nth node
    slow.next = slow.next.next;

    return dummy.next;
};
```

---

## ⏳ **Step 7: Complexity Analysis**

- **Time Complexity:** 🕒 `O(n)` (We traverse the list once) ✅  
- **Space Complexity:** 🗄️ `O(1)` (Only a few extra variables) ✅  

---

## 🔄 **Step 8: Alternative Solutions**

### ❌ **Brute Force Approach (Two Passes)**

1. Find the **length** of the linked list (`O(n)`).
2. Locate **(length - n + 1)th** node (`O(n)`).
3. Remove the node.
👉 **Drawback:** Uses **two passes**, not optimal.

### ✅ **Recursive Approach**

```javascript
var removeNthFromEnd = function(head, n) {
    let remove = (node, n) => {
        if (!node) return 0;
        let index = remove(node.next, n) + 1;
        if (index === n + 1) node.next = node.next.next;
        return index;
    };
    
    let dummy = new ListNode(0, head);
    remove(dummy, n);
    return dummy.next;
};
```

👉 **Downside:** Uses **O(n) recursive stack** (not constant space).

---

## 🎯 **Step 9: Practice Recommendations**

To **master the two-pointer pattern**, try these problems:

1. **876. Middle of the Linked List** 🏆
2. **143. Reorder List** 🔄
3. **234. Palindrome Linked List** 🔁
4. **142. Linked List Cycle II** 🌀
5. **328. Odd Even Linked List** 🚀

---

## 🔄 **Step 10: Flowchart Design**

Here's a **Mermaid flowchart** illustrating our **Two Pointers Approach**:

```mermaid
graph TD;
    A[Start] --> B[Create Dummy Node]
    B --> C[Set Fast & Slow to Dummy]
    C --> D[Move Fast N Steps]
    D --> E[Move Both Until Fast Reaches End]
    E --> F[Slow is at (N+1)th Node]
    F --> G[Delete the Nth Node]
    G --> H[Return Modified List]
```

---

## 🎯 **End Goal**

By now, you should:
✅ Understand the **problem statement & constraints**.  
✅ Recognize the **Two Pointers** pattern.  
✅ Implement the **optimal one-pass solution**.  
✅ Know **alternative solutions** & complexity analysis.  
✅ Have **practice problems** to reinforce your learning.  

🔥 **Next Steps:** Try the practice problems & let me know if you need more help! 🚀

### **Why Create a Dummy Node Before the Head?** 🤔

The **dummy node** is a common trick used in linked list problems to **simplify edge cases**. It helps avoid extra conditions when removing the first node.

---

## **🌟 Problems Without a Dummy Node**

Let's consider an example where we remove the first node of the list:

```javascript
head = [1,2,3,4,5], n = 5
```

- The **5th node from the end** is `1` (the first node).
- If we don't use a dummy node, we'd need to **special-case** removing the first node by updating `head`.

Without a dummy node, we'd have to do:

```javascript
if (head === nodeToRemove) {
    head = head.next;
}
```

This makes the code more complex.

---

## **✅ Benefits of Using a Dummy Node**

1. **Handles Head Removal Easily:**  
   - The **first node** can be removed the same way as any other node.
   - No need to check `if head is the node to remove`.

2. **Simplifies Pointer Manipulation:**  
   - `slow.next = slow.next.next;` works **in all cases**, even when removing the first node.

3. **Avoids Edge Cases:**  
   - Works even if `n = size of the list`.
   - Avoids modifying `head` directly.

---

## **🔍 Example With and Without Dummy Node**

### **🚫 Without Dummy Node**

```javascript
var removeNthFromEnd = function(head, n) {
    let slow = head, fast = head;

    // Move fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    // If fast is null, we are deleting the first node
    if (!fast) return head.next;

    // Move slow and fast until fast reaches the end
    while (fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // Remove the node
    slow.next = slow.next.next;
    return head;
};
```

👉 **Issue:** We need to check `if (!fast) return head.next;` separately.

---

### **✅ With Dummy Node**

```javascript
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head);
    let slow = dummy, fast = dummy;

    // Move fast pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // Remove the nth node
    slow.next = slow.next.next;

    return dummy.next;
};
```

👉 **Simpler Code:** No need to check if `head` is being removed.

---

## **🎯 Conclusion**

✅ **Dummy node helps avoid special cases when deleting the head**.  
✅ **Keeps the code cleaner and more readable**.  
✅ **Always return `dummy.next`, ensuring correctness**.  

🔥 **Use a dummy node whenever node deletion could involve the head!** 🚀
