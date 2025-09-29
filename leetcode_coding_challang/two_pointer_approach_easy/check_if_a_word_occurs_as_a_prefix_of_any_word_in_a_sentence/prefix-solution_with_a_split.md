# LeetCode 1455: Check If a Word Occurs As a Prefix of Any Word in a Sentence

## 1. Problem Understanding

Let's break down the problem "Check If a Word Occurs As a Prefix of Any Word in a Sentence":

This problem asks us to:

1. Take a sentence (string of words separated by spaces) and a searchWord
2. Find if the searchWord is a prefix of any word in the sentence
3. Return the 1-indexed position of the first word where searchWord is a prefix
4. Return -1 if no such word exists

For example:

- If sentence = "i love eating burger" and searchWord = "burg"
- "burg" is a prefix of "burger" (the 4th word)
- So we should return 4

We need to check each word in the sentence, from left to right, to see if the searchWord is a prefix of the current word.

## 2. Pattern Identification

This problem involves:

- String processing
- Prefix checking
- Array/String traversal

The core pattern here is string manipulation and comparison. We don't need complex algorithmic patterns like dynamic programming or sliding windows. This is a straightforward string traversal and prefix matching problem.

## 3. Approach Discussion

Here's a step-by-step approach:

1. Split the sentence into an array of words
2. Iterate through each word in the array
3. For each word, check if searchWord is a prefix of that word
4. If we find a match, return the index + 1 (since we need 1-indexed position)
5. If we go through all words without finding a match, return -1

A simple way to check if a string is a prefix of another is to see if the second string starts with the first. In JavaScript, we can use the `startsWith()` method.

## 4. Code Implementation

Let's implement this solution in JavaScript:

## 5. Complexity Analysis

Let's analyze the time and space complexity of our solution:

### Time Complexity: O(n)

- Where n is the total number of characters in the sentence
- Splitting the sentence into words takes O(n) time
- Iterating through each word takes O(w) time, where w is the number of words
- The startsWith() comparison for each word takes O(k) time in the worst case, where k is the length of searchWord
- Overall, the time complexity is dominated by the O(n) operation

### Space Complexity: O(n)

- We store the words array, which in the worst case contains all characters from the sentence plus the delimiters
- Therefore, the space complexity is O(n)

## 6. Alternative Solutions

While our solution is already quite optimal, let's consider an alternative approach:

We could avoid splitting the entire sentence and instead scan through it character by character, checking for word boundaries (spaces) and potential prefixes. This would save some space but might be more complex to implement.

This alternative solution uses a character-by-character approach:

- It avoids the explicit split, which might save some space
- The time complexity remains O(n)
- It might be slightly less readable but demonstrates a different approach

Another possible optimization (though not necessary for this problem size) would be to use a regular expression to find matching words, which could be more efficient for certain patterns.

## 7. Practice Recommendations

Here are some similar LeetCode problems that involve string pattern matching and prefix operations:

1. **LeetCode 14: Longest Common Prefix**

   - Find the longest common prefix string amongst an array of strings

2. **LeetCode 28: Find the Index of the First Occurrence in a String**

   - Return the index of the first occurrence of needle in haystack

3. **LeetCode 929: Unique Email Addresses**

   - Deals with string manipulation and pattern matching

4. **LeetCode 1408: String Matching in an Array**

   - Find all strings that are substrings of another string in the array

5. **LeetCode 1668: Maximum Repeating Substring**
   - Find the maximum k where the substring appears k times

These problems will help you strengthen your string manipulation and pattern matching skills, which are very common in technical interviews.

## 8. Flowchart Design

In this flowchart:

1. We start by receiving the input
2. Then we split the sentence into an array of words
3. We initialize a counter i to track our position in the array
4. We check if we have more words to process
5. For each word, we check if it starts with the searchWord
6. If a match is found, we return the 1-indexed position (i + 1)
7. If no match is found after checking all words, we return -1

## Summary

The problem "Check If a Word Occurs As a Prefix of Any Word in a Sentence" is a straightforward string manipulation problem that focuses on:

1. Breaking down a sentence into individual words
2. Checking if a target string is a prefix of any word
3. Returning the 1-indexed position of the first matching word

The solution involves basic string operations and comparisons, with a time complexity of O(n) and space complexity of O(n).

This type of problem is valuable for understanding:

- String manipulation techniques
- Array traversal
- Basic search algorithms
- Prefix checking operations

Understanding this pattern will help you recognize and solve similar string processing problems in technical interviews. Remember that string manipulation questions are very common in coding interviews, and having a solid understanding of methods like split(), startsWith(), and substring() is essential.
