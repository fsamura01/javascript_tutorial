class Solution {
    /**
     * Main method that counts how many words can be stretched to match s
     * @param s The target stretchy string
     * @param words Array of query words to check
     * @return Count of stretchy words
     */
    public int expressiveWords(String s, String[] words) {
        int count = 0;
        
        // Check each word individually to see if it's stretchy
        for (String word : words) {
            if (isStretchy(s, word)) {
                count++;
            }
        }
        
        return count;
    }
    
    /**
     * Helper method to determine if a word can be stretched to match target
     * Uses two-pointer technique to compare character groups
     * @param target The string we want to match
     * @param word The word we're checking for stretchiness
     * @return true if word is stretchy, false otherwise
     */
    private boolean isStretchy(String target, String word) {
        // Initialize pointers for both strings
        int i = 0; // pointer for target string
        int j = 0; // pointer for word string
        
        // Process both strings character group by character group
        while (i < target.length() && j < word.length()) {
            // First, verify that the characters at both pointers match
            // If they don't match, this word cannot be stretchy
            if (target.charAt(i) != word.charAt(j)) {
                return false;
            }
            
            // Count the size of the character group in target string
            // This tells us how many consecutive identical characters we have
            int targetGroupLength = getGroupLength(target, i);
            
            // Count the size of the character group in word string
            int wordGroupLength = getGroupLength(word, j);
            
            // Now apply the stretching rules to validate this pair of groups
            // Rule 1: If target group is smaller than word group, impossible to stretch
            // We can only add characters, never remove them
            if (targetGroupLength < wordGroupLength) {
                return false;
            }
            
            // Rule 2: If target group is larger but less than 3, also impossible
            // We cannot extend a group to size 2 (minimum extension is to size 3)
            // Exception: if both groups are the same size, no stretching is needed
            if (targetGroupLength > wordGroupLength && targetGroupLength < 3) {
                return false;
            }
            
            // If we've passed both validation checks, this group pair is valid
            // Move both pointers past the current groups to check the next groups
            i += targetGroupLength;
            j += wordGroupLength;
        }
        
        // For the word to be stretchy, both pointers must reach the end simultaneously
        // If one string has remaining characters, the structures don't match
        return i == target.length() && j == word.length();
    }
    
    /**
     * Helper method to count consecutive identical characters
     * Returns the length of the character group starting at position start
     * @param str The string to analyze
     * @param start The starting position
     * @return The count of consecutive identical characters
     */
    private int getGroupLength(String str, int start) {
        int end = start;
        // Keep advancing while we see the same character
        while (end < str.length() && str.charAt(end) == str.charAt(start)) {
            end++;
        }
        // Return the count of identical characters
        return end - start;
    }
}

// Example usage for testing
class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test case 1
        String s1 = "heeellooo";
        String[] words1 = {"hello", "hi", "helo"};
        System.out.println(solution.expressiveWords(s1, words1)); // Output: 1
        
        // Test case 2
        String s2 = "zzzzzyyyyy";
        String[] words2 = {"zzyy", "zy", "zyy"};
        System.out.println(solution.expressiveWords(s2, words2)); // Output: 3
    }
}