import java.util.Arrays;

/**
 * LeetCode 567: Permutation in String - Java Solutions
 * Pattern: Fixed-Size Sliding Window
 */

public class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        
        // Frequency arrays for lowercase letters
        int[] s1Freq = new int[26];
        int[] windowFreq = new int[26];
        
        // Count frequencies in s1 and first window of s2
        for (int i = 0; i < s1.length(); i++) {
            s1Freq[s1.charAt(i) - 'a']++;
            windowFreq[s2.charAt(i) - 'a']++;
        }
        
        // Check first window
        if (Arrays.equals(s1Freq, windowFreq)) return true;
        
        // Slide window through s2
        for (int i = s1.length(); i < s2.length(); i++) {
            // Add new character (right)
            windowFreq[s2.charAt(i) - 'a']++;
            
            // Remove old character (left)
            windowFreq[s2.charAt(i - s1.length()) - 'a']--;
            
            if (Arrays.equals(s1Freq, windowFreq)) return true;
        }
        
        return false;
    }
    
    // Optimized version using matches counter
    public boolean checkInclusionOptimized(String s1, String s2) {
        if (s1.length() > s2.length())
            return false;

        int[] s1Freq = new int[26];
        int[] windowFreq = new int[26];

        // Count s1 frequencies
        for (char c : s1.toCharArray()) {
            s1Freq[c - 'a']++;
        }

        int matches = 0;

        for (int i = 0; i < s2.length(); i++) {
            int rightIndex = s2.charAt(i) - 'a';
            windowFreq[rightIndex]++;

            if (windowFreq[rightIndex] == s1Freq[rightIndex]) {
                matches++;
            } else if (windowFreq[rightIndex] == s1Freq[rightIndex] + 1) {
                matches--;
            }

            // Shrink window if needed
            if (i >= s1.length()) {
                int leftIndex = s2.charAt(i - s1.length()) - 'a';

                if (windowFreq[leftIndex] == s1Freq[leftIndex]) {
                    matches--;
                } else if (windowFreq[leftIndex] == s1Freq[leftIndex] + 1) {
                    matches++;
                }

                windowFreq[leftIndex]--;
            }

            if (matches == 26)
                return true;
        }

        return false;
    }
    
    // Test class
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.checkInclusion("ab", "eidbaooo")); // true
        System.out.println(solution.checkInclusion("ab", "eidboaoo")); // false
    }
}

    