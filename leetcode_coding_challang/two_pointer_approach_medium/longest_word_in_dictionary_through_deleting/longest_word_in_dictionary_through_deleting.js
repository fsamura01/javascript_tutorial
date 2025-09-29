/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
var findLongestWord = function (s, dictionary) {
  // Helper function to check if word is subsequence of s
  function isSubsequence(word, s) {
    let i = 0; // pointer for word
    let j = 0; // pointer for s

    while (i < word.length && j < s.length) {
      if (word[i] === s[j]) {
        i++; // move word pointer when characters match
      }
      j++; // always move s pointer
    }

    // word is subsequence if we've matched all characters
    return i === word.length;
  }

  let result = "";

  for (let word of dictionary) {
    if (isSubsequence(word, s)) {
      // Update result if current word is better
      if (
        word.length > result.length ||
        (word.length === result.length && word < result)
      ) {
        result = word;
      }
    }
  }

  return result;
};

// Test cases
console.log(findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"])); // "apple"
console.log(findLongestWord("abpcplea", ["a", "b", "c"])); // "a"
