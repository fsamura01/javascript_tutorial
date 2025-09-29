# **1961. Check If String Is a Prefix of Array**

Let me guide you through solving this LeetCode problem with a focus on building strong problem-solving fundamentals.

1. Problem Understanding
   Let's first break down what the problem is asking us to do in simple terms:

Given a string `s` and an array of strings `words`, we need to determine if `s` can be formed by concatenating consecutive strings from the beginning of `words`. For example, if s = "iloveleetcode" and words = ["i","love","leetcode","apples"], the answer would be true because "i" + "love" + "leetcode" forms our target string.

Key constraints to consider:

- 1 ≤ words.length ≤ 100
- 1 ≤ words[i].length ≤ 20
- 1 ≤ s.length ≤ 1000
- All strings consist of lowercase English letters

## **Pattern Identification**

This problem falls into the category of string matching and array traversal. While it might look like it needs a complex pattern, it actually demonstrates an important principle in problem-solving: sometimes the simplest approach is the most effective. This is a linear traversal problem where we need to build and compare strings.

## **Approach Discussion**

Let's think through this step by step:

1. We need to concatenate strings from the start of the array until either:
   - We match our target string (return true)
   - We exceed our target string length (return false)
   - We run out of words (return false)
2. Rather than creating multiple strings, we can build our string progressively and compare

Let me illustrate this with a visual diagram using Mermaid:

## **Code Implementation**

Let's write a clear, commented solution:

```javascript
/**
 * @param {string} s - Target string to match
 * @param {string[]} words - Array of words to concatenate
 * @return {boolean}
 */
function isPrefixString(s, words) {
  // Initialize our constructed string
  let prefix = "";

  // Iterate through the words array
  for (let i = 0; i < words.length; i++) {
    // Add current word to our prefix
    prefix += words[i];

    // If prefix matches our target string, we found a solution
    if (prefix === s) {
      return true;
    }

    // If prefix length exceeds target or doesn't match so far,
    // we can't possibly form the target string
    if (prefix.length > s.length || s.substring(0, prefix.length) !== prefix) {
      return false;
    }
  }

  // If we've used all words but haven't matched exactly, return false
  return false;
}
```

## **Complexity Analysis**

Time Complexity: O(n × m), where:

- n is the length of the target string
- m is the number of words in the array
  This is because for each word, we might need to compare up to n characters.

Space Complexity: O(n), where n is the length of the target string, as we need to store the prefix string.

## **Alternative Solutions**

We could optimize this slightly by using early termination conditions:

```javascript
function isPrefixString(s, words) {
  // Early termination: if first word doesn't match start of s
  if (!s.startsWith(words[0])) return false;

  let currentLength = 0;

  for (let word of words) {
    // If we've exceeded target length, no need to continue
    if (currentLength + word.length > s.length) return false;

    // Check if current section matches
    if (s.slice(currentLength, currentLength + word.length) !== word) {
      return false;
    }

    currentLength += word.length;
    if (currentLength === s.length) return true;
  }

  return currentLength === s.length;
}
```

## **Practice Recommendations**

To strengthen your understanding of string manipulation and array traversal patterns, I recommend trying these similar problems:

1. LeetCode 14: Longest Common Prefix
2. LeetCode 28: Find the Index of the First Occurrence in a String
3. LeetCode 392: Is Subsequence

These problems all involve similar patterns of string comparison and manipulation, but each adds its own twist that will help you build a more robust understanding of string algorithms.

Key Learning Points:

- Always consider edge cases first
- Look for opportunities to terminate early
- Consider whether you need to store the entire string or can compare piece by piece
- Think about how to minimize string operations, which can be expensive

Would you like to explore any of these aspects in more detail or see how to solve any of the recommended practice problems?

I'll help you solve this problem using a two-pointer approach, which will provide an interesting alternative perspective on the solution.

Let's think about how we can use two pointers to solve this string prefix matching problem. The key insight is that we can use one pointer for the target string and another for tracking our position within the words array.

Let me walk you through the thought process:

The two pointers we'll use are:

1. A pointer (let's call it `targetIndex`) that moves through the target string `s`
2. A pointer (let's call it `wordIndex`) that keeps track of which word we're currently examining

Here's the solution with detailed explanations:

```javascript
/**
 * @param {string} s - Target string to match
 * @param {string[]} words - Array of words to concatenate
 * @return {boolean}
 */
function isPrefixString(s, words) {
  // Initialize our pointer for the target string
  let targetIndex = 0;

  // Iterate through each word in the array
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const currentWord = words[wordIndex];

    // For each character in the current word
    for (let charIndex = 0; charIndex < currentWord.length; charIndex++) {
      // If we've exceeded the target string length or characters don't match
      if (
        targetIndex >= s.length ||
        s[targetIndex] !== currentWord[charIndex]
      ) {
        return false;
      }
      // Move the target pointer forward
      targetIndex++;
    }

    // If we've matched the entire target string
    if (targetIndex === s.length) {
      return true;
    }
  }

  // Return false if we've used all words but haven't matched the entire target
  return targetIndex === s.length;
}
```

Let's analyze how this two-pointer approach works with an example:

```javascript
s = "iloveyou";
words = ["i", "love", "you", "too"];
```

Let's visualize the pointer movements:

The benefits of this two-pointer approach include:

1. **Character-by-Character Comparison**: Instead of creating substrings, we're comparing characters directly, which can be more efficient.

2. **Minimal Space Usage**: We only need two integer pointers, making the space complexity O(1).

3. **Early Termination**: We can stop as soon as we detect a mismatch or reach the end of the target string.

Time and Space Complexity Analysis:

- Time Complexity: O(n) where n is the length of the target string s
- Space Complexity: O(1) as we only use two pointers

This approach has some advantages over the previous solution:

1. No string concatenation operations
2. No substring creation
3. Constant space complexity instead of linear

The key to understanding this approach is to visualize how the pointers move:

- `targetIndex` moves through the target string one character at a time
- `wordIndex` selects which word we're currently comparing
- For each word, we compare its characters with the target string starting at the current `targetIndex`

This type of two-pointer technique is particularly useful when you need to:

- Compare elements from different sequences
- Track progress through multiple data structures simultaneously
- Avoid creating new strings or arrays

Similar problems where you can apply this two-pointer technique:

1. LeetCode 28: Implement strStr() (String matching)
2. LeetCode 392: Is Subsequence
3. LeetCode 844: Backspace String Compare

Would you like to see how this two-pointer approach could be adapted for any of these similar problems? Or would you like to explore how we could further optimize this solution?
