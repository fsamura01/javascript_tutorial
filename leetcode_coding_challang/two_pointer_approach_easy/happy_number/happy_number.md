<!--Here’s how you can solve **Happy Number** using the **two-pointer algorithm** (commonly used for cycle detection, like in Floyd’s cycle-finding algorithm):-->

# **202. Happy Number**

## **Algorithm Explanation**

To determine if a number is happy:

1. Use the process of summing the squares of its digits repeatedly.
2. If the process reaches `1`, the number is happy, and we return `true`.
3. If the process loops endlessly (cycles), the number is not happy, and we return `false`.

Using the **two-pointer technique**, we can efficiently detect a cycle:

- **Slow pointer**: Moves one step at a time (computes the sum of the squares once per iteration).
- **Fast pointer**: Moves two steps at a time (computes the sum of the squares twice per iteration).
- If there’s a cycle, the fast pointer will eventually meet the slow pointer.
- If the fast pointer reaches `1`, the number is happy.

---

## **JavaScript Implementation**

```javascript
/**
 * Determines if a number is a happy number using the two-pointer technique.
 * @param {number} n - The input number.
 * @return {boolean} - True if the number is happy, false otherwise.
 */
function isHappy(n) {
  // Helper function to calculate the sum of the squares of the digits
  function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10; // Get the last digit
      sum += digit * digit; // Add the square of the digit to the sum
      num = Math.floor(num / 10); // Remove the last digit
    }
    return sum;
  }

  let slow = n; // Slow pointer
  let fast = n; // Fast pointer

  while (true) {
    slow = sumOfSquares(slow); // Move slow pointer by one step
    fast = sumOfSquares(sumOfSquares(fast)); // Move fast pointer by two steps

    if (fast === 1) {
      return true; // If the fast pointer reaches 1, the number is happy
    }
    if (slow === fast) {
      return false; // If the slow and fast pointers meet, there's a cycle
    }
  }
}

// Example usage
console.log(isHappy(19)); // Output: true
console.log(isHappy(2)); // Output: false
```

---

## **Explanation of the Code**

1. **Helper Function**:

   - `sumOfSquares(num)` calculates the sum of the squares of a number’s digits:
     - Example: `19 → 1² + 9² = 82`.

2. **Two-Pointer Logic**:

   - The `slow` pointer calculates the sum of squares once per iteration.
   - The `fast` pointer calculates the sum of squares twice per iteration.
   - If a cycle exists, the two pointers will meet (`slow === fast`).

3. **Happy Number Check**:
   - If `fast` reaches `1`, return `true` (the number is happy).
   - If `slow` and `fast` meet, return `false` (the number is not happy).

---

## **Example Walkthrough**

### **Input: `n = 19`**

1. Start: `slow = 19`, `fast = 19`.
2. First Iteration:
   - `slow = sumOfSquares(19) = 82`
   - `fast = sumOfSquares(sumOfSquares(19)) = sumOfSquares(82) = 68`
3. Second Iteration:
   - `slow = sumOfSquares(82) = 68`
   - `fast = sumOfSquares(sumOfSquares(68)) = sumOfSquares(100) = 1`
4. `fast` reaches `1`, so `19` is a happy number. Return `true`.

### **Input: `n = 2`**

1. Start: `slow = 2`, `fast = 2`.
2. First Iteration:
   - `slow = sumOfSquares(2) = 4`
   - `fast = sumOfSquares(sumOfSquares(2)) = sumOfSquares(4) = 16`
3. Second Iteration:
   - `slow = sumOfSquares(4) = 16`
   - `fast = sumOfSquares(sumOfSquares(16)) = sumOfSquares(37) = 58`
4. Subsequent iterations show a repeating cycle (`4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4`).
5. `slow` meets `fast`, so `2` is not a happy number. Return `false`.

---

### **Time and Space Complexity**

- **Time Complexity**: \(O(\log n)\) per iteration, where \(n\) is the input number,
  because the sum of squares operation reduces the number of digits.
- **Space Complexity**: \(O(1)\), as we only use pointers and a few variables.

## **Conclusion**

- This approach is efficient and avoids unnecessary memory usage for tracking previous numbers.
- Let me know if you need further clarification!
