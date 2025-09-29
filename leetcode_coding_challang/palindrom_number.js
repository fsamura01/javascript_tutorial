/* https://chatgpt.com/c/6739ffb7-4ce4-8002-b4f9-29616ce6b179
   Solution 1 - Using String Conversion:
 */
/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  // Step 1: If number is negative, it can't be a palindrome
  if (x < 0) return false;

  // Step 2: Convert number to string
  const str = x.toString();

  // Step 3: Use two pointers to check palindrome
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Solution 2 - Using Math operations: Without String Conversion:
/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  // Step 1: Handle negative numbers and numbers ending with 0
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false;
  }

  // Step 2: Reverse half of the number
  let reversedHalf = 0;

  // Keep going until reversedHalf becomes greater than or equal to remaining x
  while (x > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // Step 3: Compare original number with reversed half
  // For even length numbers: x === reversedHalf
  // For odd length numbers: x === Math.floor(reversedHalf / 10)
  return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}

console.log(isPalindrome(121)); // true
console.log(isPalindrome(1221)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false
console.log(isPalindrome(12321)); // true
console.log(isPalindrome(12345)); // false
