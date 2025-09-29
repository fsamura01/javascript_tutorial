// LeetCode 647: Palindromic Substrings
// Approach: Expand Around Centers

public class PalindromicSubstrings {
    
    public int countSubstrings(String s) {
        if (s == null || s.length() == 0) return 0;
        
        int count = 0;
        
        // Check all possible centers
        for (int i = 0; i < s.length(); i++) {
            // Odd-length palindromes (center at i)
            count += expandAroundCenter(s, i, i);
            
            // Even-length palindromes (center between i and i+1)
            count += expandAroundCenter(s, i, i + 1);
        }
        
        return count;
    }
    
    /**
     * Helper method to expand around center and count palindromes
     * @param s The input string
     * @param left Starting left pointer
     * @param right Starting right pointer
     * @return Number of palindromes found expanding from this center
     */
    private int expandAroundCenter(String s, int left, int right) {
        int count = 0;
        
        // Expand while characters match and indices are valid
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++;   // Found a palindrome
            left--;    // Expand left
            right++;   // Expand right
        }
        
        return count;
    }
    
    // Test method
    public static void main(String[] args) {
        PalindromicSubstrings solution = new PalindromicSubstrings();
        
        System.out.println(solution.countSubstrings("abc")); // Output: 3
        System.out.println(solution.countSubstrings("aaa")); // Output: 6
        
        // Trace for "aaa":
        // i=0: expandAroundCenter(0,0) finds "a" = 1
        //      expandAroundCenter(0,1) finds "aa" = 1
        // i=1: expandAroundCenter(1,1) finds "a", then "aaa" = 2  
        //      expandAroundCenter(1,2) finds "aa" = 1
        // i=2: expandAroundCenter(2,2) finds "a" = 1
        //      expandAroundCenter(2,3) finds nothing = 0
        // Total: 1+1+2+1+1+0 = 6
    }
}