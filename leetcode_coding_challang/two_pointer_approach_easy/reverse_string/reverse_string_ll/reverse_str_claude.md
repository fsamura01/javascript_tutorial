# **541. Reverse String II**

I'll help you solve this problem step by step and provide a detailed complexity analysis.

Let's break this down into steps:

1. First, let's understand what we need to do:
   - We process the string in chunks of 2k characters
   - For each chunk, we reverse the first k characters
   - If we have less than k characters left, reverse all of them
   - If we have between k and 2k characters left, reverse only the first k

Here's the solution with detailed comments:

```javascript
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
function reverseStr(s, k) {
  // Convert string to array since strings are immutable in JavaScript
  const arr = s.split("");

  // Process string in chunks of size 2k
  for (let start = 0; start < s.length; start += 2 * k) {
    // Calculate end index for reversal
    // Math.min ensures we don't go beyond string length
    let left = start;
    let right = Math.min(start + k - 1, s.length - 1);

    // Reverse the first k characters
    while (left < right) {
      // Swap characters
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }

  // Convert array back to string
  return arr.join("");
}
```

Let's do a complexity analysis:

## Time Complexity: O(n)

- Converting string to array: O(n)
- Main loop iterates through string in chunks of 2k: O(n/2k) iterations
- Inner while loop reverses k characters: O(k/2) operations
- Total operations in loops: O(n/2k \* k/2) = O(n/4)
- Converting array back to string: O(n)
- Therefore, overall time complexity is O(n)

## **Space Complexity: O(n)**

- We create an array of length n to store the characters
- The rest of the operations are done in-place
- Therefore, space complexity is O(n)

Let's trace through Example 1 to understand how it works:

```javascript
Input: s = "abcdefg", k = 2

Process:
1. First chunk (start = 0):
   - Reverse first 2 chars: "ab" → "ba"
   - Result so far: "bacdefg"

2. Second chunk (start = 4):
   - Reverse first 2 chars: "ef" → "fe"
   - Result so far: "bacdfeg"

Final output: "bacdfeg"
```

## **Some key points about the implementation:**

1. We convert the string to array because strings are immutable in JavaScript
2. We use `Math.min()` to handle cases where we don't have full k characters left
3. The inner while loop performs the actual reversal using two pointers
4. The outer for loop advances by 2k to process each chunk

## **Let me explain the purpose of using Math.min() in this context with a clear example.**

The Math.min() is used here to handle edge cases where we might not have enough characters left in the string. It prevents us from trying to access an index that's beyond the string's length.

Let's break it down with examples:

1. **Normal Case** (enough characters):

```javascript
(s = "abcdefg"), (k = 2);
// When start = 0:
right = Math.min(0 + 2 - 1, 7 - 1);
right = Math.min(1, 6);
right = 1; // This gives us correct boundary for "ab"
```

1. **Edge Case** (not enough characters):

```javascript
(s = "abcdef"), (k = 4);
// When start = 4:
right = Math.min(4 + 4 - 1, 6 - 1);
right = Math.min(7, 5);
right = 5; // Without Math.min(), we'd try to access index 7, which doesn't exist!
```

Without Math.min(), we could get these problems:

```javascript
s = "abc", k = 4
right = start + k - 1
right = 0 + 4 - 1 = 3  // This would be out of bounds for "abc"!

// With Math.min():
right = Math.min(3, 2)  // 2 is s.length - 1
right = 2  // Safely points to the last character
```

This handling is crucial for the constraint: "If there are fewer than k characters left,
reverse all of them." Math.min() ensures we only reverse up to the available characters,
preventing array index out of bounds errors.
