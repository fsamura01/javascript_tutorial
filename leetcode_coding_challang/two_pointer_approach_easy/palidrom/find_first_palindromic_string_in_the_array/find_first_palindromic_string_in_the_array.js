/* Approach 1: Using Two-Pointer Technique */

/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  function isPalindrome(word) {
    let left = 0,
      right = word.length - 1;
    while (left < right) {
      if (word[left] !== word[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  for (let word of words) {
    if (isPalindrome(word)) return word;
  }
  return "";
};

/* Approach 2: Using Built-in String Reversal */
/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  for (let word of words) {
    if (word === word.split("").reverse().join("")) {
      return word; // Return first palindrome found
    }
  }
  return ""; // No palindrome found
};

/* Using Regular Expressions (Not Recommended) */
var firstPalindrome = function (words) {
  for (let word of words) {
    if (word === [...word].reverse().join("")) return word;
  }
  return "";
};

/**
 * @param {string[]} words
 * @return {string}
 */
function firstPalindrome(words) {
  // Helper function to check if a string is palindrome
  const isPalindrome = (str) => {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      // If characters don't match, not a palindrome
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };

  // Iterate through each word in the array
  for (const word of words) {
    // Return the first palindrome found
    if (isPalindrome(word)) {
      return word;
    }
  }

  // No palindrome found
  return "";
}

function firstPalindrome(words) {
  // Using array methods and string reversal
  return words.find((word) => word === word.split("").reverse().join("")) || "";
}
