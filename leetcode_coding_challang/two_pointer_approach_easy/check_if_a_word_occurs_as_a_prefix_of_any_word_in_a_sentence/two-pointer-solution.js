/**
 * Two-pointer solution for finding if a word occurs as a prefix
 * @param {string} sentence - The input sentence to search through
 * @param {string} searchWord - The prefix we're looking for
 * @return {number} - The 1-based index of the word with the prefix, or -1 if not found
 */
function isPrefixOfWord(sentence, searchWord) {
  // Initialize our tracking variables
  let wordCount = 1; // Keep track of which word we're on (1-based)
  let wordStart = 0; // Points to the start of the current word
  let i = 0; // Points to the current character we're examining

  // Continue until we reach the end of the sentence
  while (i <= sentence.length) {
    // Check if we've reached a word boundary (space or end of sentence)
    if (i === sentence.length || sentence[i] === " ") {
      // We've found the end of a word, so check if it matches our prefix
      if (isPrefix(sentence, wordStart, searchWord)) {
        return wordCount;
      }

      // Move to the next word
      wordCount++;
      wordStart = i + 1; // Start of next word is after the space
    }
    i++;
  }

  return -1; // No matching prefix found
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
    if (wordStart + i >= sentence.length || sentence[wordStart + i] === " ") {
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
    expected: 4,
  },
  {
    sentence: "this problem is an easy problem",
    searchWord: "pro",
    expected: 2,
  },
  {
    sentence: "i am tired",
    searchWord: "you",
    expected: -1,
  },
];

// Run test cases
testCases.forEach((test, index) => {
  const result = isPrefixOfWord(test.sentence, test.searchWord);
  console.log(`Test ${index + 1}:`);
  console.log(`Sentence: "${test.sentence}"`);
  console.log(`Search Word: "${test.searchWord}"`);
  console.log(`Expected: ${test.expected}, Got: ${result}`);
  console.log(`Result: ${result === test.expected ? "PASS" : "FAIL"}\n`);
});

/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
var isPrefixOfWord = function (sentence, searchWord) {
  let wordCount = 1;
  let left = 0;

  for (let right = 0; right <= sentence.length; right++) {
    if (right === sentence.length || sentence[right] === " ") {
      if (isPrefix(sentence, left, searchWord)) {
        return wordCount;
      }

      wordCount++;
      left = right + 1;
    }
  }

  return -1;
};

function isPrefix(sentence, left, searchWord) {
  for (let i = 0; i < searchWord.length; i++) {
    if (left + i >= sentence.length || sentence[left + i] === " ") {
      return false;
    }

    if (sentence[left + i] !== searchWord[i]) {
      return false;
    }
  }

  return true;
}
