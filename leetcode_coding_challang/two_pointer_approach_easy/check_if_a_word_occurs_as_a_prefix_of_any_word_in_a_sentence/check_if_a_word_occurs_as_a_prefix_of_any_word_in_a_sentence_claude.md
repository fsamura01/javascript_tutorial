# **1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence**

Let me guide you through solving this LeetCode problem with a focus on building a strong understanding of the underlying concepts and patterns.

1. Problem Understanding

Let's first break down what the problem is asking us to do:

- Given a sentence (string) and a search word (string)
- We need to find if the search word is a prefix of any word in the sentence
- If it is a prefix, return the 1-based index of that word in the sentence
- If it's not found, return -1

For example, if we have:
sentence = "i love eating burger" and searchWord = "burg"
The answer would be 4 since "burg" is a prefix of "burger" which is the 4th word

Key constraints to consider:

- The sentence contains lowercase English letters and spaces
- Each word in the sentence is separated by a single space
- The search word contains only lowercase English letters

## **Pattern Identification**

This problem primarily involves string manipulation and searching. The core patterns we'll use are:

- String splitting (to separate words)
- Prefix checking (string comparison)
- Iteration through an array

This falls into the category of "String Processing" problems, which are common in interviews. The key insight is that we don't need any complex data structures - just efficient string handling.

## **Approach Discussion**

Let's develop our solution step by step:

a. First, we need to split the sentence into individual words
b. Then, for each word:

- Check if the search word could be a prefix (compare lengths)
- If possible, check if the search word matches the beginning of the current word
  c. Return the appropriate index or -1 if not found

## **Code Implementation**

Let me code this solution with detailed explanations:

```javascript
/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
function isPrefixOfWord(sentence, searchWord) {
  // Split the sentence into an array of words
  // The split() method creates an array by splitting the string at each space
  const words = sentence.split(" ");

  // Iterate through each word
  // We use a traditional for loop instead of forEach because:
  // 1. We need the index (which must be 1-based in our return value)
  // 2. It's more efficient as we can break early when found
  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];

    // Optimization: Skip words that are shorter than searchWord
    if (currentWord.length < searchWord.length) {
      continue;
    }

    // Check if searchWord is a prefix of currentWord
    // We use substring instead of startsWith for better browser compatibility
    if (currentWord.substring(0, searchWord.length) === searchWord) {
      // Return 1-based index
      return i + 1;
    }
  }

  // If we haven't found a match, return -1
  return -1;
}

// Test cases
console.log(isPrefixOfWord("i love eating burger", "burg")); // Expected output: 4
console.log(isPrefixOfWord("this problem is an easy problem", "pro")); // Expected output: 2
console.log(isPrefixOfWord("i am tired", "you")); // Expected output: -1
```

## **Complexity Analysis**

Let's analyze the time and space complexity of our solution:

Time Complexity: O(N), where N is the total length of the sentence

- split(): O(N) to create the array of words
- The main loop: O(N) as we might need to check each character once
- substring() comparisons: O(M) where M is the length of searchWord

Space Complexity: O(N)

- We store the split words array which could be up to the size of the input sentence
- No other significant space usage

## **Alternative Solutions**

We could consider two alternative approaches:

A. Regular Expression Solution:

```javascript
function isPrefixOfWord(sentence, searchWord) {
  const regex = new RegExp(`\\b${searchWord}`, "i");
  const match = regex.exec(sentence);
  if (!match) return -1;
  return sentence.slice(0, match.index).split(" ").length;
}
```

B. Direct String Traversal (without split):

```javascript
function isPrefixOfWord(sentence, searchWord) {
  let wordCount = 1;
  let i = 0;

  while (i < sentence.length) {
    if (i === 0 || sentence[i - 1] === " ") {
      if (isPrefix(sentence, i, searchWord)) {
        return wordCount;
      }
      wordCount++;
    }
    i++;
  }
  return -1;
}
```

## **Similar Problems for Practice**

Here are some related problems that use similar patterns:

