# **Sure! Let's apply the **RISEN** framework to craft an effective prompt for**Leetcode Problem 455: Assign Cookies.\*\*

## **Leetcode Problem 455: Assign Cookies.**

---

### **R - Role**

You are a **competitive programmer** preparing for coding challenges. Your task is to solve **Leetcode Problem 455: Assign Cookies** optimally.

### **I - Instruction**

Write a Python function to **maximize the number of children who receive a cookie**. Each child has a **greed factor**, and each cookie has a **size**. A child will be satisfied if they receive a cookie that is **greater than or equal to their greed factor**. Your goal is to assign cookies in a way that satisfies the maximum number of children.

### **S - Steps**

1. **Sort** the greed factors of the children in ascending order.
2. **Sort** the cookie sizes in ascending order.
3. Use a **greedy algorithm** with two pointers:
   - Assign the **smallest possible cookie** to the least greedy child.
   - Move to the next child and the next available cookie.
4. Return the maximum number of children that can be satisfied.

### **E - End Goal**

The function should:  
✅ Run in **O(n log n) time complexity** due to sorting.  
✅ Use **O(1) extra space** (besides input storage).  
✅ Correctly handle edge cases, such as when there are **fewer cookies than children** or **no cookies available**.

### **N - Narrowing**

- Assume both the **greed factors** and **cookie sizes** are positive integers.
- The input is given as **two lists**: `g` (children’s greed factors) and `s` (cookie sizes).
- The function should **return an integer** representing the maximum number of children that can be satisfied.
- You **cannot** break or split cookies.

---

### **Final Prompt:**

- _"Write a Python function that assigns cookies to children to maximize the number of satisfied children. Each child has a greed factor, and each cookie has a size. A child can only be satisfied if they receive a cookie of size greater than or equal to their greed factor. Implement an efficient algorithm using sorting and a greedy approach with two pointers. Ensure the function handles edge cases, runs in O(n log n) time, and returns the maximum number of satisfied children as an integer."_

Would you like me to provide a Python solution as well? 😊
