function isPalindrome(s, left, right) {
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

function validPalindrome(s) {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      // Check if removing either left or right character makes it a palindrome
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }

  return true; // Already a palindrome
}

console.log(validPalindrome("aba")); // true
console.log(validPalindrome("abca")); // true (remove 'c')
console.log(validPalindrome("abc")); // false
console.log(validPalindrome("deeee")); // true (remove 'd' or last 'e')
console.log(validPalindrome("racecar")); // true (already a palindrome)