1. LeetCode 14: Longest Common Prefix
2. LeetCode 387: First Unique Character in a String
3. LeetCode 28: Find the Index of the First Occurrence in a String

Let me create a flowchart to visualize the solution:

## **Key Learning Points:**

1. String manipulation problems often have simple solutions - don't overcomplicate them
2. Consider input constraints and edge cases early in your solution design
3. Choose appropriate string methods (split, substring) based on the problem requirements
4. Think about optimization opportunities (like checking string length before comparing)
5. Consider browser compatibility when choosing methods (substring vs startsWith)

Would you like me to elaborate on any part of the solution or discuss more advanced string processing patterns?

## **I'll break down this critical section of the code in detail.**

```javascript
if (currentWord.substring(0, searchWord.length) === searchWord) {
  // Return 1-based index
  return i + 1;
}
```

This piece of code is checking if our `searchWord` is a prefix of the current word we're examining. Let's understand it step by step:

1. The `substring()` Method:

```javascript
currentWord.substring(0, searchWord.length);
```

- `substring(startIndex, endIndex)` extracts characters from a string between two indices
- The first parameter (0) is where to start (inclusive)
- The second parameter (searchWord.length) is where to end (exclusive)
- For example:

```javascript
let word = "burger";
let search = "burg";
// search.length is 4
// word.substring(0, 4) will extract "burg"
```

## **The Comparison:**

```javascript
=== searchWord
```

- Strict equality comparison between the extracted prefix and our search word
- Returns `true` only if they match exactly (same characters and case)

## **The Return Statement:**

```javascript
return i + 1;
```

- We add 1 to the index because the problem requires a 1-based index
- If we found the word at index 0 (first word), we return 1
- If we found the word at index 3 (fourth word), we return 4

Here's a step-by-step example:

```javascript
let sentence = "i love eating burger";
let searchWord = "burg";

// First iteration (i = 0):
currentWord = "i"
searchWord.length = 4
"i".substring(0, 4) = "i"  // Not equal to "burg", continue

// Second iteration (i = 1):
currentWord = "love"
"love".substring(0, 4) = "love"  // Not equal to "burg", continue

// Third iteration (i = 2):
currentWord = "eating"
"eating".substring(0, 4) = "eati"  // Not equal to "burg", continue

// Fourth iteration (i = 3):
currentWord = "burger"
"burger".substring(0, 4) = "burg"  // Equal to "burg"!
return 3 + 1 = 4  // Return the 1-based index
```

Alternative Approaches:

1. Using `startsWith()` (more modern but same concept):

```javascript
if (currentWord.startsWith(searchWord)) {
  return i + 1;
}
```

## **Using a regular expression:**

```javascript
if (new RegExp(`^${searchWord}`).test(currentWord)) {
  return i + 1;
}
```

The `substring()` approach is often preferred because:

1. It's very explicit about what we're doing
2. It has good browser compatibility
3. It's easy to understand and debug
4. It performs well for simple prefix checking

Would you like me to explain any other aspects of the solution or show more examples of how the substring comparison works with different inputs?

I'll help you solve this problem using the two-pointer technique, which offers an interesting alternative approach that avoids splitting the string.

Let's think about how we can use two pointers effectively here. Instead of splitting the sentence into words, we can:

1. Use one pointer to track the start of each word
2. Use another pointer to check characters within the word
3. Keep track of which word number we're currently examining

## **Code Implementtation**

````javascript
/**
 * Two-pointer solution for finding if a word occurs as a prefix
 * @param {string} sentence - The input sentence to search through
 * @param {string} searchWord - The prefix we're looking for
 * @return {number} - The 1-based index of the word with the prefix, or -1 if not found
 */
