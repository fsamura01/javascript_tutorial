/**
 * @param {string} s
 * @return {number}
 */
const removePalindromeSub = function(s) {
    // Base case: if string is empty, return 0
    if (s.length === 0) return 0;
    
    // Helper function to check if string is palindrome
    const isPalindrome = (str) => {
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
    };
    
    // If string is already palindrome, we need only 1 step
    if (isPalindrome(s)) return 1;
    
    // Otherwise, we need 2 steps:
    // Step 1: Remove all 'a's (which form a palindromic subsequence)
    // Step 2: Remove all 'b's (which form a palindromic subsequence)
    return 2;
};
