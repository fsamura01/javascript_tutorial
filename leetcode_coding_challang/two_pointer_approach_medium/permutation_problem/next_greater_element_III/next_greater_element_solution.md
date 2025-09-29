# *556. Next Greater Element III*

Let me guide you through solving LeetCode 556 step by step.

## 1. Problem Understanding

Find the **smallest** number greater than `n` using the **exact same digits**. If impossible or result exceeds 32-bit integer, return -1.

Key insight: We need the lexicographically next permutation of the digits.

## 2. Constraints Analysis

- Input: 1 ≤ n ≤ 2³¹ - 1 (32-bit signed integer)
- Output must also fit in 32-bit signed integer
- Must use exact same digits
- Need the smallest such number

## 3. Breaking Down the Problem

1. Convert number to digit array
2. Find the rightmost digit that can be increased
3. Find the smallest digit to swap with it
4. Rearrange remaining digits to get the smallest result
5. Validate 32-bit constraint

## 4. Pattern Identification

This is the **Next Permutation** pattern - finding the lexicographically next arrangement of elements.

## 5. Step-by-Step Approach

**Algorithm (Next Permutation):**

1. Find rightmost digit smaller than its next digit (pivot)
2. If no pivot exists, no greater number possible
3. Find smallest digit to the right of pivot that's greater than pivot
4. Swap them
5. Reverse all digits after the original pivot position

## 6. Code Implementation

```Javascript
// JavaScript Solution
function nextGreaterElement(n) {
    // Convert to digit array
    const digits = n.toString().split('').map(Number);
    const len = digits.length;
    
    // Step 1: Find rightmost digit that is smaller than its next digit (pivot)
    let pivot = -1;
    for (let i = len - 2; i >= 0; i--) {
        if (digits[i] < digits[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    // If no pivot found, no greater permutation exists
    if (pivot === -1) return -1;
    
    // Step 2: Find smallest digit to right of pivot that's greater than pivot
    let successor = -1;
    for (let i = len - 1; i > pivot; i--) {
        if (digits[i] > digits[pivot]) {
            successor = i;
            break;
        }
    }
    
    // Step 3: Swap pivot and successor
    [digits[pivot], digits[successor]] = [digits[successor], digits[pivot]];
    
    // Step 4: Reverse everything after pivot to get smallest arrangement
    reverse(digits, pivot + 1);
    
    // Step 5: Check 32-bit constraint
    const result = parseInt(digits.join(''));
    return result > 2147483647 ? -1 : result;
}

function reverse(arr, start) {
    let end = arr.length - 1;
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}


// Example walkthrough: n = 1243
// digits = [1, 2, 4, 3]
// pivot = 2 (digit 4 at index 2, since 4 > 3 but 2 < 4)
// successor = 3 (digit 3 at index 3, smallest digit > 2 to the right)
// After swap: [1, 3, 4, 2]
// After reverse from index 3: [1, 3, 2, 4]
// Result: 1324
```

```Java
// Java Solution
class Solution {
    public int nextGreaterElement(int n) {
        // Convert to character array
        char[] digits = String.valueOf(n).toCharArray();
        int len = digits.length;
        
        // Step 1: Find pivot
        int pivot = -1;
        for (int i = len - 2; i >= 0; i--) {
            if (digits[i] < digits[i + 1]) {
                pivot = i;
                break;
            }
        }
        
        if (pivot == -1) return -1;
        
        // Step 2: Find successor
        int successor = -1;
        for (int i = len - 1; i > pivot; i--) {
            if (digits[i] > digits[pivot]) {
                successor = i;
                break;
            }
        }
        
        // Step 3: Swap
        char temp = digits[pivot];
        digits[pivot] = digits[successor];
        digits[successor] = temp;
        
        // Step 4: Reverse after pivot
        reverse(digits, pivot + 1);
        
        // Step 5: Check 32-bit constraint
        try {
            long result = Long.parseLong(new String(digits));
            return result > Integer.MAX_VALUE ? -1 : (int) result;
        } catch (NumberFormatException e) {
            return -1;
        }
    }
    
    private void reverse(char[] arr, int start) {
        int end = arr.length - 1;
        while (start < end) {
            char temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
}
```