function isPrefixOfWord(sentence, searchWord) {
    // Initialize our tracking variables
    let wordCount = 1;          // Keep track of which word we're on (1-based)
    let wordStart = 0;          // Points to the start of the current word
    let i = 0;                  // Points to the current character we're examining

    // Continue until we reach the end of the sentence
    while (i <= sentence.length) {
        // Check if we've reached a word boundary (space or end of sentence)
        if (i === sentence.length || sentence[i] === ' ') {
            // We've found the end of a word, so check if it matches our prefix
            if (isPrefix(sentence, wordStart, searchWord)) {
                return wordCount;
            }

            // Move to the next word
            wordCount++;
            wordStart = i + 1;  // Start of next word is after the space
        }
        i++;
    }

    return -1;  // No matching prefix found
}

/**
 * Helper function to check if searchWord is a prefix of the word starting at wordStart
 * @param {string} sentence - The full sentence
 * @param {number} wordStart - Starting index of the current word
 * @param {string} searchWord - The prefix we're looking for
 * @return {boolean} - True if searchWord is a prefix of the current word
 */
function isPrefix(sentence, wordStart, searchWord) {
    // Check each character of the potential prefix
    for (let i = 0; i < searchWord.length; i++) {
        // If we've reached the end of the sentence or hit a space before
        // finishing the prefix check, this can't be a match
        if (wordStart + i >= sentence.length || sentence[wordStart + i] === ' ') {
            return false;
        }

        // If any character doesn't match, this isn't a prefix
        if (sentence[wordStart + i] !== searchWord[i]) {
            return false;
        }
    }

    // If we've made it here, all characters matched
    return true;
}

// Test cases to demonstrate how the solution works
const testCases = [
    {
        sentence: "i love eating burger",
        searchWord: "burg",
        expected: 4
    },
    {
        sentence: "this problem is an easy problem",
        searchWord: "pro",
        expected: 2
    },
    {
        sentence: "i am tired",
        searchWord: "you",
        expected: -1
    }
];

// Run test cases
testCases.forEach((test, index) => {
    const result = isPrefixOfWord(test.sentence, test.searchWord);
    console.log(`Test ${index + 1}:`);
    console.log(`Sentence: "${test.sentence}"`);
    console.log(`Search Word: "${test.searchWord}"`);
    console.log(`Expected: ${test.expected}, Got: ${result}`);
    console.log(`Result: ${result === test.expected ? 'PASS' : 'FAIL'}\n`);
});
```
Let's break down why this two-pointer approach is interesting and different from our previous solution:

1. Space Efficiency:

   - We don't create any new strings or arrays
   - We work directly with the original sentence
   - Space complexity is O(1) instead of O(N)

2. Single Pass:

   - We only traverse the sentence once
   - Each character is examined exactly once
   - Time complexity remains O(N)

3. Pointer Roles:

   - `wordStart`: Marks the beginning of each word we examine
   - `i`: Moves through the sentence character by character
   - `wordCount`: Keeps track of our position for the 1-based index return value

4. Key Insights:
   The solution hinges on two main ideas:
   - Word boundaries are marked by spaces or the end of the sentence
   - We can check prefixes by comparing characters sequentially from the word start

Let's look at how the pointers move through an example:

```javascript
sentence = "i love eating burger";
searchWord = "burg";

// Initial state:
(wordStart = 0), (i = 0), (wordCount = 1);
// Looking at: "i"

// After first word:
(wordStart = 2), (i = 2), (wordCount = 2);
// Looking at: "love"

// After second word:
(wordStart = 7), (i = 7), (wordCount = 3);
// Looking at: "eating"

// At final word:
(wordStart = 13), (i = 13), (wordCount = 4);
// Looking at: "burger" -> Match found!
````

This solution has several advantages:

1. Memory efficient - no additional data structures needed
2. More precise control over the search process
3. Potentially faster for very long sentences with short words
4. Doesn't rely on string splitting methods

One potential improvement we could make would be to add early termination if we find that the remaining sentence is shorter than our search word:

```javascript
if (sentence.length - wordStart < searchWord.length) {
  return -1; // Remaining text is too short to contain our prefix
}
```

Would you like me to explain any particular part of this solution in more detail? Or shall we explore how this approach might be adapted for similar string processing problems?
