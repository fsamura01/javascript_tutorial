function reverseVowels(s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const sArr = s.split(""); // Convert string to array
  let left = 0;
  let right = sArr.length - 1;

  while (left < right) {
    // Check if both characters are vowels
    if (vowels.has(sArr[left]) && vowels.has(sArr[right])) {
      // Swap the vowels
      [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
      left++;
      right--;
    } else if (!vowels.has(sArr[left])) {
      left++; // Move left pointer if not a vowel
    } else if (!vowels.has(sArr[right])) {
      right--; // Move right pointer if not a vowel
    }
  }

  return sArr.join(""); // Convert array back to string
}

reverseVowels("IceCreAm");
reverseVowels("leetcode");

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  // Helper function to check if a character is a vowel
  const isVowel = (char) => {
    // Convert to lowercase for case-insensitive comparison
    char = char.toLowerCase();
    return (
      char === "a" ||
      char === "e" ||
      char === "i" ||
      char === "o" ||
      char === "u"
    );
  };

  // Convert string to array for easier manipulation
  const chars = s.split("");

  // Initialize two pointers
  let left = 0;
  let right = s.length - 1;

  // Traverse the string from both ends
  while (left < right) {
    // Find the leftmost vowel
    while (left < right && !isVowel(chars[left])) {
      left++;
    }

    // Find the rightmost vowel
    while (left < right && !isVowel(chars[right])) {
      right--;
    }

    // Swap the vowels
    if (left < right) {
      // Swap
      const temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;

      // Move pointers
      left++;
      right--;
    }
  }

  // Convert array back to string
  return chars.join("");
};
