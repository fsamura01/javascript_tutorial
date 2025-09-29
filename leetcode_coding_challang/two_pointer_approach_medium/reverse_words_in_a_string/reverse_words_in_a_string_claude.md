# **151. Reverse Words in a String**

I'll guide you through solving the "Reverse Words in a String" problem systematically, emphasizing problem-solving strategies and algorithmic thinking.

## 1. Problem Understanding

Let's break down the problem carefully:

- Input: A string containing words separated by spaces
- Requirement: Reverse the order of words
- Constraints:
  - Possible leading/trailing spaces
  - Multiple spaces between words
  - String length between 1 and 10^4 characters
  - Contains English letters, digits, and spaces

## 2. Constraints Analysis

Key constraints to consider:

- Space complexity needs to be efficient
- Handle multiple space scenarios
- Ensure single space between words in output
- Preserve word order reversal
- Eliminate unnecessary spaces

## 3. Problem Decomposition

The problem can be broken down into several sub-problems:

1. Remove leading and trailing spaces
2. Reduce multiple spaces between words to single spaces
3. Split the string into words
4. Reverse the order of words
5. Reconstruct the string with single spaces

## 4. Pattern Identification

Primary Patterns:

- Two-pointer technique
- String manipulation
- In-place string reversal
- String parsing

## 5. Approach Discussion

Let's outline a step-by-step approach:

1. Trim the input string
2. Split the string into words
3. Reverse the array of words
4. Join the words with a single space

## 6. Code Implementation

I'll create an artifact with a comprehensive JavaScript solution:

```javascript
/**
 * Reverses the order of words in a string
 * @param {string} s - Input string
 * @return {string} String with words reversed
 */
function reverseWords(s) {
    // 1. Trim the string and split into words
    // Use regex to split on one or more spaces and filter out empty strings
    const words = s.trim().split(/\s+/);
    
    // 2. Reverse the array of words
    return words.reverse().join(' ');
}

// Test cases
console.log(reverseWords("the sky is blue")); // "blue is sky the"
console.log(reverseWords("  hello world  ")); // "world hello"
console.log(reverseWords("a good   example")); // "example good a"
```

## 7. Complexity Analysis

Time Complexity: O(n)

- Trimming the string: O(n)
- Splitting the string: O(n)
- Reversing the array: O(k), where k is the number of words
- Joining the array: O(n)
Overall: O(n)

Space Complexity: O(n)

- Creating a new array of words
- Storing the reversed string

## 8. Alternative Solutions

1. In-place Solution (More Advanced):

```javascript
/**
 * In-place word reversal (simulating in-place for JS)
 * @param {string} s - Input string
 * @return {string} String with words reversed
 */
function reverseWordsInPlace(s) {
    // Helper function to reverse a portion of an array
    const reverseSection = (arr, start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    };
    
    // Convert string to array and trim
    const chars = s.trim().split('');
    const n = chars.length;
    
    // Reverse the entire array
    reverseSection(chars, 0, n - 1);
    
    // Reverse individual words
    let start = 0;
    for (let end = 0; end < n; end++) {
        if (chars[end] === ' ') {
            reverseSection(chars, start, end - 1);
            start = end + 1;
        }
    }
    
    // Reverse the last word
    reverseSection(chars, start, n - 1);
    
    // Remove extra spaces
    return chars.join('').replace(/\s+/g, ' ');
}

// Test cases
console.log(reverseWordsInPlace("the sky is blue")); // "blue is sky the"
console.log(reverseWordsInPlace("  hello world  ")); // "world hello"
console.log(reverseWordsInPlace("a good   example")); // "example good a"
```

## 9. Practice Recommendations

Similar LeetCode Problems:

1. Reverse Words in a String II
2. Reverse Words in a String III
3. Reverse String

## 10. Solution Flowchart

## Key Takeaways and Problem-Solving Strategies

1. **String Manipulation Techniques**
   - Utilize built-in string methods
   - Be aware of space handling
   - Understand regex for string parsing

2. **Approach Flexibility**
   - Simple approach using built-in methods
   - More complex in-place reversal for advanced scenarios

3. **Interview Preparation Tips**
   - Discuss trade-offs between solutions
   - Demonstrate understanding of time/space complexity
   - Show ability to optimize and refactor

### Mental Model for Problem Solving

When encountering string manipulation problems:

1. Identify the core transformation
2. Break down the problem into smaller steps
3. Consider multiple solution approaches
4. Analyze complexity trade-offs
5. Implement the most appropriate solution

### Interactive Learning Challenge

Try solving these variations:

1. What if words can contain special characters?
2. How would you modify the solution for very long strings?
3. Implement the solution without using built-in split/join methods

Would you like me to elaborate on any part of the solution or discuss the problem-solving approach in more depth?
