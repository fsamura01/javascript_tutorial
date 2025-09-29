// LeetCode 522: Longest Uncommon Subsequence II
// Time: O(n^2 * m), Space: O(1)
import java.util.*;

class Solution {
    // Helper method to check if s1 is a subsequence of s2
    private boolean isSubsequence(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        
        int i = 0; // pointer for s1
        int j = 0; // pointer for s2
        
        while (i < s1.length() && j < s2.length()) {
            if (s1.charAt(i) == s2.charAt(j)) {
                i++;
            }
            j++;
        }
        
        return i == s1.length();
    }
    
    public int findLUSlength(String[] strs) {
        
        
        // Sort strings by length in descending order
        Arrays.sort(strs, (a, b) -> b.length() - a.length());
        
        // Check each string as a potential uncommon subsequence
        for (int i = 0; i < strs.length; i++) {
            boolean isUncommon = true;
            
            // Check if current string is a subsequence of any other string
            for (int j = 0; j < strs.length; j++) {
                if (i != j && isSubsequence(strs[i], strs[j])) {
                    isUncommon = false;
                    break;
                }
            }
            
            // If it's not a subsequence of any other string, it's uncommon
            if (isUncommon) {
                return strs[i].length();
            }
        }
        
        return -1; // No uncommon subsequence found
    }
    
    // Test method
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.findLUSlength(new String[]{"aba","cdc","eae"})); // Output: 3
        System.out.println(sol.findLUSlength(new String[]{"aaa","aaa","aa"}));  // Output: -1
        System.out.println(sol.findLUSlength(new String[]{"abc","def"}));       // Output: 3
    }
}