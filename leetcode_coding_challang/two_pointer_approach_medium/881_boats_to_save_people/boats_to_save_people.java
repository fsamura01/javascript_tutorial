import java.util.Arrays;

class Solution {
    /**
     * Determines minimum boats needed to rescue all people
     * 
     * @param people Array of people's weights
     * @param limit Maximum weight capacity per boat
     * @return Minimum number of boats required
     */
    public int numRescueBoats(int[] people, int limit) {
        // Step 1: Sort the array to enable two-pointer approach
        // Time complexity: O(n log n) where n is number of people
        Arrays.sort(people);
        
        // Step 2: Initialize pointers at array boundaries
        int left = 0;                    // Lightest person index
        int right = people.length - 1;   // Heaviest person index
        int boats = 0;                   // Boat counter
        
        // Step 3: Greedily pair people from extremes
        // Continue until all people are assigned
        while (left <= right) {
            // Check if lightest and heaviest can share a boat
            if (people[left] + people[right] <= limit) {
                // They can share - move left pointer forward
                // This person is now assigned to a boat
                left++;
            }
            
            // The heaviest person always gets assigned in this iteration
            // Either paired with lightest (if condition true) or alone
            right--;
            boats++;
        }
        
        return boats;
    }
}