/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
/* Two Pointer Approach */
function reversePrefix(word, ch) {
  // Convert string to array for easier manipulation
  const arr = word.split("");
  const pos = word.indexOf(ch);

  if (pos === -1) return word;

  // Use two pointers to reverse the prefix
  let left = 0;
  let right = pos;
  while (left < right) {
    // Swap characters
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join("");
}

function reversePrefix(word, ch) {
  // Find the first occurrence of ch
  const pos = word.indexOf(ch);

  // If ch is not found, return original word
  if (pos === -1) return word;

  // Extract prefix that needs to be reversed
  const prefix = word.substring(0, pos + 1);

  // Get the remaining part of the word
  const suffix = word.substring(pos + 1);

  // Reverse the prefix using array methods
  const reversedPrefix = prefix.split("").reverse().join("");

  // Combine reversed prefix with suffix
  return reversedPrefix + suffix;
}
