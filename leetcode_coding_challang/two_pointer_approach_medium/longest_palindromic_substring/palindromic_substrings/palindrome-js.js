// LeetCode 647: Palindromic Substrings
// Approach: Expand Around Centers

function countSubstrings(s) {
    if (!s || s.length === 0) return 0;
    
    let count = 0;
    
    // Helper function to expand around center and count palindromes
    function expandAroundCenter(left, right) {
        let localCount = 0;
        
        // Expand while characters match and indices are valid
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            localCount++; // Found a palindrome
            left--;       // Expand left
            right++;      // Expand right
        }
        
        return localCount;
    }
    
    // Check all possible centers
    for (let i = 0; i < s.length; i++) {
        // Odd-length palindromes (center at i)
        count += expandAroundCenter(i, i);
        
        // Even-length palindromes (center between i and i+1)
        count += expandAroundCenter(i, i + 1);
    }
    
    return count;
}

// Test cases
console.log(countSubstrings("abc"));  // Output: 3
console.log(countSubstrings("aaa"));  // Output: 6

// Step-by-step example for "aaa":
// i=0: center at 0: "a" (1), center at 0,1: "aa" (1) 
// i=1: center at 1: "a", "aaa" (2), center at 1,2: "aa" (1)
// i=2: center at 2: "a" (1), center at 2,3: none (0)
// Total: 1+1+2+1+1+0 = 6