## 7. Complexity Analysis

- **Time**: O(n) - single pass to find pivot, successor, and reverse
- **Space**: O(n) - converting to digit array

## 8. Alternative Approaches

- **Built-in next_permutation**: Use language libraries (C++ STL)
- **Recursive backtracking**: Generate all permutations (inefficient O(n!))

## 9. Practice Recommendations

Similar "Next Permutation" problems:

- LeetCode 31: Next Permutation -> two-pointer - medium
- LeetCode 60: Permutation Sequence  
- LeetCode 267: Palindrome Permutation II

The key insight is recognizing this as a **Next Permutation** problem. The algorithm efficiently finds the lexicographically next arrangement by:

1. Identifying where to make the smallest increase (pivot)
2. Making the minimal necessary swap
3. Minimizing the remaining digits

This pattern appears frequently in permutation-related problems and is essential for competitive programming.

---
Great question! This is the key insight of the Next Permutation algorithm.

**Why reverse after the pivot?**

After we swap the pivot with its successor, the digits to the right of the pivot are still in **descending order**. To get the **smallest** next permutation, we need them in **ascending order**.

**Example walkthrough with n = 1243:**

1. **Initial**: [1, 2, 4, 3]
2. **Find pivot**: index 1 (digit 2), because 2 < 4
3. **Find successor**: index 3 (digit 3), smallest digit > 2 to the right
4. **After swap**: [1, 3, 4, 2]
   - Notice: digits after pivot (4, 2) are in descending order
5. **After reverse**: [1, 3, 2, 4]
   - Now digits after pivot (2, 4) are in ascending order
6. **Result**: 1324 (the smallest possible)

**Without reversing**: We'd get 1342, which is larger than necessary.

**The pattern**:

- Before swap: digits right of pivot are in descending order (that's why we couldn't find a pivot further right)
- After swap: they're still in descending order
- Reversing makes them ascending = smallest possible arrangement

This ensures we get the **lexicographically next** (smallest greater) permutation, not just any greater permutation.

---
Absolutely! Let me break down this line step by step:

```java
long result = Long.parseLong(new String(digits));
```

**Step-by-step breakdown:**

1. **`digits`** - This is a `char[]` array containing individual digit characters
   - Example: `['1', '3', '2', '4']`

2. **`new String(digits)`** - Converts the char array to a String
   - Example: `['1', '3', '2', '4']` → `"1324"`

3. **`Long.parseLong(...)`** - Converts the String to a long integer
   - Example: `"1324"` → `1324L`

4. **`long result`** - Stores as long (64-bit) to handle potential overflow

**Why use `long` instead of `int`?**

```java
// If we used int directly:
int result = Integer.parseInt(new String(digits)); // Could throw exception!

// Example that would cause overflow:
// digits = ['2', '1', '4', '7', '4', '8', '3', '6', '4', '8']
// String = "2147483648" 
// This exceeds Integer.MAX_VALUE (2147483647)
// Integer.parseInt() would throw NumberFormatException
```

**The safe approach:**

```java
long result = Long.parseLong(new String(digits));
return result > Integer.MAX_VALUE ? -1 : (int) result;
```

This allows us to:

1. Parse potentially large numbers safely
2. Check if they exceed 32-bit limits
3. Return -1 if overflow, otherwise cast to int

**Alternative without the conversion:**

```java
// Direct approach (less safe):
try {
    int result = Integer.parseInt(new String(digits));
    return result;
} catch (NumberFormatException e) {
    return -1; // Overflow occurred
}
```

The `long` approach is cleaner and more explicit about overflow handling.
