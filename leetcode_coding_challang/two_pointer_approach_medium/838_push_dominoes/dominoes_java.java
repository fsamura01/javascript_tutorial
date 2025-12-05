class Solution {
    /**
     * Determines the final state of dominoes after all forces have propagated
     * @param dominoes Initial state of dominoes
     * @return Final state after all dominoes have settled
     */
    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        
        // Arrays to store the distance/time for forces to reach each position
        // Using a large value (n+1) instead of infinity for practical purposes
        int[] rightForces = new int[n];
        int[] leftForces = new int[n];
        
        // Initialize arrays with a value larger than any possible distance
        for (int i = 0; i < n; i++) {
            rightForces[i] = n + 1;
            leftForces[i] = n + 1;
        }
        
        // First pass: Calculate rightward forces (left to right)
        int rightDistance = n + 1; // Start with no active rightward force
        
        for (int i = 0; i < n; i++) {
            if (dominoes.charAt(i) == 'R') {
                // This position is a source of rightward force
                rightDistance = 0;
            } else if (dominoes.charAt(i) == 'L') {
                // Leftward domino blocks any rightward force
                rightDistance = n + 1;
            } else {
                // Empty position - propagate rightward force if it exists
                if (rightDistance != n + 1) {
                    rightDistance++;
                }
            }
            rightForces[i] = rightDistance;
        }
        
        // Second pass: Calculate leftward forces (right to left)
        int leftDistance = n + 1; // Start with no active leftward force
        
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes.charAt(i) == 'L') {
                // This position is a source of leftward force
                leftDistance = 0;
            } else if (dominoes.charAt(i) == 'R') {
                // Rightward domino blocks any leftward force
                leftDistance = n + 1;
            } else {
                // Empty position - propagate leftward force if it exists
                if (leftDistance != n + 1) {
                    leftDistance++;
                }
            }
            leftForces[i] = leftDistance;
        }
        
        // Build the result by comparing forces at each position
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < n; i++) {
            int rightForce = rightForces[i];
            int leftForce = leftForces[i];
            
            if (rightForce < leftForce) {
                // Rightward force dominates
                result.append('R');
            } else if (leftForce < rightForce) {
                // Leftward force dominates
                result.append('L');
            } else {
                // Forces are balanced or no forces present
                result.append('.');
            }
        }
        
        return result.toString();
    }
    
    // Test method
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.pushDominoes("RR.L"));        // Expected: "RR.L"
        System.out.println(solution.pushDominoes(".L.R...LR..L..")); // Expected: "LL.RR.LLRRLL.."
        System.out.println(solution.pushDominoes("..R.."));       // Expected: "..RRR"
        System.out.println(solution.pushDominoes("..L.."));       // Expected: "LLL.."
    }
}