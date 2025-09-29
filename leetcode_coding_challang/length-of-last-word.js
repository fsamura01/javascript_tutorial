/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  // Trim leading and trailing whitespace
  s = s.trim();

  // Split the string into an array of words
  const words = s.split(" ");

  // Return the length of the last word
  return words[words.length - 1].length;
};

// Test cases
lengthOfLastWord("Hello World");
lengthOfLastWord("   fly me   to   the moon  ");
lengthOfLastWord("luffy is still joyboy");
/*  
Complexity Analysis:

**Time Complexity**: O(n), where n is the length of the input string `s`. The time complexity is linear as we need to:
1. Trim the leading and trailing whitespace, which takes O(n) time.
2. Split the string into an array of words, which also takes O(n) time.
3. Return the length of the last word, which takes constant O(1) time.

**Space Complexity**: O(n), where n is the length of the input string `s`. The space complexity is linear as we need to create an array of words, which can have a maximum size of n (if the string consists of only single-character words).

The key steps in this solution are:

1. Trim the leading and trailing whitespace from the input string `s` using the `trim()` method. This ensures that we start and end with non-whitespace characters.
2. Split the trimmed string into an array of words using the `split(" ")` method. This separates the string into an array of substrings, where each substring is a word.
3. Return the length of the last word in the array, which is accessed using `words[words.length - 1].length`.

This solution is efficient and straightforward, with a linear time and space complexity. It handles the edge cases mentioned in the problem statement, such as leading/trailing whitespace and strings with only one word.

If you have any further questions or need any clarification, please let me know.
*/
