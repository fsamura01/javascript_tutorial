# Reverse Vowels of a String

## 1. Problem Understanding

This problem asks us to reverse the order of vowels in a string while keeping all other characters in their original positions. Let's break it down:

- We need to identify all vowels (a, e, i, o, u - both lowercase and uppercase) in the string.
- We need to reverse the order of these vowels while keeping all consonants and other characters in their original positions.
- The final string should have the same length as the original string.

For example, if we have "IceCreAm":

- The vowels are ['I', 'e', 'e', 'A']
- When reversed, they become ['A', 'e', 'e', 'I']
- Putting them back in the original positions of the vowels: "AceCreIm"

## 2. Pattern Identification

This problem is a perfect candidate for the **two-pointer technique**. We'll use two pointers that start from opposite ends of the string and move toward each other, swapping vowels as they encounter them.

The two-pointer approach is ideal here because:

- We need to process elements from both ends of the array simultaneously
- We're looking for specific elements (vowels) that need to be modified in relation to each other
- We're performing in-place (or simulated in-place) operations

## 3. Approach Discussion

Let's design our algorithm step by step:

1. Create a function that checks if a character is a vowel (both uppercase and lowercase).
2. Convert the input string to an array since strings are immutable in JavaScript.
3. Initialize two pointers: one at the beginning of the string (left) and one at the end (right).
4. While the left pointer is less than the right pointer:
   - Move the left pointer to the right until we find a vowel.
   - Move the right pointer to the left until we find a vowel.
   - If both pointers are pointing to vowels, swap them.
   - Increment the left pointer and decrement the right pointer.
5. Convert the array back to a string and return it.

## 4. Code Implementation

Let's implement this solution in JavaScript:

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    // Helper function to check if a character is a vowel
    const isVowel = (char) => {
        // Convert to lowercase for case-insensitive comparison
        char = char.toLowerCase();
        return char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u';
    };
    
    // Convert string to array for easier manipulation
    const chars = s.split('');
    
    // Initialize two pointers
    let left = 0;
    let right = s.length - 1;
    
    // Traverse the string from both ends
    while (left < right) {
        // Find the leftmost vowel
        while (left < right && !isVowel(chars[left])) {
            left++;
        }
        
        // Find the rightmost vowel
        while (left < right && !isVowel(chars[right])) {
            right--;
        }
        
        // Swap the vowels
        if (left < right) {
            // Swap
            const temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            
            // Move pointers
            left++;
            right--;
        }
    }
    
    // Convert array back to string
    return chars.join('');
};
```

## 5. Complexity Analysis

- **Time Complexity**: O(n), where n is the length of the string. We're traversing the string once with the two pointers, and each character is examined at most once.
- **Space Complexity**: O(n) because we convert the string to a character array. If the language allowed in-place string modification, it could be O(1) extra space.

## 6. Alternative Solutions

While the two-pointer approach is the most efficient for this problem, there are alternative approaches:

1. **Collect and Replace**:
   - First pass: Collect all vowels in the string into an array.
   - Reverse this array of vowels.
   - Second pass: Replace each vowel in the original string with vowels from the reversed array.

   This approach has O(n) time complexity but requires additional space for storing the vowels separately.

2. **Regular Expression**:
   - Use a regular expression to identify all vowels.
   - Replace them with the reversed array of vowels.

   This is a more concise solution but might be less efficient due to regex overhead.

## 7. Practice Recommendations

Here are similar problems that use the two-pointer technique:

1. **LeetCode #344: Reverse String** - A simpler version where you reverse the entire string.
2. **LeetCode #125: Valid Palindrome** - Check if a string is a palindrome considering only alphanumeric characters.
3. **LeetCode #680: Valid Palindrome II** - Check if a string can become a palindrome by removing at most one character.
4. **LeetCode #167: Two Sum II - Input Array Is Sorted** - Find two numbers that add up to a specific target.
5. **LeetCode #11: Container With Most Water** - Find two lines that together with the x-axis form a container that holds the most water.

## 8. Flowchart Design

## Example Walkthrough

Let's trace through the execution of our algorithm with the example "IceCreAm":

1. Convert to array: ['I', 'c', 'e', 'C', 'r', 'e', 'A', 'm']
2. Initialize pointers: left = 0, right = 7
3. Iteration 1:
   - chars[left] = 'I' is a vowel
   - chars[right] = 'm' is not a vowel
   - right-- → right = 6
4. Iteration 2:
   - chars[left] = 'I' is a vowel
   - chars[right] = 'A' is a vowel
   - Swap them: ['A', 'c', 'e', 'C', 'r', 'e', 'I', 'm']
   - left++ → left = 1, right-- → right = 5
5. Iteration 3:
   - chars[left] = 'c' is not a vowel
   - left++ → left = 2
6. Iteration 4:
   - chars[left] = 'e' is a vowel
   - chars[right] = 'e' is a vowel
   - Swap them (no change since they're the same): ['A', 'c', 'e', 'C', 'r', 'e', 'I', 'm']
   - left++ → left = 3, right-- → right = 4
7. Iteration 5:
   - chars[left] = 'C' is not a vowel
   - left++ → left = 4
8. Iteration 6:
   - chars[left] = 'r' is not a vowel
   - left++ → left = 5
9. Now left = 5, right = 4, so left > right and we exit the loop
10. Convert array back to string: "AceCreIm"

This matches our expected output!

## Key Insights

1. **In-Place Operations**: The two-pointer technique allows us to modify the string with minimal extra space.

2. **Problem Decomposition**: Breaking down the problem into smaller steps (identifying vowels, using two pointers, swapping) makes it more manageable.

3. **Edge Cases**: Our solution handles all the constraints, including uppercase and lowercase vowels, as well as strings with few or no vowels.

4. **Pattern Recognition**: Recognizing that this is a two-pointer problem is the key insight. This pattern appears in many problems involving arrays or strings when we need to consider elements from both ends.

By understanding this pattern and approach, you'll be able to recognize and solve many similar problems efficiently. The two-pointer technique is a fundamental strategy in algorithmic problem solving that extends beyond just string manipulation.
