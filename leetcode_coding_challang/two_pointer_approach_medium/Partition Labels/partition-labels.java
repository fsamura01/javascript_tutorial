import java.util.*;

class Solution {
    /**
     * Partition string so each letter appears in at most one part
     * @param s input string
     * @return list of partition sizes
     */
    public List<Integer> partitionLabels(String s) {
        // Phase 1: Record last occurrence of each character
        int[] lastOccurrence = new int[26]; // For 'a' to 'z'
        
        for (int i = 0; i < s.length(); i++) {
            lastOccurrence[s.charAt(i) - 'a'] = i;
        }
        
        // Phase 2: Build partitions greedily
        List<Integer> result = new ArrayList<>();
        int start = 0;      // Start of current partition
        int end = 0;        // Current partition must extend at least to 'end'
        
        for (int i = 0; i < s.length(); i++) {
            // Extend partition boundary if needed
            end = Math.max(end, lastOccurrence[s.charAt(i) - 'a']);
            
            // If we've reached the boundary, finalize this partition
            if (i == end) {
                result.add(i - start + 1);
                start = i + 1;  // Next partition starts here
            }
        }
        
        return result;
    }
}