/**
 * Approach 1: Split and Check
 * Time Complexity: O(n) where n is the length of the sentence
 * Space Complexity: O(n) to store the words array
 *
 * @param {string} sentence
 * @return {boolean}
 */
function isCircularSentence(sentence) {
  // Split the sentence into words
  const words = sentence.split(" ");

  // If there's only one word, check if first and last characters match
  if (words.length === 1) {
    return words[0][0] === words[0][words[0].length - 1];
  }

  // Check each adjacent pair of words
  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    // Get the next word (or first word if we're at the end)
    const nextWord = words[(i + 1) % words.length];

    // Compare last character of current word with first character of next word
    if (currentWord[currentWord.length - 1] !== nextWord[0]) {
      return false;
    }
  }

  return true;
}

/**
 * Approach 2: Without Split (More Space Efficient)
 * Time Complexity: O(n) where n is the length of the sentence
 * Space Complexity: O(1) as we only store a few pointers
 *
 * @param {string} sentence
 * @return {boolean}
 */
function isCircularOptimized(sentence) {
  const n = sentence.length;

  // Handle single word case
  if (!sentence.includes(" ")) {
    return sentence[0] === sentence[n - 1];
  }

  // Check first character of sentence with last character before space
  let lastSpaceIndex = -1;
  for (let i = n - 1; i >= 0; i--) {
    if (sentence[i] === " ") {
      lastSpaceIndex = i;
      break;
    }
  }

  if (sentence[lastSpaceIndex + 1] !== sentence[n - 1]) {
    return false;
  }

  // Check each word boundary
  for (let i = 0; i < n - 1; i++) {
    if (sentence[i] === " ") {
      // Compare character before space with character after space
      if (sentence[i - 1] !== sentence[i + 1]) {
        return false;
      }
    }
  }

  // Check last word's last character with first word's first character
  return sentence[n - 1] === sentence[0];
}

// Test cases
const testCases = [
  "leetcode exercises sound delightful",
  "eetcode",
  "Leetcode is cool",
  "happy Leetcode",
  "a b c d",
];

// Run tests
console.log("Approach 1 Results:");
testCases.forEach((test) => {
  console.log(`Input: "${test}"`);
  console.log(`Output: ${isCircular(test)}\n`);
});

console.log("Approach 2 Results:");
testCases.forEach((test) => {
  console.log(`Input: "${test}"`);
  console.log(`Output: ${isCircularOptimized(test)}\n`);
});
