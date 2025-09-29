# **917. Reverse Only Letters**

## Let me help guide you through solving the "Reverse Only Letters" problem using a structured approach that will help build your problem-solving skills

1. **Problem Understanding**
   Let's first break down what the problem is asking us to do:

- Given a string S, we need to reverse only the letters in it
- Non-letter characters should stay in their original positions
- For example, "ab-cd" should become "dc-ba"
- Letters include both uppercase and lowercase English alphabet characters

The key constraints and edge cases to consider are:

- String S can contain any ASCII characters
- We need to preserve the positions of non-letter characters
- The string could be empty or contain no letters
- The string could contain all letters or all non-letters

## **Pattern Identification**

This problem is a perfect candidate for the "Two Pointers" pattern because:

- We need to process characters from both ends of the string
- We're swapping elements (letters) while maintaining certain positions (non-letters)
- Two pointers help us efficiently track which letters to swap

## **Approach Discussion**

Let's break down the solution into clear steps:

Step 1: Initialize two pointers

- Left pointer starts from the beginning of the string
- Right pointer starts from the end of the string

Step 2: Move the pointers toward each other while:

- Skip non-letter characters by moving the respective pointer
- When both pointers point to letters, swap them
- Continue until pointers meet

Step 3: Return the modified string

## **Code Implementation**

Let me write a JavaScript solution with detailed comments:

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function reverseOnlyLetters(s) {
  // Convert string to array since strings are immutable in JavaScript
  const arr = s.split("");

  // Initialize two pointers
  let left = 0;
  let right = s.length - 1;

  // Helper function to check if character is a letter
  const isLetter = (char) => {
    return /[a-zA-Z]/.test(char);
  };

  // Continue until pointers meet
  while (left < right) {
    // Skip non-letters from left
    while (left < right && !isLetter(arr[left])) {
      left++;
    }

    // Skip non-letters from right
    while (left < right && !isLetter(arr[right])) {
      right--;
    }

    // Swap letters if pointers haven't met
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  // Convert array back to string
  return arr.join("");
}
```

## **Complexity Analysis**

Time Complexity: O(n)

- We traverse the string once with the two pointers
- Each character is visited at most once
- The isLetter check is O(1)

Space Complexity: O(n)

- We create an array from the input string
- The space needed is proportional to the input string length

## **Alternative Solutions**

An alternative approach could use:

- Two separate arrays: one for storing positions of letters and another for non-letters
- Stack to store letters and rebuild the string
  However, the two-pointer approach is more efficient as it requires only one pass through the string.

## **Practice Recommendations**

Similar problems to practice this pattern:

- LeetCode 344: Reverse String
- LeetCode 345: Reverse Vowels of a String
- LeetCode 541: Reverse String II
  These problems help reinforce the two-pointer pattern with different constraints.

## **Flowchart Design**

Let me create a flowchart to visualize the solution:

Would you like me to explain any particular part of the solution in more detail? Or would you like to see how this solution handles specific test cases?

This problem is an excellent example of how the two-pointer pattern can be used to solve string manipulation problems efficiently. The key insight is recognizing that we can process the string from both ends simultaneously while handling special cases (non-letters) with additional conditions.

One important learning point is how we handle the immutability of strings in JavaScript by converting to an array first. This is a common pattern when you need to modify strings in-place in JavaScript.
