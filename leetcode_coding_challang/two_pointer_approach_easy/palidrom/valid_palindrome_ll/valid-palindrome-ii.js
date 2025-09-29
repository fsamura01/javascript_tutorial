/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    // Helper function to check if a string is a palindrome
    const isPalindrome = (str, left, right) => {
        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    };
    
    // Two-pointer approach
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // If characters don't match
        if (s[left] !== s[right]) {
            // Try removing either the left or right character
            // and check if the remaining string is a palindrome
            return isPalindrome(s, left + 1, right) || 
                   isPalindrome(s, left, right - 1);
        }
        
        // Move pointers towards center
        left++;
        right--;
    }
    
    // If we've made it through the entire string, it's a palindrome
    return true;
};

// Time Complexity: O(n)
// Space Complexity: O(1)

// Test cases
console.log(validPalindrome("aba"));     // true
console.log(validPalindrome("abca"));    // true
console.log(validPalindrome("abc"));     // false
