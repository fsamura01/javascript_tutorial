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

/* Regular Expression Solution: */
function isPrefixOfWord(sentence, searchWord) {
  const regex = new RegExp(`\\b${searchWord}`, "i");
  const match = regex.exec(sentence);
  if (!match) return -1;
  return sentence.slice(0, match.index).split(" ").length;
}

/* Direct String Traversal (without split): */
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

/* Two-Pointer Solution for LeetCode 1455 */
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
