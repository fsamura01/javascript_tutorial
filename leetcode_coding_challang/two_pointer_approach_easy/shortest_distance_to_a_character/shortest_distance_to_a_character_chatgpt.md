# **821. Shortest Distance to a Character**

Let's break this problem down step by step in a beginner-friendly way and then write the JavaScript solution.

---

## **Understanding the Problem**

We need to find the shortest distance from each character in a given string `s` to the nearest occurrence of character `c`.

Example:  
`s = "loveleetcode"`, `c = "e"`  
Output: `[3,2,1,0,1,0,0,1,2,2,1,0]`

Explanation:

- The character `'e'` appears at indices **3, 5, 6, and 11**.
- For each index in `s`, we compute the shortest distance to the nearest `'e'`.

---

## **Approach**

To solve this efficiently, we use a **two-pass** approach:

1. **Left to Right Scan**: We calculate the distance from the most recent occurrence of `'c'` found from the left.
2. **Right to Left Scan**: We refine the results by checking distances from the closest `'c'` found from the right.

This avoids checking all occurrences of `'c'` for every character, making the solution much faster.

---

## **Algorithm**

1. **Initialize an array** `answer` with length `s.length`, filled with `Infinity` (or a large number).
2. **First Pass (Left to Right)**
   - Keep track of the last seen index of `'c'`.
   - For each character, update `answer[i]` as the distance from the last seen `'c'`.
3. **Second Pass (Right to Left)**
   - Again, keep track of the last seen index of `'c'` but moving **right to left**.
   - Update `answer[i]` by taking the **minimum** distance between the current and the previous stored value.
4. **Return** the `answer` array.

---

## **Time Complexity Analysis**

- **First pass (left to right)** → `O(n)`
- **Second pass (right to left)** → `O(n)`
- **Total Complexity** → `O(n)`, which is optimal!

---

## **JavaScript Implementation**

Now, let’s implement the approach:

```javascript
function shortestToChar(s, c) {
  let n = s.length;
  let answer = new Array(n).fill(Infinity);

  // Left to Right pass
  let prev = -Infinity; // A very small index to start with
  for (let i = 0; i < n; i++) {
    if (s[i] === c) prev = i;
    answer[i] = Math.abs(i - prev);
  }

  // Right to Left pass
  prev = Infinity; // A very large index to start with
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === c) prev = i;
    answer[i] = Math.min(answer[i], Math.abs(i - prev));
  }

  return answer;
}

// Example usage
console.log(shortestToChar("loveleetcode", "e")); // [3,2,1,0,1,0,0,1,2,2,1,0]
console.log(shortestToChar("aaab", "b")); // [3,2,1,0]
```

---

## **Step-by-Step Execution Example**

For `s = "loveleetcode"`, `c = "e"`:

### **First Pass (Left to Right)**

```javascript
s = "loveleetcode"
c = "e"
Initial:  [∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞]
Step-by-step update:
i = 3 → [∞, ∞, ∞, 0, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞]
i = 4 → [∞, ∞, ∞, 0, 1, ∞, ∞, ∞, ∞, ∞, ∞, ∞]
i = 5 → [∞, ∞, ∞, 0, 1, 0, ∞, ∞, ∞, ∞, ∞, ∞]
i = 6 → [∞, ∞, ∞, 0, 1, 0, 0, ∞, ∞, ∞, ∞, ∞]
...
```

### **Second Pass (Right to Left)**

```javascript
Re-check and refine distances:
i = 11 → [∞, ∞, ∞, 0, 1, 0, 0, 1, 2, 2, 1, 0]
Final result: [3,2,1,0,1,0,0,1,2,2,1,0]
```

---

### **Key Takeaways**

1. **Two-pass technique** ensures an efficient `O(n)` solution.
2. **Initialization with `Infinity`** ensures we only update when needed.
3. **First pass sets a preliminary distance, second pass refines it**.
4. This pattern is useful for problems involving **closest distances**.

Would you like a more detailed explanation on any step? 🚀
