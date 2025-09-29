# **942. DI String Match**

## 🚀 **Solving LeetCode 942: DI String Match**

Let's break this problem down step by step, emphasizing competitive programming strategies and algorithmic patterns.

---

## **Step 1: Problem Understanding**

### 🔹 **Problem Statement (Simplified)**

You are given a string `s` of length `n` consisting only of the characters `'D'` (Decrease) and `'I'` (Increase).

- You need to return a permutation of numbers from `0` to `n` such that:
  - If `s[i] == 'I'`, then `perm[i] < perm[i+1]`.
  - If `s[i] == 'D'`, then `perm[i] > perm[i+1]`.

### 🔹 **Example Walkthrough**

#### **Example 1**

📌 **Input:**  
`s = "IDID"`  
📌 **Output:**  
`[0, 4, 1, 3, 2]` (One possible valid answer)

#### **Example 2**

📌 **Input:**  
`s = "III"`  
📌 **Output:**  
`[0, 1, 2, 3]`

#### **Example 3**

📌 **Input:**  
`s = "DDD"`  
📌 **Output:**  
`[3, 2, 1, 0]`

### 🔹 **Constraints**

- `1 <= s.length <= 10^5`
- `s[i]` is either `'I'` or `'D'`

### 🔹 **Edge Cases to Consider**

✔️ Single-character input (e.g., `"I"`, `"D"`)  
✔️ All increasing (`"IIII"`) or all decreasing (`"DDDD"`)  
✔️ Alternating patterns (`"IDIDID"`)

---

## **Step 2: Pattern Identification**

This problem follows the **"Two Pointers"** pattern.

- Since we are dealing with a **permutation from `0` to `n`**, we have a fixed range to work with.
- We can assign numbers greedily based on the given `'I'` and `'D'` conditions.

---

## **Step 3: Approach Discussion**

### 🎯 **Intuition Behind the Solution**

We maintain **two pointers**, `low = 0` and `high = n`.

- If `s[i] == 'I'`, assign `low` to `perm[i]` and increment `low`.
- If `s[i] == 'D'`, assign `high` to `perm[i]` and decrement `high`.
- The last element is always set to `low` (which will be equal to `high` at the end).

### ✨ **Why This Works?**

Since we start with the full range `[0, n]`, we guarantee a valid permutation without revisiting any elements.

---

## **Step 4: Code Implementation (JavaScript)**

```javascript
var diStringMatch = function (s) {
  let low = 0,
    high = s.length;
  let result = new Array(high + 1);

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I") {
      result[i] = low++;
    } else {
      result[i] = high--;
    }
  }
  result[s.length] = low; // The last remaining number

  return result;
};
```

### 📝 **Key Explanations in Code**

1. **Two Pointers (`low` and `high`)**
   - `low` starts at `0`, `high` starts at `n`
   - We fill the array based on `'I'` and `'D'`
2. **Final Assignment**
   - The last remaining value (`low` == `high`) is placed in `result[n]`

---

## **Step 5: Complexity Analysis**

| Aspect               | Complexity                                     |
| -------------------- | ---------------------------------------------- |
| **Time Complexity**  | **O(n)** (We iterate through `s` once)         |
| **Space Complexity** | **O(n)** (We store `n+1` elements in `result`) |

⚡ This is **optimal** for `n` up to `10^5`.

---

## **Step 6: Alternative Approaches**

### 🟢 **Using a Stack**

- Instead of two pointers, we could maintain a stack to store the values and pop accordingly.
- However, this introduces **O(n) space overhead**, making it **less efficient** than the two-pointer method.

---

## **Step 7: Practice Recommendations**

1️⃣ **LeetCode 484: Find Permutation** (Similar greedy approach)  
2️⃣ **LeetCode 896: Monotonic Array** (Order checking logic)  
3️⃣ **LeetCode 1276: Number of Burgers with No Waste of Ingredients** (Two-pointer greedy allocation)

---

## **Step 8: Flowchart Design**

I'll generate a flowchart to illustrate the process visually. Stay tuned! 🎨📊

Here is the flowchart illustrating the **DI String Match** solution visually! 🎨📊

- The process starts with initializing `low`, `high`, and `result`.
- We iterate over the input string `s`, deciding between **incrementing `low`** (for 'I') or **decrementing `high`** (for 'D').
- The final value is assigned, and the result is returned.

This should help reinforce the logic behind the two-pointer greedy approach. Let me know if you have any questions! 🚀
