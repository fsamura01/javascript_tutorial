/**
 * In-place word reversal (simulating in-place for JS)
 * @param {string} s - Input string
 * @return {string} String with words reversed
 */

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = s.trim().split(/\s+/);

  let left = 0;
  let right = words.length - 1;

  while (left < right) {
    [words[left], words[right]] = [words[right], words[left]];
    left++;
    right--;
  }

  return words.join(" ");
};

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
  const chars = s.trim().split("");
  const n = chars.length;

  // Reverse the entire array
  reverseSection(chars, 0, n - 1);

  // Reverse individual words
  let start = 0;
  for (let end = 0; end < n; end++) {
    if (chars[end] === " ") {
      reverseSection(chars, start, end - 1);
      start = end + 1;
    }
  }

  // Reverse the last word
  reverseSection(chars, start, n - 1);

  // Remove extra spaces
  return chars.join("").replace(/\s+/g, " ");
}

// Test cases
console.log(reverseWordsInPlace("the sky is blue")); // "blue is sky the"
console.log(reverseWordsInPlace("  hello world  ")); // "world hello"
console.log(reverseWordsInPlace("a good   example")); // "example good a"
