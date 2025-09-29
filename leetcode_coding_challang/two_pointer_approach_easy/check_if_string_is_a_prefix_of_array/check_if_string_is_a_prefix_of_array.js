/**
 * @param {string} s - Target string to match
 * @param {string[]} words - Array of words to concatenate
 * @return {boolean}
 */

/* Two pionter approach */
function isPrefixString(s, words) {
  // Initialize our pointer for the target string
  let targetIndex = 0;

  // Iterate through each word in the array
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const currentWord = words[wordIndex];

    // For each character in the current word
    for (let charIndex = 0; charIndex < currentWord.length; charIndex++) {
      // If we've exceeded the target string length or characters don't match
      if (
        targetIndex >= s.length ||
        s[targetIndex] !== currentWord[charIndex]
      ) {
        return false;
      }
      // Move the target pointer forward
      targetIndex++;
    }

    // If we've matched the entire target string
    if (targetIndex === s.length) {
      return true;
    }
  }

  // Return false if we've used all words but haven't matched the entire target
  return targetIndex === s.length;
}
function isPrefixString(s, words) {
  // Initialize our constructed string
  let prefix = "";

  // Iterate through the words array
  for (let i = 0; i < words.length; i++) {
    // Add current word to our prefix
    prefix += words[i];

    // If prefix matches our target string, we found a solution
    if (prefix === s) {
      return true;
    }

    // If prefix length exceeds target or doesn't match so far,
    // we can't possibly form the target string
    if (prefix.length > s.length || prefix !== s.slice(0, prefix.length)) {
      return false;
    }
  }

  // If we've used all words but haven't matched exactly, return false
  return false;
}

isPrefixString("iloveleetcode", ["i", "love", "leetcodeo", "apples"]);
isPrefixString("iloveleetcode", ["apples", "i", "love", "leetcode"]);

/* Alternative Solutionsearly termination conditions:*/
function isPrefixString(s, words) {
  // Early termination: if first word doesn't match start of s
  if (!s.startsWith(words[0])) return false;

  let currentLength = 0;

  for (let word of words) {
    // If we've exceeded target length, no need to continue
    if (currentLength + word.length > s.length) return false;

    // Check if current section matches
    if (s.slice(currentLength, currentLength + word.length) !== word) {
      return false;
    }

    currentLength += word.length;
    if (currentLength === s.length) return true;
  }

  return currentLength === s.length;
}
