# **2000. Reverse Prefix of Word**

I'll guide you through solving the "Reverse Prefix of Word" problem following your structured approach.

1. **Problem Understanding**
   The problem "2000. Reverse Prefix of Word" states:

- Given a string `word` and a character `ch`
- Find the first occurrence of `ch` in `word`
- Reverse the segment of `word` from index 0 to the position where `ch` first appears (inclusive)
- Return the resulting string
- If `ch` does not exist in `word`, return `word`

Example:

```javascript
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: "d" occurs first at position 3. Reversing the substring from 0 to 3 gives "dcba", and the final result is "dcbaefd"
```

## **Pattern Identification**

This problem involves:

- String manipulation
- Two-pointer technique (for the reversal part)
- Single pass through the string

## **Approach Discussion**

Let's break it down:

1. Find the first occurrence of `ch` in `word`
1. If `ch` is not found, return the original word
1. Take the substring from index 0 to the position of `ch` (inclusive)
1. Reverse this substring
1. Concatenate the reversed part with the rest of the string

1. **Code Implementation**
   Here's a solution in JavaScript with detailed comments:

```javascript
/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
function reversePrefix(word, ch) {
  // Find the first occurrence of ch
  const pos = word.indexOf(ch);

  // If ch is not found, return original word
  if (pos === -1) return word;

  // Extract prefix that needs to be reversed
  const prefix = word.substring(0, pos + 1);

  // Get the remaining part of the word
  const suffix = word.substring(pos + 1);

  // Reverse the prefix using array methods
  const reversedPrefix = prefix.split("").reverse().join("");

  // Combine reversed prefix with suffix
  return reversedPrefix + suffix;
}
```

Alternative implementation using two-pointer approach:

```javascript
function reversePrefix(word, ch) {
  // Convert string to array for easier manipulation
  const arr = word.split("");
  const pos = word.indexOf(ch);

  if (pos === -1) return word;

  // Use two pointers to reverse the prefix
  let left = 0;
  let right = pos;
  while (left < right) {
    // Swap characters
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join("");
}
```

## **Complexity Analysis**

First Implementation:

- Time Complexity: O(n) - where n is the length of the word
  - indexOf(): O(n)
  - substring(): O(n)
  - split(), reverse(), join(): O(n)
- Space Complexity: O(n) - creating new strings/arrays

Second Implementation:

- Time Complexity: O(n)
- Space Complexity: O(n) - converting string to array

## **Alternative Solutions**

- Using a stack to reverse the prefix
- Using recursion (though not recommended for this case)
- Using pointer manipulation in languages that allow string mutation

## **Practice Recommendations**

Similar problems for practice:

- LeetCode 344: Reverse String
- LeetCode 541: Reverse String II
- LeetCode 557: Reverse Words in a String III
- LeetCode 151: Reverse Words in a String

## **Flowchart**

Let me create a flowchart to visualize the solution:

Key Learning Points:

1. Always check edge cases (character not found)
2. Consider string immutability in JavaScript
3. Think about space-time trade-offs between different approaches
4. Look for opportunities to use built-in methods efficiently

Would you like me to elaborate on any part of the solution or explain how this pattern applies to similar problems?
