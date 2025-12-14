import java.util.*;

/**
 * Advantage Shuffle - Java Implementation
 * Pattern: Greedy Algorithm with Optimal Assignment
 * 
 * This solution demonstrates the "advantage" strategy from game theory:
 * - When you can win, use your weakest winning card
 * - When you can't win, sacrifice your weakest card
 */
public class AdvantageShuffle {
    
    public int[] advantageCount(int[] nums1, int[] nums2) {
        int n = nums1.length;
        
        // Step 1: Sort nums1 to enable efficient value selection
        // Once sorted, we can use two pointers to pick from either end
        Arrays.sort(nums1);
        
        // Step 2: Create array of pairs (value, index) for nums2
        // We need to preserve original indices while sorting by value
        int[][] nums2Indexed = new int[n][2];
        for (int i = 0; i < n; i++) {
            nums2Indexed[i][0] = nums2[i];  // value
            nums2Indexed[i][1] = i;         // original index
        }
        
        // Step 3: Sort nums2 pairs by value in descending order
        // Processing larger values first ensures we make optimal decisions
        // Arrays.sort with custom comparator for descending order
        Arrays.sort(nums2Indexed, (a, b) -> b[0] - a[0]);
        
        // Step 4: Initialize result array and pointers
        int[] result = new int[n];
        int left = 0;      // Pointer to smallest remaining value
        int right = n - 1; // Pointer to largest remaining value
        
        // Step 5: Greedy assignment for each target value
        for (int[] pair : nums2Indexed) {
            int targetValue = pair[0];
            int originalIndex = pair[1];
            
            // Decision point: Can our best card beat the target?
            if (nums1[right] > targetValue) {
                // Victory is possible! Use the strongest available card
                // (When processing in descending order, we need strong cards)
                result[originalIndex] = nums1[right];
                right--;
            } else {
                // Cannot win this battle, minimize loss
                // Sacrifice the weakest card to preserve stronger ones
                result[originalIndex] = nums1[left];
                left++;
            }
        }
        
        return result;
    }
    
    /**
     * Alternative implementation using TreeMap for a different perspective
     * This approach explicitly tracks available values and their frequencies
     */
    public int[] advantageCountTreeMap(int[] nums1, int[] nums2) {
        int n = nums1.length;
        
        // Create a TreeMap to track available values (sorted automatically)
        // TreeMap maintains sorted order and allows efficient ceiling operations
        TreeMap<Integer, Integer> available = new TreeMap<>();
        for (int val : nums1) {
            available.put(val, available.getOrDefault(val, 0) + 1);
        }
        
        int[] result = new int[n];
        
        // Process each position in nums2
        for (int i = 0; i < n; i++) {
            // Find the smallest value greater than nums2[i]
            Integer winningCard = available.higherKey(nums2[i]);
            
            if (winningCard != null) {
                // We can win! Use the smallest winning card
                result[i] = winningCard;
            } else {
                // Can't win, use the smallest card available
                winningCard = available.firstKey();
                result[i] = winningCard;
            }
            
            // Remove the used card from available pool
            int count = available.get(winningCard);
            if (count == 1) {
                available.remove(winningCard);
            } else {
                available.put(winningCard, count - 1);
            }
        }
        
        return result;
    }
    
    // Test the solution
    public static void main(String[] args) {
        AdvantageShuffle solution = new AdvantageShuffle();
        
        // Test case 1
        int[] nums1_1 = {2, 7, 11, 15};
        int[] nums2_1 = {1, 10, 4, 11};
        System.out.println("Test 1: " + Arrays.toString(
            solution.advantageCount(nums1_1, nums2_1)));
        // Expected: [2, 11, 7, 15]
        
        // Test case 2
        int[] nums1_2 = {12, 24, 8, 32};
        int[] nums2_2 = {13, 25, 32, 11};
        System.out.println("Test 2: " + Arrays.toString(
            solution.advantageCount(nums1_2, nums2_2)));
        // Expected: [24, 32, 8, 12]
        
        // Test case 3 - edge case where no values can win
        int[] nums1_3 = {1, 2, 3, 4};
        int[] nums2_3 = {5, 6, 7, 8};
        System.out.println("Test 3: " + Arrays.toString(
            solution.advantageCount(nums1_3, nums2_3)));
        // Expected: Any permutation (all losses are equal)
    }
}
