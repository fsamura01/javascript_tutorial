/* # Valid Palindrome - Two-Pointer Solution with Detailed Explanation 
  Let's break this down into a clear, step-by-step solution using the two-pointer technique.
*/
function isPalindrome(s) {
  // 1. Clean the string: convert to lowercase and remove non-alphanumeric characters
  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // 2. Set up two pointers
  let left = 0;
  let right = s.length - 1;

  // 3. Compare characters from both ends moving inward
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Example usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true

/* 
## Step-by-Step Explanation

### 1. String Cleaning
```javascript
s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
```
- Convert to lowercase using `toLowerCase()`
- Remove non-alphanumeric characters using regex
- `[^a-z0-9]` matches any character that is not a lowercase letter or number
- `g` flag makes it replace all occurrences

### 2. Two-Pointer Setup
```javascript
let left = 0;
let right = s.length - 1;
```
- `left` pointer starts from beginning
- `right` pointer starts from end

### 3. Palindrome Check
```javascript
while (left < right) {
    if (s[left] !== s[right]) {
        return false;
    }
    left++;
    right--;
}
```
- Compare characters from both ends
- Return false if mismatch found
- Move pointers inward
- Continue until pointers meet

## Complexity Analysis

### Time Complexity: O(n)
- String cleaning: O(n)
- Palindrome check: O(n/2)
- Overall: O(n)

### Space Complexity: O(n)
- New string created after cleaning
- If strict space requirement, can modify to check original string */

/* ## Alternative Solution (More Space Efficient) */
function isPalindromeOptimized(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare characters
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}

/* 
### Benefits of Optimized Version
- O(1) space complexity
- No string modification
- Handles input string directly

## Edge Cases Handled
- Empty strings
- Spaces only
- Mixed case
- Special characters
- Single character
- Even/odd length strings

## Common Pitfalls to Avoid
1. Forgetting to handle case sensitivity
2. Not properly handling non-alphanumeric characters
3. Incorrect pointer movement
4. Not handling empty strings */

// Testing Scenarios

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
console.log(isPalindrome(".,}")); // true
console.log(isPalindrome("0P")); // false

/* 
   This solution effectively combines string manipulation with 
   the two-pointer technique to create an efficient palindrome checker. 
   The optimized version trades some readability for better space efficiency, 
   while both versions maintain good time complexity.
 */
