<!-- To solve the problem of finding the intersection of two singly linked lists efficiently,
we can use an elegant two-pointer approach. Here's a step-by-step explanation and solution: -->

# **Linked lists Intersection**

## **Approach**

1. **Problem Insight**:

   - Two singly linked lists can intersect at a certain node if they share some part of their structure after the intersection.
   - If they do not intersect, their end nodes will differ.

2. **Key Idea**:

   - Use two pointers, `pointerA` and `pointerB`, starting at `headA` and `headB`, respectively.
   - Traverse each list. When a pointer reaches the end of its list, redirect it to the head of the other list.
   - This ensures that both pointers traverse an equal total length, including the non-overlapping and overlapping parts.
   - If the lists intersect, the two pointers will eventually meet at the intersection node.
   - If they do not intersect, both pointers will reach `null`.

3. **Complexity**:
   - **Time Complexity**: \( O(m + n) \), where \( m \) and \( n \) are the lengths of the two lists.
   - **Space Complexity**: \( O(1) \), as we only use two pointers and no extra data structures.

---

## **JavaScript Implementation**

```javascript
function getIntersectionNode(headA, headB) {
  // If either list is empty, there's no intersection
  if (!headA || !headB) return null;

  // Initialize two pointers
  let pointerA = headA;
  let pointerB = headB;

  // Traverse both lists
  while (pointerA !== pointerB) {
    // When pointerA reaches the end, redirect it to headB
    pointerA = pointerA ? pointerA.next : headB;

    // When pointerB reaches the end, redirect it to headA
    pointerB = pointerB ? pointerB.next : headA;
  }

  // Either they meet at the intersection node or both are null (no intersection)
  return pointerA;
}
```

---

## **Explanation of Code**

1. **Initialization**:

   - `pointerA` starts at `headA`, and `pointerB` starts at `headB`.

2. **Traversal**:

   - Both pointers traverse their respective lists.
   - When a pointer reaches the end of its list, it is redirected to the head of the other list.
   - This ensures both pointers traverse the same total length.

3. **Meeting Point**:

   - If there is an intersection, `pointerA` and `pointerB` will meet at the intersection node.
   - If there is no intersection, they will both eventually reach `null`.

4. **Return**:
   - The function returns the node where they meet or `null` if no intersection exists.

---

## **Example Walkthrough**

### **Example 1**

- **Input**:
  - `listA = [4,1,8,4,5]`, `listB = [5,6,1,8,4,5]`
  - Intersection at node with value `8`.
- **Execution**:
  - `pointerA` and `pointerB` traverse the lists and redirect at the ends.
  - They meet at the node with value `8`.
- **Output**:
  - `Node with value 8`.

### **Example 2**

- **Input**:
  - `listA = [1,9,1,2,4]`, `listB = [3,2,4]`
  - Intersection at node with value `2`.
- **Execution**:
  - Both pointers meet at node `2`.
- **Output**:
  - `Node with value 2`.

### **Example 3**

- **Input**:
  - `listA = [2,6,4]`, `listB = [1,5]`
  - No intersection.
- **Execution**:
  - Both pointers reach `null`.
- **Output**:
  - `null`.

---

### **Complexity Analysis**

1. **Time Complexity**:

   - Each pointer traverses both lists once.
   - Total traversed length = \( m + n \).
   - Time Complexity: \( O(m + n) \).

2. **Space Complexity**:
   - We only use two pointers.
   - Space Complexity: \( O(1) \).

---

This solution satisfies the problem constraints and achieves the required \( O(m + n) \) time and \( O(1) \) space.

<!-- To solve the problem **Intersection of Two Linked Lists** in **JavaScript**, let’s create an efficient solution with a detailed explanation, including complexity analysis. -->

---

### **Optimal Approach: Two-Pointer Technique**

The key idea is to traverse both linked lists simultaneously using two pointers. By ensuring both pointers traverse the same total length (sum of both lists' lengths), they will either meet at the intersection point or at the end of the lists (if there is no intersection).

---

### **Steps**

#### 1. **Initial Setup**

- Use two pointers, `pA` and `pB`, initialized to the heads of the two linked lists, `headA` and `headB`.

#### 2. **Traverse the Lists**

- Traverse through the two lists using the two pointers.
- When a pointer reaches the end of a list, redirect it to the head of the other list.
  This ensures both pointers traverse the same total distance.

#### 3. **Check for Intersection**

- If the two lists intersect, the pointers will meet at the intersection node after traversing an equal total length.
- If there is no intersection, both pointers will eventually reach `null` at the same time, and the function will return `null`.

#### 4. **Return the Result**

- Return the node where the pointers meet, or `null` if there is no intersection.

---

### **Code Implementation**

Here’s the JavaScript implementation:

```javascript
var getIntersectionNode = function (headA, headB) {
  // Initialize two pointers to the heads of the two lists
  let pA = headA;
  let pB = headB;

  // Traverse both lists
  while (pA !== pB) {
    // If pA reaches the end of list A, switch to headB
    pA = pA === null ? headB : pA.next;
    // If pB reaches the end of list B, switch to headA
    pB = pB === null ? headA : pB.next;
  }

  // Either they meet at the intersection node or at null
  return pA;
};
```

---

### **Example Walkthrough\_**

#### **Example Input:**

```plaintext
listA = [4, 1, 8, 4, 5]
listB = [5, 6, 1, 8, 4, 5]
Intersection at value: 8
```

#### **Execution:**

1. Initialize `pA` at `headA` and `pB` at `headB`.
2. Traverse both lists:

   - **Iteration 1**:  
     `pA = 4`, `pB = 5` → No match.
   - **Iteration 2**:  
     `pA = 1`, `pB = 6` → No match.
   - **Iteration 3**:  
     `pA = 8`, `pB = 1` → No match.
   - **Iteration 4**:  
     `pA = 4`, `pB = 8` → No match.
   - **Iteration 5**:  
     `pA = 5`, `pB = 4` → No match.
   - **Iteration 6**:  
     `pA = null`, `pB = 5` → Redirect `pA` to `headB`.
   - **Iteration 7**:  
     `pA = 5`, `pB = null` → Redirect `pB` to `headA`.
   - **Iteration 8**:  
     `pA = 6`, `pB = 4` → No match.
   - **Iteration 9**:  
     `pA = 1`, `pB = 1` → No match.
   - **Iteration 10**:  
     `pA = 8`, `pB = 8` → Match found.

3. Return the intersecting node (`8`).

---

### **Complexity Analysis\_**

#### **Time Complexity: O(m + n)**

- Both pointers traverse the combined length of the two lists. Each pointer makes at most two passes through the lists:
  - First pass: Traverse their own lists.
  - Second pass: Traverse the other list.
- Hence, the time complexity is linear in the sum of the lengths of the two lists.

#### **Space Complexity: O(1)**

- Only two pointers (`pA` and `pB`) are used, and no additional data structures are required.

---

### **Edge Cases**

1. **No Intersection:**

   - `listA = [1, 2, 3]`, `listB = [4, 5, 6]`  
     Both pointers will reach `null` after traversing both lists. Output: `null`.

2. **One Empty List**:

   - `listA = []`, `listB = [1, 2, 3]`  
     Output: `null`.

3. **Both Lists Empty**:

   - `listA = []`, `listB = []`  
     Output: `null`.

4. **Intersection at Head**:
   - `listA = [1, 2, 3]`, `listB = [1, 2, 3]`  
     Both lists share all nodes. Output: `1`.

---

This solution meets the **O(m + n)** time and **O(1)** space requirements, as specified in the problem.
Let me know if you’d like further clarification or additional examples!
