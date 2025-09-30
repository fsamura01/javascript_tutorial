/**
 * LeetCode 825: Friends Of Appropriate Ages
 * 
 * Core Insight: Use counting + prefix sums since ages are bounded [1, 120]
 * For age A, valid targets are in range (0.5*A + 7, A]
 */
class Solution {
    public int numFriendRequests(int[] ages) {
        // Step 1: Count frequency of each age (ages range from 1 to 120)
        int[] count = new int[121];
        for (int age : ages) {
            count[age]++;
        }
        
        // Step 2: Build prefix sum array
        // prefix[i] = total number of people with age <= i
        int[] prefix = new int[121];
        for (int i = 1; i <= 120; i++) {
            prefix[i] = prefix[i - 1] + count[i];
        }
        
        int totalRequests = 0;
        
        // Step 3: For each possible sender age, count valid requests
        // Start from 15 because ages <= 14 can never send requests
        // (the valid range becomes empty: 0.5*14 + 7 = 14, so no y where 14 < y <= 14)
        for (int age = 15; age <= 120; age++) {
            // Skip if no one has this age
            if (count[age] == 0) continue;
            
            // Calculate the lower bound (exclusive) for valid recipients
            // Recipients must satisfy: age[y] > 0.5 * age[x] + 7
            int low = (int)(0.5 * age + 7);
            
            // Ensure valid range exists
            if (low >= age) continue;
            
            // Count people in range (low, age] using prefix sums
            // This equals prefix[age] - prefix[low]
            int validRecipients = prefix[age] - prefix[low];
            
            // Each person of this age sends to all valid recipients
            // Subtract 1 because they can't friend request themselves
            // (they're included in validRecipients since their own age is in range)
            totalRequests += count[age] * (validRecipients - 1);
        }
        
        return totalRequests;
    }
    
    // Test the solution
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.numFriendRequests(new int[]{16, 16}));           // Expected: 2
        System.out.println(sol.numFriendRequests(new int[]{16, 17, 18}));       // Expected: 2
        System.out.println(sol.numFriendRequests(new int[]{20, 30, 100, 110, 120})); // Expected: 3
    }
}
