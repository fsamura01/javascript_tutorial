# **696 Count Binary Substrings**

Alright! Let's go step by step in a **beginner-friendly** way to solve this problem in **JavaScript**.

---

## **Recap of the Problem**

We need to find substrings in a binary string (`s`) that satisfy these conditions:

1. They contain an **equal number of `0`s and `1`s**.
2. All `0`s and all `1`s must be **grouped together**.

### **Example 4**

```javascript
Input:  "00110011"
Valid substrings: "0011", "01", "1100", "10", "0011", "01"
Output: 6
```

### **Example 3**

```javascript
Input:  "10101"
Valid substrings: "10", "01", "10", "01"
Output: 4
```

---

## **Detailed Pattern Breakdown**

### **Step 1: Identify Consecutive Groups (First Occurrence)**

- We can break `"00110011"` into **groups of consecutive `0`s and `1`s**:

  ````javascript
  "00" -> (count: 2)
  "11" -> (count: 2)
  "00" -> (count: 2)
  "11" -> (count: 2)
  ```

  ````

- Similarly, `"10101"`:

  ```javascript
  "1"  -> (count: 1)
  "0"  -> (count: 1)
  "1"  -> (count: 1)
  "0"  -> (count: 1)
  "1"  -> (count: 1)
  ```

### **Step 2: Finding Valid Substrings (First Occurrence)**

- A valid substring is formed between **two consecutive groups**.
- The **number of valid substrings** is determined by the **minimum of two adjacent groups**.

For `"00110011"`:

```javascript
"00" (2) and "11" (2) → min(2,2) = 2 → "0011", "01"
"11" (2) and "00" (2) → min(2,2) = 2 → "1100", "10"
"00" (2) and "11" (2) → min(2,2) = 2 → "0011", "01"
Total = 2 + 2 + 2 = 6
```

For `"10101"`:

```javascript
"1" (1) and "0" (1) → min(1,1) = 1 → "10"
"0" (1) and "1" (1) → min(1,1) = 1 → "01"
"1" (1) and "0" (1) → min(1,1) = 1 → "10"
"0" (1) and "1" (1) → min(1,1) = 1 → "01"
Total = 1 + 1 + 1 + 1 = 4
```

---

## **Step 3: Solution Planning**

1. **Count consecutive `0`s and `1`s** and store them in an array.
2. **Sum up the minimum of each pair of adjacent groups** to get the final count.

---

## **Step 4: Code Implementation (First Occurrence)**

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

## **Step 8: Complexity Analysis**

1. **Step 1 (Grouping Step)**
   - We traverse `s` once to create the `groups` array → **O(N)**.
2. **Step 2 (Counting Step)**
   - We traverse `groups` once → **O(N)**.

**Overall Complexity:**

- **Time Complexity:** **O(N)** (Linear)
- **Space Complexity:** **O(N)** (For the `groups` array)

---

## **Step 6: Optimized Solution with O(1) Space**

Instead of storing groups in an array, we can track just the previous and current counts.

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

### **Complexity Analysis for Optimized Solution**

- **Time Complexity:** **O(N)**
- **Space Complexity:** **O(1)** (Only using a few variables)

---

## **Step 9: Test Cases**

```javascript
console.log(countBinarySubstringsOptimized("00110011")); // 6
console.log(countBinarySubstringsOptimized("10101")); // 4
console.log(countBinarySubstringsOptimized("000111000")); // 6
console.log(countBinarySubstringsOptimized("01")); // 1
console.log(countBinarySubstringsOptimized("0011")); // 2
console.log(countBinarySubstringsOptimized("1111")); // 0
```

---

## **Conclusion**

- We **count consecutive groups** of `0`s and `1`s.
- We **compare adjacent groups** and take the **minimum** to count valid substrings.
- The **optimized version reduces space complexity to O(1)**.
- **Time Complexity remains O(N)** in both versions.
  Alright! Let's go step by step in a **beginner-friendly** way to solve this problem in **JavaScript**.

---

## **Understanding the Problem**

We need to find substrings in a binary string (`s`) that satisfy these conditions:

1. They contain an **equal number of `0`s and `1`s**.
2. All `0`s and all `1`s must be **grouped together**.

### **Example 1**

```javascript
Input:  "00110011"
Valid substrings: "0011", "01", "1100", "10", "0011", "01"
Output: 6
```

### **Example 2**

```javascript
Input:  "10101"
Valid substrings: "10", "01", "10", "01"
Output: 4
```

---

## **Breaking Down the Pattern**

### **Step 1: Identify Consecutive Groups**

- We can break `"00110011"` into **groups of consecutive `0`s and `1`s**:

  ```javascript
  "00" -> (count: 2)
  "11" -> (count: 2)
  "00" -> (count: 2)
  "11" -> (count: 2)
  ```

- Similarly, `"10101"`:

  ```javascript
  "1"  -> (count: 1)
  "0"  -> (count: 1)
  "1"  -> (count: 1)
  "0"  -> (count: 1)
  "1"  -> (count: 1)
  ```

### **Step 2: Finding Valid Substrings**

- A valid substring is formed between **two consecutive groups**.
- The **number of valid substrings** is determined by the **minimum of two adjacent groups**.

For `"00110011"`:

```javascript
"00" (2) and "11" (2) → min(2,2) = 2 → "0011", "01"
"11" (2) and "00" (2) → min(2,2) = 2 → "1100", "10"
"00" (2) and "11" (2) → min(2,2) = 2 → "0011", "01"
Total = 2 + 2 + 2 = 6
```

For `"10101"`:

```javascript
"1" (1) and "0" (1) → min(1,1) = 1 → "10"
"0" (1) and "1" (1) → min(1,1) = 1 → "01"
"1" (1) and "0" (1) → min(1,1) = 1 → "10"
"0" (1) and "1" (1) → min(1,1) = 1 → "01"
Total = 1 + 1 + 1 + 1 = 4
```

---

## **Step 3: Plan the Solution**

1. **Count consecutive `0`s and `1`s** and store them in an array.
2. **Sum up the minimum of each pair of adjacent groups** to get the final count.

---

## **Step 4: Code Implementation**

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

1. **Step 1 (Grouping Step)**
   - We traverse `s` once to create the `groups` array → **O(N)**.
2. **Step 2 (Counting Step)**
   - We traverse `groups` once → **O(N)**.

**Overall Complexity:**

- **Time Complexity:** **O(N)** (Linear)
- **Space Complexity:** **O(N)** (For the `groups` array)

---

## **Step 6: Optimized Solution (O(1) Space)**

Instead of storing groups in an array, we can track just the previous and current counts.

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
- **Space Complexity:** **O(1)** (Only using a few variables)

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

- We **count consecutive groups** of `0`s and `1`s.
- We **compare adjacent groups** and take the **minimum** to count valid substrings.
- The **optimized version reduces space complexity to O(1)**.
- **Time Complexity remains O(N)** in both versions.
