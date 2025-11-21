class Solution {
    /**
     * Determines if start string can be transformed to result string
     * using allowed swap operations: XL->LX and RX->XR
     * 
     * @param start The starting string
     * @param result The target result string
     * @return true if transformation is possible, false otherwise
     */
    public boolean canTransform(String start, String result) {
        int n = start.length();
        
        // Two pointers: i for start, j for result
        int i = 0, j = 0;
        
        while (i < n || j < n) {
            // Skip all 'X' characters in start string
            while (i < n && start.charAt(i) == 'X') {
                i++;
            }
            
            // Skip all 'X' characters in result string
            while (j < n && result.charAt(j) == 'X') {
                j++;
            }
            
            // Both pointers reached the end - valid transformation
            if (i == n && j == n) {
                return true;
            }
            
            // Only one pointer reached the end - invalid
            if (i == n || j == n) {
                return false;
            }
            
            // The non-X characters must match at corresponding positions
            if (start.charAt(i) != result.charAt(j)) {
                return false;
            }
            
            // Movement constraint for 'L':
            // Can only move left, so position in result must be <= position in start
            if (start.charAt(i) == 'L' && i < j) {
                return false;
            }
            
            // Movement constraint for 'R':
            // Can only move right, so position in result must be >= position in start
            if (start.charAt(i) == 'R' && i > j) {
                return false;
            }
            
            // Move both pointers to next positions
            i++;
            j++;
        }
        
        return true;
    }
    
    // Test the solution
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.canTransform("RXXLRXRXL", "XRLXXRRLX")); // true
        System.out.println(solution.canTransform("X", "L")); // false
        System.out.println(solution.canTransform("XXXXXLXXXX", "LXXXXXXXXX")); // true
    }
}

