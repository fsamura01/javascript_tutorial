/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // Handle edge cases
  if (s.length < 1) return "";
  if (s.length === 1) return s;

  // Variables to track the longest palindrome
  let maxLength = 1; // A single character is a palindrome of length 1
  let start = 0; // Starting index of the longest palindrome

  // Helper function to expand around a center
  function expandAroundCenter(str, left, right) {
    // Expand outward as long as characters match
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }

    // When the loop ends, left and right have "overshot" by 1 position
    // Return the length of the palindrome found
    return right - left - 1;
  }

  // Check each position as a potential center
  for (let i = 0; i < s.length; i++) {
    // Check odd-length palindromes (single character center)
    let len1 = expandAroundCenter(s, i, i);

    // Check even-length palindromes (between characters)
    let len2 = expandAroundCenter(s, i, i + 1);

    // Get the longer palindrome from these two checks
    const currentLength = Math.max(len1, len2);

    // If we found a longer palindrome, update our tracking variables
    if (currentLength > maxLength) {
      maxLength = currentLength;

      // Calculate the starting index of the palindrome
      // For odd-length: center - floor((length-1)/2)
      // For even-length: center - floor((length-2)/2)
      // This formula handles both cases
      start = i - Math.floor((currentLength - 1) / 2);
    }
  }

  // Return the longest palindromic substring
  return s.substring(start, start + maxLength);
};

longestPalindrome("babad");
longestPalindrome("cbbd");
