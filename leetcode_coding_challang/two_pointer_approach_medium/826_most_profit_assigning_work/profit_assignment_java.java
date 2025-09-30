import java.util.Arrays;

class Solution {
    public int maxProfitAssignment(int[] difficulty, int[] profit, int[] worker) {
        // Step 1: Create a 2D array to pair difficulties with profits
        // Each row represents one job: [difficulty, profit]
        int n = difficulty.length;
        int[][] jobs = new int[n][2];
        
        for (int i = 0; i < n; i++) {
            jobs[i][0] = difficulty[i];
            jobs[i][1] = profit[i];
        }
        
        // Step 2: Sort jobs by difficulty in ascending order
        // The lambda comparator compares the first element (difficulty) of each pair
        Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));
        
        // Step 3: Sort workers by their ability level in ascending order
        // This enables efficient two-pointer traversal
        Arrays.sort(worker);
        
        // Step 4: Process each worker and accumulate profits
        int maxProfit = 0;      // Tracks the best profit seen for jobs processed so far
        int totalProfit = 0;    // Accumulates the final answer
        int jobIndex = 0;       // Points to the current position in jobs array
        
        // Iterate through each worker in order of increasing ability
        for (int workerAbility : worker) {
            // Advance through jobs that this worker can complete
            // Since both arrays are sorted, we never need to go backwards
            while (jobIndex < n && jobs[jobIndex][0] <= workerAbility) {
                // Update the maximum profit achievable up to this difficulty level
                // This is our greedy strategy: always remember the best option
                maxProfit = Math.max(maxProfit, jobs[jobIndex][1]);
                jobIndex++;
            }
            
            // Assign the best profit this worker can earn
            // maxProfit represents the highest paying job at or below their ability
            totalProfit += maxProfit;
        }
        
        return totalProfit;
    }
    
    // Testing the solution
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Example 1
        int[] difficulty1 = {2, 4, 6, 8, 10};
        int[] profit1 = {10, 20, 30, 40, 50};
        int[] worker1 = {4, 5, 6, 7};
        System.out.println("Example 1: " + 
            solution.maxProfitAssignment(difficulty1, profit1, worker1)); 
        // Expected: 100
        
        // Example 2
        int[] difficulty2 = {85, 47, 57};
        int[] profit2 = {24, 66, 99};
        int[] worker2 = {40, 25, 25};
        System.out.println("Example 2: " + 
            solution.maxProfitAssignment(difficulty2, profit2, worker2)); 
        // Expected: 0
    }
}