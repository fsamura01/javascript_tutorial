<!--Here’s a **step-by-step solution** in **JavaScript**
for the "Assign Cookies" problem, along with a **complexity analysis**.
-->

# **455. Assign Cookies**

---

## **Approach:**

1. **Sort both arrays**:

   - Sort the `g` (greed factor of children) in ascending order.
   - Sort the `s` (sizes of cookies) in ascending order.
   - This allows us to distribute cookies in the most optimal way (smallest cookie that fits the least greedy child first).

2. **Use a two-pointer technique**:

   - One pointer `i` for the greed factor array `g`.
   - One pointer `j` for the cookie sizes array `s`.
   - Try to match the smallest cookie with the least greedy child.
   - If a child can be satisfied (`s[j] >= g[i]`), move both pointers forward.
   - Otherwise, move only the cookie pointer forward.

3. **Continue until we run out of cookies or all children are satisfied.**

---

## **JavaScript Implementation:**

```javascript
var findContentChildren = function (g, s) {
  // Step 1: Sort both arrays
  g.sort((a, b) => a - b); // Sort greed factors
  s.sort((a, b) => a - b); // Sort cookie sizes

  let i = 0,
    j = 0; // Pointers for children and cookies
  let contentChildren = 0; // Counter for satisfied children

  // Step 2: Try to satisfy children with available cookies
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      // If cookie can satisfy child
      contentChildren++; // Increase count
      i++; // Move to next child
    }
    j++; // Move to next cookie
  }

  return contentChildren; // Return total satisfied children
};
```

---

## **Complexity Analysis:**

1. **Sorting Step:**

   - Sorting `g` and `s` both take **O(N log N)** and **O(M log M)** respectively.
   - Here, `N = g.length` and `M = s.length`.

2. **Two-Pointer Traversal:**

   - We traverse both arrays once, which is **O(N + M)**.

3. **Overall Complexity:**
   - **O(N log N + M log M)** due to sorting, since it dominates the linear traversal.

---

## **Example Walkthrough**

### **Example 1:**

```js
findContentChildren([1, 2, 3], [1, 1]);
```

**Sorted Inputs:**

- `g = [1, 2, 3]`
- `s = [1, 1]`

**Matching Process:**

- `1` (cookie) → satisfies `1` (greed), move both pointers.
- No more matching cookies for `2` or `3`.

**Output:**

```js
1;
```

---

### **Example 2:**

```js
findContentChildren([1, 2], [1, 2, 3]);
```

**Sorted Inputs:**

- `g = [1, 2]`
- `s = [1, 2, 3]`

**Matching Process:**

- `1` (cookie) → satisfies `1` (greed), move both pointers.
- `2` (cookie) → satisfies `2` (greed), move both pointers.

**Output:**

```js
2;
```

---

### **Edge Cases Considered:**

1. **No Cookies (`s = []`)**
   - `findContentChildren([1,2,3], []) → 0`
2. **More Cookies than Needed (`s = [1,2,3,4,5]`)**
   - `findContentChildren([2,3], [1,2,3,4,5]) → 2`
3. **More Children than Cookies (`g = [1,1,1,1,1]`, `s = [1,1]`)**
   - `findContentChildren([1,1,1,1,1], [1,1]) → 2`
4. **Large Inputs (`g.length = 30,000` and `s.length = 30,000`)**
   - Sorting ensures the solution runs efficiently in `O(N log N)`.

---

### **Summary:**

- **Sorting** ensures we match cookies optimally.
- **Two-pointer approach** efficiently assigns cookies.
- **Time Complexity: O(N log N + M log M)**.
- **Space Complexity: O(1)** (sorting is in-place).

This solution is **optimal** for large constraints and ensures maximum content children! 🎯

## **Goal of the Problem:**

The objective of the **"Assign Cookies"** problem is to **maximize the number of content children** by distributing available cookies in an optimal way.

### **Key Conditions:**

1. Each child **has a greed factor** (`g[i]`), which is the minimum cookie size they require to be satisfied.
2. Each cookie **has a size** (`s[j]`).
3. A child can **receive at most one cookie**.
4. A child is satisfied **if the assigned cookie's size is greater than or equal to their greed factor**.

### **Output Requirement:**

- Return the **maximum number of children** that can be satisfied with the given cookies.

---

### **Example Breakdown:**

#### **Example 1**

```plaintext
Input: g = [1,2,3], s = [1,1]
Output: 1
```

- Sorted greed: `[1, 2, 3]`
- Sorted cookies: `[1, 1]`
- First cookie (`1`) → satisfies the least greedy child (`1`).
- No more cookies can satisfy `2` or `3`.

✔ **Only 1 child is satisfied.**

---

#### **Example 2**

```plaintext
Input: g = [1,2], s = [1,2,3]
Output: 2
```

- Sorted greed: `[1, 2]`
- Sorted cookies: `[1, 2, 3]`
- First cookie (`1`) → satisfies the least greedy child (`1`).
- Second cookie (`2`) → satisfies the next child (`2`).

✔ **Both children are satisfied.**

---

### **Why Sorting & Two-Pointer Approach?**

- **Sorting** ensures we distribute the smallest possible cookie to each child.
- **Two pointers** help efficiently assign cookies while maximizing content children.

### **Final Objective:**

- **Maximize the number of satisfied children by optimally distributing cookies.** ✅
