# **202. Happy Number**

<!--Here's a concise and efficient implementation for **202.
Happy Number**, using JavaScript:-->

---

## **Algorithm:**

1. **Understand the Problem**:

   - For a given number `n`, repeatedly calculate the sum of the squares of its digits.
   - If you eventually reach `1`, the number is **happy** (`true`).
   - If the process gets stuck in a loop that doesn’t include `1`, the number is **not happy** (`false`).

2. **Approach**:

   - Use a **set** to track numbers we've already seen. If a number repeats, it’s stuck in a loop, and we return `false`.
   - Continue until we reach `1` or detect a loop.

3. **Steps**:
   - Split `n` into its digits, calculate the sum of their squares.
   - Use a loop to repeat the process, checking for `1` or a cycle.

---

## **JavaScript Implementation**

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  const seen = new Set(); // To track numbers we've seen

  // Helper function to calculate the sum of squares of digits
  function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10; // Get the last digit
      sum += digit * digit; // Add square of the digit
      num = Math.floor(num / 10); // Remove the last digit
    }
    return sum;
  }

  while (n !== 1) {
    if (seen.has(n)) return false; // Loop detected
    seen.add(n); // Track the current number
    n = sumOfSquares(n); // Replace with the sum of squares
  }

  return true; // Reached 1, it's a happy number
}

// Example Usage:
console.log(isHappy(19)); // Output: true
console.log(isHappy(2)); // Output: false
```

---

## **Explanation of the Example**

### Example 1

Input: `n = 19`  
Process:

1. \( 1^2 + 9^2 = 82 \)
2. \( 8^2 + 2^2 = 68 \)
3. \( 6^2 + 8^2 = 100 \)
4. \( 1^2 + 0^2 + 0^2 = 1 \)

Output: `true` (19 is a happy number).

### Example 2

Input: `n = 2`  
Process:

1. \( 2^2 = 4 \)
2. \( 4^2 = 16 \)
3. \( 1^2 + 6^2 = 37 \)
4. \( 3^2 + 7^2 = 58 \)
5. \( 5^2 + 8^2 = 89 \)
6. \( 8^2 + 9^2 = 145 \)
7. \( 1^2 + 4^2 + 5^2 = 42 \)
8. \( 4^2 + 2^2 = 20 \)
9. \( 2^2 + 0^2 = 4 \) (Cycle detected, not happy).

Output: `false`.

---

## **Complexity Analysis**

1. **Time Complexity**:

   - Each iteration reduces `n` as we calculate the sum of squares. The value of `n` becomes small quickly, leading to limited iterations.
   - In practice, the time complexity is \(O(\log n)\) due to digit extraction.

2. **Space Complexity**:
   - \(O(\log n)\) for the **set**, which stores intermediate numbers.

## **Conclusion**

-This solution is efficient and handles the constraints effectively.
