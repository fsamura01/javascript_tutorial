/**
 * @param {string} s
 * @return {string}
 */
var makeSmallestPalindrome = function(s) {
    // Convert string to array since strings are immutable in JavaScript
    let chars = s.split('');
    
    // Initialize two pointers
    let left = 0;
    let right = s.length - 1;
    
    // Process the string while the pointers don't cross
    while (left < right) {
        // If characters at mirroring positions don't match
        if (chars[left] !== chars[right]) {
            // Choose the lexicographically smaller character
            // for both positions to ensure we get the smallest palindrome
            if (chars[left] < chars[right]) {
                chars[right] = chars[left];
            } else {
                chars[left] = chars[right];
            }
        }
        
        // Move pointers toward the center
        left++;
        right--;
    }
    
    // Convert array back to string and return
    return chars.join('');
};

// Example usage:
// Example 1
console.log(makeSmallestPalindrome("egcfe")); // Output: "efcfe"

// Example 2
console.log(makeSmallestPalindrome("abcd")); // Output: "abba"

// Example 3
console.log(makeSmallestPalindrome("seven")); // Output: "neven"
