import java.util.*;

public  class Solution {
    public String findLongestWord(String s, List<String> dictionary) {
        String result = "";
        
        for (String word : dictionary) {
            if (isSubsequence(word, s)) {
                // Update result if current word is better
                if (word.length() > result.length() || 
                    (word.length() == result.length() && word.compareTo(result) < 0)) {
                    result = word;
                }
            }
        }
        
        return result;
    }
    
    // Helper method to check if word is subsequence of s
    private boolean isSubsequence(String word, String s) {
        int i = 0; // pointer for word
        int j = 0; // pointer for s
        
        while (i < word.length() && j < s.length()) {
            if (word.charAt(i) == s.charAt(j)) {
                i++; // move word pointer when characters match
            }
            j++; // always move s pointer
        }
        
        // word is subsequence if we've matched all characters
        return i == word.length();
    }
    
    // Test method
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test case 1
        String s1 = "abpcplea";
        List<String> dict1 = Arrays.asList("ale", "apple", "monkey", "plea");
        String result1 = solution.findLongestWord(s1, dict1);
        System.out.println("Test 1: " + result1 + " (expected: apple)");
        
        // Test case 2  
        String s2 = "abpcplea";
        List<String> dict2 = Arrays.asList("a", "b", "c");
        String result2 = solution.findLongestWord(s2, dict2);
        System.out.println("Test 2: " + result2 + " (expected: a)");
        
        // Test case 3 - lexicographical tie
        String s3 = "abc";
        List<String> dict3 = Arrays.asList("cab", "abc", "bac");
        String result3 = solution.findLongestWord(s3, dict3);
        System.out.println("Test 3: " + result3 + " (expected: abc)");
        
        // Test case 4 - no valid subsequence
        String s4 = "abc";
        List<String> dict4 = Arrays.asList("def", "xyz");
        String result4 = solution.findLongestWord(s4, dict4);
        System.out.println("Test 4: " + result4 + " (expected: empty string)");
    }
}