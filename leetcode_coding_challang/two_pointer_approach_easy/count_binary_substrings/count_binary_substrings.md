# **696 Count Binary Substrings**

Let's break this problem down step by step and implement an efficient JavaScript solution.

---

## **Step 1: Understanding the Problem**

### **We need to count substrings in a binary string (`s`) that meet **two conditions**:**

1. The substring contains equal numbers of `0`s and `1`s.
2. All `0`s in the substring appear **consecutively**, and all `1`s in the substring appear **consecutively**.

### **Example 1:**

```javascript
Input:  "00110011"
Valid substrings: "0011", "01", "1100", "10", "0011", "01"
Output: 6
```

### **Example 2:**

```javascript
Input:  "10101"
Valid substrings: "10", "01", "10", "01"
Output: 4
```

---

## **Step 2: Observing the Pattern**

- The key observation is that valid substrings **always occur between consecutive groups of `0`s and `1`s**.
- The **size of a valid substring** is determined by the **minimum size** of two adjacent groups.

### **For example, in `"00110011"`, we can group it as:**

```javascript
"00" -> (count: 2)
"11" -> (count: 2)
"00" -> (count: 2)
"11" -> (count: 2)
```

### **We can form substrings by taking the **minimum adjacent group size**:**

- `"00" (2) and "11" (2)` → min(2,2) = `2` substrings `"0011"`, `"01"`
- `"11" (2) and "00" (2)` → min(2,2) = `2` substrings `"1100"`, `"10"`
- `"00" (2) and "11" (2)` → min(2,2) = `2` substrings `"0011"`, `"01"`

- Total substrings = `2 + 2 + 2 = 6`.

---

## **Step 3: Plan the Solution**

1. **Group the binary string into consecutive 0's and 1's.**
   - Example: `"001100"` → `[2,2,2]` (two `0`s, two `1`s, two `0`s)
2. **Compare adjacent groups to count valid substrings.**
   - For each adjacent group, the number of valid substrings is `min(count[i], count[i+1])`.
3. **Sum up the counts and return the result.**

---

## **Step 4: Implement in JavaScript**

```javascript
function countBinarySubstrings(s) {
  let groups = []; // Store the lengths of consecutive 0's or 1's
  let count = 1; // Count occurrences of current character

  // Step 1: Create the groups array
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      groups.push(count);
      count = 1; // Reset count for new character
    }
  }
  groups.push(count); // Push the last group

  // Step 2: Count valid substrings
  let result = 0;
  for (let i = 0; i < groups.length - 1; i++) {
    result += Math.min(groups[i], groups[i + 1]); // Minimum of adjacent groups
  }

  return result;
}
```

---

## **Step 5: Complexity Analysis**

1. **Step 1 (Grouping Step)**:
   - We traverse `s` once to create the `groups` array → **O(N)**.
2. **Step 2 (Counting Step)**:
   - We traverse `groups` once → **O(N)**.

**Overall Complexity:**

- **Time Complexity:** **O(N)** (Linear)
- **Space Complexity:** **O(N)** (For the `groups` array)

---

## **Step 6: Optimized Solution**

We can reduce space complexity to **O(1)** by using two variables instead of an array.

```javascript
function countBinarySubstringsOptimized(s) {
  let prev = 0,
    curr = 1,
    result = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      curr++; // Continue counting the current group
    } else {
      result += Math.min(prev, curr); // Add min of previous and current group
      prev = curr; // Move current group to previous
      curr = 1; // Reset current group count
    }
  }
  result += Math.min(prev, curr); // Add the last pair

  return result;
}
```

### **Optimized Complexity**

- **Time Complexity:** **O(N)**
- **Space Complexity:** **O(1)** (We only use `prev`, `curr`, and `result`)

---

## **Step 7: Test Cases**

```javascript
console.log(countBinarySubstringsOptimized("00110011")); // 6
console.log(countBinarySubstringsOptimized("10101")); // 4
console.log(countBinarySubstringsOptimized("000111000")); // 6
console.log(countBinarySubstringsOptimized("01")); // 1
console.log(countBinarySubstringsOptimized("0011")); // 2
console.log(countBinarySubstringsOptimized("1111")); // 0
```

---

## **Final Thoughts**

- We used a **grouping technique** to count consecutive `0`s and `1`s.
- We **compared adjacent groups** to find valid substrings.
- The **optimized solution reduced space complexity to O(1)**.
- **Time Complexity remains O(N)** in both versions.
