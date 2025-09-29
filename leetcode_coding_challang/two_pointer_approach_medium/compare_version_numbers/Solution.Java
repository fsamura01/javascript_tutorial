/**
 * Compare Version Numbers - LeetCode 165
 * Java implementation demonstrating the same two-pointer approach
 */
public class Solution {
    
    public int compareVersion(String version1, String version2) {
        // Split both versions by dots to get revision arrays
        String[] revisions1 = version1.split("\\.");  // Need to escape dot for regex
        String[] revisions2 = version2.split("\\.");
        
        // Find the maximum length to ensure complete comparison
        int maxLength = Math.max(revisions1.length, revisions2.length);
        
        // Compare each revision position
        for (int i = 0; i < maxLength; i++) {
            // Extract revision or use 0 for shorter version
            // Integer.parseInt handles leading zeros automatically
            int rev1 = i < revisions1.length ? Integer.parseInt(revisions1[i]) : 0;
            int rev2 = i < revisions2.length ? Integer.parseInt(revisions2[i]) : 0;
            
            // Perform comparison
            if (rev1 < rev2) {
                return -1;
            } else if (rev1 > rev2) {
                return 1;
            }
            // Continue to next revision if equal
        }
        
        // All revisions matched
        return 0;
    }
    
    // Alternative: More explicit two-pointer approach
    public int compareVersionExplicit(String version1, String version2) {
        String[] revisions1 = version1.split("\\.");
        String[] revisions2 = version2.split("\\.");
        
        int pointer1 = 0, pointer2 = 0;
        
        // Continue while either pointer hasn't reached the end
        while (pointer1 < revisions1.length || pointer2 < revisions2.length) {
            int rev1 = pointer1 < revisions1.length ? 
                      Integer.parseInt(revisions1[pointer1]) : 0;
            int rev2 = pointer2 < revisions2.length ? 
                      Integer.parseInt(revisions2[pointer2]) : 0;
            
            // Use Integer.compare for cleaner comparison
            int comparison = Integer.compare(rev1, rev2);
            if (comparison != 0) {
                return comparison;
            }
            
            // Advance both pointers
            pointer1++;
            pointer2++;
        }
        
        return 0;
    }
    
    // Test method to verify our solution
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.compareVersion("1.2", "1.10"));      // -1
        System.out.println(solution.compareVersion("1.01", "1.001"));    // 0
        System.out.println(solution.compareVersion("1.0", "1.0.0.0"));   // 0
        System.out.println(solution.compareVersion("1.0.1", "1"));       // 1
    }
}