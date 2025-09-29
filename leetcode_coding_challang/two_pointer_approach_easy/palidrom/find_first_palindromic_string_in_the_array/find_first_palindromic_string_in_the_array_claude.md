# **2108. Find First Palindromic String in the Array**

I'll guide you through solving the "Find First Palindromic String in the Array" problem following your structured approach.

1. **Problem Understanding**
   The problem "2108. Find First Palindromic String in the Array" states:

- Given an array of strings `words`
- Return the first palindromic string in the array
- If no such string exists, return an empty string
- A string is palindromic if it reads the same forward and backward

Example:

```javascript
Input: words = ["abc","car","ada","racecar","cool"]
Output: "ada"
Explanation: "ada" is the first palindromic string in the array.
```

## **Pattern Identification**

This problem involves:

- Array iteration
- Two-pointer technique (for palindrome checking)
- String manipulation

## **Approach Discussion**

Let's break it down:

1. Iterate through the array of strings
1. For each string, check if it's a palindrome:
   - Use two pointers (left and right)
   - Compare characters from both ends moving inward
   - If all characters match, it's a palindrome
1. Return the first palindromic string found
1. If no palindrome is found, return empty string

## **Code Implementation**

Here's a solution in JavaScript with detailed comments:

```javascript
/**
 * @param {string[]} words
 * @return {string}
 */
function firstPalindrome(words) {
  // Helper function to check if a string is palindrome
  const isPalindrome = (str) => {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      // If characters don't match, not a palindrome
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };

  // Iterate through each word in the array
  for (const word of words) {
    // Return the first palindrome found
    if (isPalindrome(word)) {
      return word;
    }
  }

  // No palindrome found
  return "";
}
```

Alternative implementation using built-in methods:

```javascript
function firstPalindrome(words) {
  // Using array methods and string reversal
  return words.find((word) => word === word.split("").reverse().join("")) || "";
}
```

## **Complexity Analysis**

First Implementation:

- Time Complexity: O(n \* m) where:
  - n is the number of words in the array
  - m is the average length of each word
- Space Complexity: O(1) - only using pointers

Second Implementation:

- Time Complexity: O(n \* m)
- Space Complexity: O(m) - creating new arrays for reversal

## **Alternative Solutions**

- Using recursion for palindrome checking
- Using a single pointer from the middle outwards
- Using string slicing and comparison
- Using regular expressions (though not recommended for this case)

## **Practice Recommendations**

Similar problems for practice:

- LeetCode 125: Valid Palindrome
- LeetCode 680: Valid Palindrome II
- LeetCode 234: Palindrome Linked List
- LeetCode 9: Palindrome Number

## **Flowchart**

Let me create a flowchart to visualize the solution:

Key Learning Points:

1. Use helper functions to make code more readable and maintainable
2. Consider built-in methods vs. manual implementation trade-offs
3. Think about early termination conditions
4. Look for opportunities to optimize space usage

Would you like me to elaborate on any part of the solution or explain how this pattern applies to similar problems?
