import java.util.*;

public class Solution {
  public int findPairs(int[] nums, int k) {
    // Special case: k = 0, we need duplicates
    if (k == 0) {
      Map<Integer, Integer> freq = new HashMap<>();
      // Count frequency of each number
      for (int num : nums) {
        freq.put(num, freq.getOrDefault(num, 0) + 1);
      }

      // Count numbers that appear at least twice
      int count = 0;
      for (int frequency : freq.values()) {
        if (frequency >= 2) {
          count++;
        }
      }
      return count;
    }

    // General case: k > 0
    Set<Integer> numSet = new HashSet<>();
    for (int num : nums) {
      numSet.add(num); // Remove duplicates for uniqueness
    }

    int count = 0;
    // For each unique number, check if num + k exists
    for (int num : numSet) {
      if (numSet.contains(num + k)) {
        count++;
      }
    }

    return count;
  }
    
 // Main method for testing
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Example 1 from problem
        int[] nums1 = {3, 1, 4, 1, 5};
        int k1 = 2;
        int result1 = solution.findPairs(nums1, k1);
        System.out.println("Test 1 - Input: " + Arrays.toString(nums1) + ", k = " + k1);
        System.out.println("Expected: 2, Got: " + result1);
        System.out.println("Status: " + (result1 == 2 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 2: Example 2 from problem
        int[] nums2 = {1, 2, 3, 4, 5};
        int k2 = 1;
        int result2 = solution.findPairs(nums2, k2);
        System.out.println("Test 2 - Input: " + Arrays.toString(nums2) + ", k = " + k2);
        System.out.println("Expected: 4, Got: " + result2);
        System.out.println("Status: " + (result2 == 4 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 3: Example 3 from problem (k = 0 case)
        int[] nums3 = {1, 3, 1, 5, 4};
        int k3 = 0;
        int result3 = solution.findPairs(nums3, k3);
        System.out.println("Test 3 - Input: " + Arrays.toString(nums3) + ", k = " + k3);
        System.out.println("Expected: 1, Got: " + result3);
        System.out.println("Status: " + (result3 == 1 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 4: Edge case - single element
        int[] nums4 = {1};
        int k4 = 0;
        int result4 = solution.findPairs(nums4, k4);
        System.out.println("Test 4 - Input: " + Arrays.toString(nums4) + ", k = " + k4);
        System.out.println("Expected: 0, Got: " + result4);
        System.out.println("Status: " + (result4 == 0 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 5: All duplicates with k = 0
        int[] nums5 = {1, 1, 1, 1};
        int k5 = 0;
        int result5 = solution.findPairs(nums5, k5);
        System.out.println("Test 5 - Input: " + Arrays.toString(nums5) + ", k = " + k5);
        System.out.println("Expected: 1, Got: " + result5);
        System.out.println("Status: " + (result5 == 1 ? "PASS" : "FAIL"));
        System.out.println();
        
        // Test Case 6: No valid pairs
        int[] nums6 = {1, 2, 3, 4, 5};
        int k6 = 10;
        int result6 = solution.findPairs(nums6, k6);
        System.out.println("Test 6 - Input: " + Arrays.toString(nums6) + ", k = " + k6);
        System.out.println("Expected: 0, Got: " + result6);
        System.out.println("Status: " + (result6 == 0 ? "PASS" : "FAIL"));
        System.out.println();
        
        System.out.println("=== Test Summary ===");
        System.out.println("All test cases completed!");
    }
}